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

class UserQuestionRow extends Component {

	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	getQuestionInfo(){
		let { question } = this.props;
		let questionInfo = {};
		if (question && question.Qid) {
			questionInfo.Id = question.Qid;
			questionInfo.Title = decodeHTML(question.Title);
			questionInfo.Summary = decodeHTML(question.Summary);
			questionInfo.Tags = question.Tags;
			questionInfo.Award = question.Award;
			questionInfo.AnswerCount = question.AnswerCount;
			questionInfo.ViewCount = question.ViewCount;
			questionInfo.DateAdded = moment(question.DateAdded).startOf('minute').fromNow();
			questionInfo.Summary = _.truncate(decodeHTML(question.Summary), { length : 70 });
			questionInfo.Avatar = getBloggerAvatar(question.QuestionUserInfo.IconName);
			questionInfo.Author = decodeHTML(question.QuestionUserInfo.UserName);
		}
		return questionInfo;
	}

	renderQuestionTitle(questionInfo){
		return (
			<View style={ [ CommonStyles.m_b_1 ] }>
				<Text style={ [CommonStyles.text_black, CommonStyles.font_sm, CommonStyles.line_height_md ] }>
					{ questionInfo.Title }
				</Text>
			</View>
		)
	}

	renderQuestionDescr(questionInfo){
		return (
			<View style={ [ CommonStyles.m_b_2 ] }>
				<Text style={ [ CommonStyles.text_gray, CommonStyles.font_xs, CommonStyles.line_height_sm ] }>
					{ questionInfo.Summary }
				</Text>
			</View>
		)
	}

	renderQuestionCount(questionInfo){
		return (
			<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle]}>
				<Icon 
					name={ "ios-chatbubbles-outline" }  
					size= { StyleConfig.icon_size - 4 }
					color={ StyleConfig.color_primary }  />
				<Text style={ [ CommonStyles.text_primary, CommonStyles.m_l_1 ] }>
					{ questionInfo.AnswerCount }
				</Text>
			</View>
		)
	}

	renderQuestionDate(questionInfo){
		return (
			<View style={[ CommonStyles.flexColumn ]}>
				<Text style={ [ CommonStyles.text_gray, CommonStyles.font_ms ] }>
					{ questionInfo.DateAdded }
				</Text>
			</View>
		)
	}

	renderQuestionMeta(questionInfo){
		return (
			<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsBetween ] }>
				{ this.renderQuestionDate(questionInfo) }
				{ this.renderQuestionCount(questionInfo) }
			</View>
		)
	}

	renderQuestionMedal(questionInfo){
		return (
			<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle]}>
				<Icon 
					name={ "ios-flash-outline" }  
					size= { StyleConfig.icon_size }
					color={ StyleConfig.color_danger }  />
				<Text style={ [CommonStyles.p_l_1, CommonStyles.text_danger] }>
					{ questionInfo.Award }
				</Text>
			</View>
		)
	}

	renderQuestionHeader(questionInfo){
		const award = parseInt(questionInfo.Award);
		if(award > 0){
			return (
				<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_b_2 ] }>
					{ this.renderQuestionMedal(questionInfo) }
				</View>
			)
		}
	}

	render() {

		const questionInfo = this.getQuestionInfo();

		return (
			<TouchableHighlight
				onPress={(e)=>{ this.props.onRowPress(questionInfo) }}
				underlayColor={ StyleConfig.touchable_press_color }
				key={ questionInfo.Qid }>

				<View style={ ComponentStyles.list }>
					{ this.renderQuestionHeader(questionInfo) }
					{ this.renderQuestionTitle(questionInfo) }
					{ this.renderQuestionDescr(questionInfo) }
					{ this.renderQuestionMeta(questionInfo) }
				</View>
			</TouchableHighlight>
		)
	}
}

export default UserQuestionRow;
