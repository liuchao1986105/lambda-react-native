import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	ScrollView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as CommentAction from '../action/comment';
import Navbar from '../component/navbar';
import Spinner from '../component/spinner';
import EndTag from '../component/endtag';
import SingleButton from '../component/button/single';
import HtmlConvertor from '../component/htmlConvertor';
import HintMessage from '../component/hintMessage';
import Panel from '../component/panel';
import { postCategory } from '../config';
import { decodeHTML, filterCommentData, lambdaImage }  from '../common';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const category = postCategory.blink;

class BlinkPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidMount() {
		const { commentAction, id, category } = this.props;
		commentAction.getCommentsByPost(category, id, {
			pageSize: 100
		});
	}

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}

	onCommentPress(){
		const { blink, router, id } = this.props;
		if (blink && id) {
			router.push(ViewPage.commentAdd(), {
				data: blink,
				category: category,
				id: id
			});
		}
	}

	renderBlinkHeader(blink){
		return (
			<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_b_2 ] }>
				<Text style={ [ CommonStyles.text_gray, CommonStyles.font_ms ] }>
					{/*{ blink.DateAdded }*/}
					{'2016-10-30 10:20'}
				</Text>
			</View>
		)
	}

	renderAlarmIDItem(){
		return (
		<Panel
			title="报警编号"
			descr = "5e27054a-7f96-43b1-8f01-ff1765f4b93c"/>
		)
	}

	renderOrderIDItem(){
		return (
		<Panel
			title="订单编号"
			descr = "37d7522f-7fff-4136-b702-01d41f1dfe1e"/>
		)
	}
	
	renderCauseItem(){
		return (
		<Panel
			title="报警原因"
			descr = "检测到危险品"/>
		)
	}

	renderStatusItem(){
		return (
		<Panel
			title="处理状态"
			descr = "未处理"/>
		)
	}


	renderBlinkContent(blink){
		return (
			<View style={[ CommonStyles.m_b_3 ]}>
				{/*<Text style={[ CommonStyles.text_black, CommonStyles.font_sm, CommonStyles.line_height_sm ]}>
					{ decodeHTML(blink.Content) }
					报警编号: 5e27054a-7f96-43b1-8f01-ff1765f4b93c
					订单编号: 37d7522f-7fff-4136-b702-01d41f1dfe1e
					报警原因：检测到危险品
					处理状态：未处理
				</Text>*/}
				{ this.renderAlarmIDItem() }
				{ this.renderOrderIDItem() }
				{ this.renderCauseItem() }
				{ this.renderStatusItem() }
			</View>
		)
	}

	renderBlink(blink){
		return (
			<View style={ [CommonStyles.p_x_3, CommonStyles.p_t_3] }>
				{ this.renderBlinkHeader(blink) }
				{ this.renderBlinkContent(blink) }
			</View>
		)
	}

	renderBlinkCommentSeparator(blink){
		return (
			<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
				<Text style={[CommonStyles.text_primary, CommonStyles.font_xs]}>
					站友回复
				</Text>
			</View>
		)
	}

	renderBlinkCommentItemHeader(comment){
		const dateAdded = moment(comment.DateAdded).startOf('minute').fromNow();
		const avatar = comment.UserIconUrl;
		const author = comment.UserDisplayName;
		return (
			<View style={[CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_b_2]}>
				<View style={[CommonStyles.flexRow, CommonStyles.flexItemsMiddle]}>
					<Image ref={view => this.imgView=view}
						style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2] }
						source={ lambdaImage }>
					</Image>
					<Text style={ [ CommonStyles.text_gray, CommonStyles.font_xs ] }>
						{/*{ decodeHTML(author) }*/}
						{'testuser2'}
					</Text>
				</View>
				<Text style={[CommonStyles.text_gray, CommonStyles.font_ms]}>
					{/*{ dateAdded }*/}
					{'2016-10-31 10:34'}
				</Text>
			</View>
		)
	}

	renderBlinkCommentItemContent(comment){
		//const commentContent = filterCommentData(decodeHTML(comment.Content));
		const commentContent = '棒棒哒!'
		return (
			<HtmlConvertor
				content={ commentContent }>
			</HtmlConvertor>
		)
	}

	renderBlinkCommentItem(comment, index){
		return (
			<View style={[ ComponentStyles.list, CommonStyles.p_b_2 ]} key={ index }>
				{ this.renderBlinkCommentItemHeader(comment) }
				{ this.renderBlinkCommentItemContent(comment) }
			</View>
		)
	}

	renderBlinkComments(){
		//const { blink, comments } = this.props;
		const { blink } = this.props;
		const comments = [{
			Content: '112'
		},
		{
			Content: '112'
		},
		{
			Content: '112'
		}]
		// if(blink.CommentCount > 0){
			return (
				<View>
					{
						comments && comments.length && comments.map((comment, index)=>{
							return this.renderBlinkCommentItem(comment, index) 
						})
					}
					<EndTag/>
				</View>
			)
		// }

		// return (
		// 	<HintMessage/>
		// )
	}


	renderContent() {
		const { id, blink, blinkDetail, ui  } = this.props;

		if (this.state.hasFocus === false) {
			return (
				<Spinner style={ ComponentStyles.message_container }/>
			)
		}
		if (blink && blink.Id) {
			return (
				<ScrollView 
					showsVerticalScrollIndicator = {false}
					showsHorizontalScrollIndicator = {false} >
					{ this.renderBlink(blink) }
					{ this.renderBlinkCommentSeparator(blink) }
					{ this.renderBlinkComments(blink) }
				</ScrollView>
			)
		}
		return(
			<HintMessage />
		);
	}

	renderNavbar(){
		const { blink } = this.props;
					{/*<Navbar
				leftIconName = { blink.Avatar }
				title = { blink.Author } 
				leftIconOnPress={ ()=>this.props.router.pop() } />*/}
		return (
			<Navbar
				title = { '报警详情-123456789' } 
				leftIconOnPress={ ()=>this.props.router.pop() } />
		)
	}

	render() {
		return (
			<View style={ ComponentStyles.container }>
				{ this.renderNavbar() }
				{ this.renderContent() }
				
				<SingleButton 
					icon="ios-text-outline" 
					position="right"
					color = { StyleConfig.action_color_danger } 
					onPress = { ()=>this.onCommentPress() }/>

				<SingleButton 
					position="left" 
					onPress = { ()=>this.props.router.pop() }/>
			</View>
		)
	}
}

export default connect((state, props) => ({
  comments : state.comment[props.id],
  ui: state.postDetailUI
}), dispatch => ({ 
  commentAction : bindActionCreators(CommentAction, dispatch)
}), null, {
  withRef: true
})(BlinkPage);