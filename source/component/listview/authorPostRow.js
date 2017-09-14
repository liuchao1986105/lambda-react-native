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
import Config from '../../config';
import { decodeHTML, getBloggerAvatar }  from '../../common';
import { ComponentStyles, CommonStyles, StyleConfig } from '../../style';

class AuthorPostRow extends Component {

	constructor(props) {
	    super(props);
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	getPostInfo(){
		let { post } = this.props;
		let postInfo = {};
		if (post && post.Id) {
			postInfo.Id  = post.Id;
			postInfo.ViewCount = post.ViewCount;
			postInfo.CommentCount = post.CommentCount;
			postInfo.Title = decodeHTML(post.Title);
			if (post.Description) {
				postInfo.Description = _.truncate(decodeHTML(post.Description), { length : 70 });
			}
			postInfo.DateAdded = moment(post.PostDate).startOf('minute').fromNow();
			postInfo.Author = decodeHTML(post.Author);
			postInfo.blogger = post.BlogApp;
			postInfo.Avatar = getBloggerAvatar(post.Avatar);
		}
		return postInfo;
	}

	renderPostTitle(postInfo){
		return (
			<View style={ [ CommonStyles.m_b_1 ] }>
				<Text style={ [CommonStyles.text_black, CommonStyles.font_sm, CommonStyles.line_height_md ] }>
					{ postInfo.Title }
				</Text>
			</View>
		)
	}

	renderPostDescr(postInfo){
		return (
			<View style={ [ CommonStyles.m_b_2 ] }>
				<Text style={ [ CommonStyles.text_gray, CommonStyles.font_xs, CommonStyles.line_height_sm ] }>
					{ postInfo.Description }
				</Text>
			</View>
		)
	}

	renderPostMeta(postInfo){
		return (
			<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsBetween ] }>
				<Text style={ [CommonStyles.text_gray, CommonStyles.font_ms] }>
					{ postInfo.DateAdded }
				</Text>
				
				<View>
					<Text style={ [ CommonStyles.text_primary ] }>
						{ postInfo.CommentCount + ' / ' + postInfo.ViewCount }
					</Text>
				</View>
			</View>
		)
	}

	render() {
		const postInfo = this.getPostInfo();
		return (
			<TouchableHighlight
				onPress={(e)=>{ this.props.onRowPress(postInfo) }}
				underlayColor={ StyleConfig.touchable_press_color }
				key={ postInfo.Id }>

				<View style={ ComponentStyles.list }>
					{ this.renderPostTitle(postInfo) }
					{ this.renderPostDescr(postInfo) }
					{ this.renderPostMeta(postInfo) }
				</View>
			</TouchableHighlight>
		)
	}
}

export default AuthorPostRow;
