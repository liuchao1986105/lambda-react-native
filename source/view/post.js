import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';

import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from 'react-native-toast';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as PostAction from '../action/post';
import * as OfflineAction from '../action/offline';
import * as ConfigAction from '../action/config';
import ViewPage from '../component/view';
import Spinner from '../component/spinner';
import PostButton from '../component/button/post';
import SingleButton from '../component/button/single';
import HtmlConvertor from '../component/htmlConvertor';
import HintMessage from '../component/hintMessage';
import PostRender from '../component/header/post';
import TopicRender from '../component/header/topic';
import Panel from '../component/panel';
import { storageKey, postCategory } from '../config';
import { StyleConfig, ComponentStyles, HtmlConvertorStyles, CommonStyles } from '../style';

class PostPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false,
			favoriteStatus: false
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidMount() {
		const { postAction, configAction, id, post, postDeatil, category } = this.props;
		if(!postDeatil){
			postAction.getPostById(category, id);
		}
	}

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}

	onOfflinePress(){
		const { post, postDeatil, category, offlineAction } = this.props;
		if (post && postDeatil) {
			let offlineInfo = {};
			let offlineData = {
				category: category,
				postDeatil: postDeatil,
				offlineDate: moment()
			};
			offlineInfo[post.Id] = {...post,  ...offlineData};
			
			offlineAction.savePost(offlineInfo).then((data)=>{
				this.onOfflineResolved(data);
			});
		}
	}

	onOfflineResolved(data){
		Toast.show("离线保存成功");
	}

	onFavoritePress(){
		const { category } = this.props;
		if(this.state.favoriteStatus === false){
			const { post, postAction } = this.props;
			if (post) {
				// let favoriteData = {
				// 	Title: title,
				// 	LinkUrl: post.Url,
				// 	Summary: post.Description,
				// 	Tags: ""
				// };
				postAction.collectTopic({
					category: postCategory.favorite,
					//data: favoriteData,
					id:post._id,
					resolved: ()=>{
						this.onFavoriteResolved();
					},
					rejected: ()=>{
						this.onFavoriteRejected();
					}
				});
			}
		}else{
			Toast.show("已添加收藏，不能重复添加");
		}
	}

	onFavoriteResolved(){
		this.setState({favoriteStatus: true});
		Toast.show("添加收藏成功");
	}

	onFavoriteRejected(){
		Toast.show("已添加收藏，不能重复添加");
	}

	onCommentPress(){
		const { post, router, category, id } = this.props;
		if (category && id) {
			router.push(ViewPage.commentAdd(), {
				data: post,
				blogger: post.Blogger,
				title: '嘉定区快递服务站',
				category: category,
				id: id
			});
		}
	}

	onCommentListPress(){
		const { post, router, category, id } = this.props;
		if (category && id) {
			router.push(ViewPage.postComment(), {
				post: post,
				blogger: post.Blogger,
				category: category,
				id: id
			});
		}
	}

	onAuthorPress(){
		let { post, router } = this.props;
		if (post) {
			router.push(ViewPage.author(), {
				user_id: post.authorId._id
			});
		}
	}

	renderContent() {
		const { id, postDeatil, ui, config } = this.props;
		if (this.state.hasFocus === false || ui.loadPending[id] !== false) {
			return (
				<Spinner style={ ComponentStyles.message_container }/>
			)
		}
		if (postDeatil) {
			return (
				<View style={ [CommonStyles.p_a_3 ] }>
					<HtmlConvertor
						content={ postDeatil.description }>
					</HtmlConvertor>
				</View>
			)
		}
		return(
			<HintMessage />
		);
	}

	render() {
		const { post, router, category } = this.props;
		let buttons;
		if(category == 'home'){
			buttons = [
				{
					title:'关注',
					icon: 'ios-heart-outline',
					action:'onFavoritePress',
					color: StyleConfig.color_primary
				}];		
		}else{
			buttons = [
				{
					title:'收藏',
					icon: 'ios-heart-outline',
					action:'onFavoritePress',
					color: StyleConfig.color_primary
				}, {
					title:'评论',
					icon: 'ios-text-outline',
					action:'push',
					view: 'blinkAdd',
					color: StyleConfig.color_primary
				},];	
		}

		return (
			<View style={ ComponentStyles.container }>
				{
					category === postCategory.home?
					<TopicRender
						post={ post } 
						router = { router }
						onCommentListPress = {()=>this.onCommentListPress()}>
						{ this.renderContent() }
					</TopicRender>
					:
					<PostRender
						post={ post } 
						router = { router }
						onAuthorPress = {()=>this.onAuthorPress()}
						onCommentListPress = {()=>this.onCommentListPress()}>
						{ this.renderContent() }
					</PostRender>
				}

				<PostButton 
					onCommentPress = {()=>this.onCommentPress()}
					onOfflinePress = {()=>this.onOfflinePress()}
					onFavoritePress = {()=>this.onFavoritePress()}
					buttons = {buttons}
					router = { this.props.router}/>

				<SingleButton onPress = { ()=>this.props.router.pop() }/>
			</View>
		)
	}
}

export default connect((state, props) => ({
  postDeatil: state.post.posts[props.id],
  config: state.config,
  ui: state.postDetailUI
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch),
  configAction : bindActionCreators(ConfigAction, dispatch),
  offlineAction : bindActionCreators(OfflineAction, dispatch)
}), null, {
  withRef: true
})(PostPage);