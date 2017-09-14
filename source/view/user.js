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
import { storageKey } from '../config';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';
import moment from 'moment';

const firstLineItems = [{
	title:'我的关注',
	color: StyleConfig.color_primary,
	icon:'ios-star-outline',
	action:'push',
	flag: 'userAsset',
	param: postCategory.favorite
},
{
	title:'我的收藏',
	color: StyleConfig.color_danger,
	icon:'ios-heart-outline',
	action:'push',
    flag: 'userAsset',
	param: postCategory.favorite
},
{
	title:'我的L问',
	color: StyleConfig.color_warning,
	icon:'ios-help-circle-outline',
	action:'push',
	flag: 'userAsset',
	param: postCategory.question
}];

const secondLineItems = [
{
	title:'我的通知',
	color: StyleConfig.color_primary,
	icon:'ios-notifications-outline',
	action:'push',
	flag: 'userAsset',
	//param: postCategory.info
},{
	title:'我的分享',
	color: StyleConfig.color_danger,
	icon:'ios-folder-outline',
	action:'push',
	flag: 'userAsset',
	param: postCategory.share
},
{
	title:'设置',
	color: StyleConfig.color_warning,
	icon:'ios-settings-outline',
	action:'push',
	flag:'setting'
}

// {
// 	title:'注销',
// 	color: StyleConfig.color_gray,
// 	icon:'ios-log-out-outline',
// 	//action:'push',
// 	//flag: 'userAsset',
// }
];

class UserPage extends Component {

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

	onNavItemPress(item){
		const { router, user } = this.props;
		if(item && item.action && router[item.action] && ViewPage[item.flag]){
			router[item.action](ViewPage[item.flag](), {
				category: item.param ?  item.param  : "",
				user: user
			});
		}
		// else{
		// 	this.onLogOutPress();
		// }

		// this.props.router.push(ViewPage.post(), {
		// 	id: post.Id,
		// 	category: this.props.category,
		// 	post
		// });
	}

	onLogOutPress(){
	    Alert.alert(
			'系统提示',
			'确定要退出吗？',
			[
				{text: '取消', onPress: () => null },
				{text: '确定', onPress: () => this.handleLogoutPress() },
			]
	  	)
	}

	handleLogoutPress(){
		const { configAction, router } = this.props;
		configAction.removeConfig({
		  key: storageKey.USER_TOKEN,
		}).then(()=>{
		  router.replace(ViewPage.startup());
		});
	}


	renderSpacer(){
		return (
			<View style={ styles.spacer }></View>
		)
	}

	renderUserMeta(){
		const { user } = this.props;
		return (
			<View>
				<View style={[ CommonStyles.p_a_4, CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, styles.row ]}>
					<Text style={[CommonStyles.text_gray, CommonStyles.font_xs ]}>
						L币: {user.score}
					</Text>
					<Text style={[CommonStyles.text_gray, CommonStyles.font_xs ]}>
						会员时间：{ user.payTime ? moment(user.payTime).format('YYYY-MM-DD') : '未加入'}
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

	renderContent(){
		return (
			<View>
				{ this.renderUserMeta() }
				{ this.renderNavContent() }
			</View>
		)
	}

	render() {
		const { router, user } = this.props;
		return (
			<View style={ ComponentStyles.container }>
				<UserRender router = { router } user={ user }>
					{ this.renderContent() }
				</UserRender>
				<HomeButton router = { this.props.router}/>
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
  user: state.user
}), dispatch => ({ 
  configAction : bindActionCreators(ConfigAction, dispatch),
}), null, {
  withRef: true
})(UserPage);