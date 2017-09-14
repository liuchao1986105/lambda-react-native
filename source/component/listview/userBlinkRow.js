import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import moment from 'moment';
import _ from 'lodash';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Icon from 'react-native-vector-icons/Ionicons';
import { decodeHTML, getBloggerAvatar }  from '../../common';
import { CommonStyles, ComponentStyles, StyleConfig } from '../../style';

class UserBlinkRow extends Component {

	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	getBlinkInfo(){
		let { blink } = this.props;
		let blinkInfo = {};
		if (blink && blink.Id) {
			blinkInfo.Id  = blink.Id;
			blinkInfo.Content = decodeHTML(blink.Content);
			blinkInfo.CommentCount = blink.CommentCount;
			blinkInfo.Author= decodeHTML(blink.UserDisplayName);
			blinkInfo.IsPrivate = blink.IsPrivate;
			blinkInfo.Avatar = getBloggerAvatar(blink.UserIconUrl);
			blinkInfo.DateAdded = moment(blink.DateAdded).startOf('minute').fromNow();
		}
		return blinkInfo;
	}

	renderBlinkContent(blinkInfo){
		return (
			<View style={ [ CommonStyles.m_b_2 ] }>
				<Text style={ [CommonStyles.text_black, CommonStyles.font_sm, CommonStyles.line_height_md ] }>
					{/*{ blinkInfo.Content }*/}
					{'检测到危险品 - 订单号:2222222222222222'}
				</Text>
			</View>
		);
	}

	renderBlinkDate(blinkInfo){
		return (
			<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle ] }>
				<Text style={ [CommonStyles.text_gray, CommonStyles.font_ms] }>
					{/*{ blinkInfo.DateAdded }*/}
					{'2016-10-30 10:20'}
				</Text>
			</View>	
		)
	}

	renderBlinkComment(blinkInfo){
		// if(blinkInfo.IsPrivate === false){
			return (
				<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle]}>
					<Icon 
						name={ "ios-chatbubbles-outline" }  
						size= { StyleConfig.icon_size - 4 }
						color={ StyleConfig.color_primary }  />
					<Text style={ [ CommonStyles.text_primary, CommonStyles.m_l_1 ] }>
						{/*{ blinkInfo.CommentCount }*/}
						{'5'}
					</Text>
				</View>
			)
		// }
		// return (
		// 	<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle]}>
		// 		<Icon 
		// 			name={ "ios-lock-outline" }  
		// 			size= { StyleConfig.icon_size - 6 }
		// 			color={ StyleConfig.color_danger }  />
		// 	</View>
		// )
	}

	renderBlinkMeta(blinkInfo){
		return (
			<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsBetween ] }>
				{ this.renderBlinkDate(blinkInfo) }
				{ this.renderBlinkComment(blinkInfo) }
			</View>
		);
	}

	render() {
		const blinkInfo = this.getBlinkInfo();
		let { onRowPress, onRowLongPress = ()=>null } = this.props;
		// if(blinkInfo.IsPrivate === true){
		// 	onRowPress = ()=> null;
		// }
		return (
			<TouchableHighlight
				onPress={(e)=>{ onRowPress(blinkInfo) }}
				onLongPress={(e)=>{ onRowLongPress(blinkInfo) }}
				underlayColor={ StyleConfig.touchable_press_color }
				key={ blinkInfo.Id }>
				<View style={ ComponentStyles.list }>
					{ this.renderBlinkContent(blinkInfo) }
					{ this.renderBlinkMeta(blinkInfo) }
				</View>
			</TouchableHighlight>
		)
	}
}

export default UserBlinkRow;
