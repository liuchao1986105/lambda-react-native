import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import _ from 'lodash';
import moment from 'moment';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { decodeHTML, getBloggerAvatar, getNewsUrlFromID }  from '../../common';
import { ComponentStyles, CommonStyles, StyleConfig } from '../../style';

class NewsRow extends Component {

	constructor(props) {
	    super(props);
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	getNewsInfo(){
		let { news } = this.props;
		let newsInfo = {};
		if (news && news.Id) {
			newsInfo.Id = news.Id;
			newsInfo.ViewCount = news.ViewCount;
			newsInfo.CommentCount = news.CommentCount;

			newsInfo.Title = decodeHTML(news.Title);
			if (news.Summary) {
				newsInfo.Description = _.truncate(decodeHTML(news.Summary), { length : 70 });
			}
			newsInfo.Url = getNewsUrlFromID(news.Id);
			newsInfo.DateAdded = moment(news.DateAdded).startOf('minute').fromNow();
			newsInfo.Avatar = getBloggerAvatar(news.TopicIcon);
		}
		return newsInfo;
	}

	renderNewsTitle(newsInfo){
		return (
			<View style={ [ CommonStyles.m_b_1 ] }>
				<Text style={ [CommonStyles.text_black, CommonStyles.font_sm, CommonStyles.line_height_md ] }>
					{ newsInfo.Title }
				</Text>
			</View>
		)
	}

	renderNewsDescr(newsInfo){
		return (
			<View style={ [ CommonStyles.m_b_2 ] }>
				<Text style={ [ CommonStyles.text_gray, CommonStyles.font_xs, CommonStyles.line_height_sm ] }>
					{ newsInfo.Description }
				</Text>
			</View>
		)
	}

	renderNewsMeta(newsInfo){
		return (
			<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsBetween ] }>
				<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle ]}>
					<Image ref={ view => this.imgView=view }
						style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2] }
						source={ newsInfo.Avatar }>
					</Image>
					<Text style={ [CommonStyles.text_gray, CommonStyles.font_ms] }>
						{ newsInfo.DateAdded }
					</Text>
				</View>
				<View>
					<Text style={ [ CommonStyles.text_primary ] }>
						{ newsInfo.CommentCount + ' / ' + newsInfo.ViewCount }
					</Text>
				</View>
			</View>
		)
	}
	
	render() {
		const newsInfo = this.getNewsInfo();
		return (
			<TouchableHighlight
				onPress={(e)=>{ this.props.onRowPress(newsInfo) }}
				underlayColor={ StyleConfig.touchable_press_color }
				key={ newsInfo.Id }>

				<View style={ [ComponentStyles.list] }>
					{ this.renderNewsTitle(newsInfo) }
					{ this.renderNewsDescr(newsInfo) }
					{ this.renderNewsMeta(newsInfo) }
				</View>
			</TouchableHighlight>
		)
	}
}

export default NewsRow;
