import React, { Component } from 'react';
import {
	View,
	Text,
	Alert,
	StyleSheet,
	TouchableHighlight
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ViewPage from '../component/view';
import HomeButton from '../component/button/home';
import SingleButton from '../component/button/single';
import UserRender from '../component/header/user';
import { postCategory } from '../config/index';
import * as ConfigAction from '../action/config';
import * as AuthorAction from '../action/author';
import { storageKey } from '../config';
import AuthorRender from '../component/header/author';
import refreshControlConfig from '../config/refreshControl';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';
import moment from 'moment';

const firstLineItems = [{
	title:'关注',
	color: StyleConfig.color_primary,
	icon:'ios-star-outline',
	action:'push',
	flag: 'userAsset',
	param: postCategory.home
},
{
	title:'收藏',
	color: StyleConfig.color_danger,
	icon:'ios-heart-outline',
	action:'push',
    flag: 'userAsset',
	param: postCategory.favorite
},
{
	title:'L问',
	color: StyleConfig.color_warning,
	icon:'ios-help-circle-outline',
	action:'push',
	flag: 'userAsset',
	param: postCategory.question
}];

const secondLineItems = [
{
	title:'我的分享',
	color: StyleConfig.color_danger,
	icon:'ios-folder-outline',
	action:'push',
	flag: 'userAsset',
	param: postCategory.share
}];

class AuthorPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}

	componentDidMount(){
		const { authorAction, user_id } = this.props;
		authorAction.getAuthorDetail(user_id)
	}

	onNavItemPress(item){
		const { router, author } = this.props;
		if(item && item.action && router[item.action] && ViewPage[item.flag]){
			router[item.action](ViewPage[item.flag](), {
				category: item.param ? { category: item.param } : null,
				user: author
			});
		}
		// this.props.router.push(ViewPage.post(), {
		// 	id: post.Id,
		// 	category: this.props.category,
		// 	post
		// });
	}

	renderSpacer(){
		return (
			<View style={ styles.spacer }></View>
		)
	}

	renderUserMeta(){
		const { author } = this.props;
		return (
			<View>
				<View style={[ CommonStyles.p_a_4, CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, styles.row ]}>
					<Text style={[CommonStyles.text_gray, CommonStyles.font_xs ]}>
						L币: { author && author.score}
					</Text>
					<Text style={[CommonStyles.text_gray, CommonStyles.font_xs ]}>
						会员时间：{ author && (author.payTime ? moment(author.payTime).format('YYYY-MM-DD') : '未加入')}
					</Text>
				</View>
				{ this.renderSpacer() }
			</View>
		)
	}

	renderNavItem(item, index){
		return (
			<TouchableHighlight
				key = {index}
				onPress={()=> this.onNavItemPress(item) } 
				style={[ CommonStyles.flex_1, CommonStyles.p_a_3 ]}
				underlayColor ={ StyleConfig.touchable_press_color }>
				<View style={[ CommonStyles.flexColumn, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsCenter ]}>
					<Icon name={ item.icon } 
						size={ 36 } 
						color = { item.color }
						style={[ CommonStyles.m_b_2 ]}/>
					<Text style={[CommonStyles.font_xs, CommonStyles.text_dark]}>
						{ item.title }
					</Text>
				</View>
			</TouchableHighlight>	
		)
	}

	renderNavContent(){
		return (
			<View>
				<View style={[ CommonStyles.flexRow, styles.row ]}>
					{
						firstLineItems && firstLineItems.map((nav, index)=>{
							return this.renderNavItem(nav, index)
						})
					}
				</View>
				{ this.renderSpacer() }
				<View style={[ CommonStyles.flexRow, styles.row ]}>
					{
						secondLineItems && secondLineItems.map((nav, index)=>{
							return this.renderNavItem(nav, index)
						})
					}
				</View>
				{ this.renderSpacer() }
			</View>
		)
	}

	renderAuthorContent(){
		return (
			<View>
				{ this.renderUserMeta() }
				{ this.renderNavContent() }
			</View>
		)
	}

	render() {
		const { router, author } = this.props;
		return (
			<View style={ ComponentStyles.container }>
				<AuthorRender 
				  router = { router } 
				  author={ author } 
				>
            { this.renderAuthorContent() }
          </AuthorRender>
				<SingleButton 
					position="left" 
					onPress = { ()=>router.pop() }/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	row:{
		width: StyleConfig.screen_width
	}, 
	list_icon:{
		width: StyleConfig.icon_size
	},
	spacer: {
		height: 10,
		backgroundColor: StyleConfig.panel_bg_color
	}
});

export default connect((state, props) => ({
  author: state.author[props.user_id],
  ui: state.authorUI[props.user_id]
}), dispatch => ({ 
  authorAction : bindActionCreators(AuthorAction, dispatch)
}), null, {
  withRef: true
})(AuthorPage);