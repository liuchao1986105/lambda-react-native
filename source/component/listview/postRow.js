import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import _ from 'lodash';
import moment from 'moment';
import MarkdownIt from 'markdown-it';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Config from '../../config';
import { decodeHTML, getBloggerAvatar, getBloggerHdpiAvatar, lambdaImage, getFormatDate, filterDescData } from '../../common';
import { ComponentStyles, CommonStyles, StyleConfig } from '../../style';

class PostRow extends Component {

	constructor(props) {
	    super(props);
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	getPostInfo(){
		let { post } = this.props;
		const md = new MarkdownIt({
			html:true,  // 启用html标记转换
			breaks: true,  
		});

		//let postInfo = {};
		if (post && post._id) {
			// postInfo.Id  = post.Id;
			// postInfo.ViewCount = post.ViewCount;
			// postInfo.CommentCount = post.CommentCount;
			// postInfo.Url = post.Url;
			if(this.props.category == 'home'){
				post.img = post.img
				post.headTitle = post.title
				post.leftMeta = post.numberOfArticles + post.numberOfVideos + ' 收录资源'
				post.rightMeta = post.numberOfAllCollects + ' 关注者'
										{/*{ postInfo.CommentCount + ' / ' + postInfo.ViewCount }*/}
			}else{
				post.img = post.authorId.headimgurl
				post.headTitle = post.authorId.name
				
				post.DateAdded = getFormatDate(post.created_at)
				post.description = _.truncate(filterDescData(md.render(post.description)), { length : 70 })
				post.leftMeta = post.DateAdded
				post.rightMeta = post.comments.length + ' / ' + post.visitCount
			}
		}
		return post;
	}

	renderPostAuthor(postInfo){
		return (
			<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle,  CommonStyles.m_b_2 ] }>
				<Image ref={view => this.imgView=view}
					style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2] }
					source={{uri: postInfo.img}}
				/>
				<Text style={ [ CommonStyles.text_danger, CommonStyles.font_xs ] }>
					{ postInfo.headTitle }
				</Text>
			</View>
		)
	}

	renderPostTitle(postInfo){
		return (
			<View style={ [ CommonStyles.m_b_1 ] }>
				<Text style={ [CommonStyles.text_black, CommonStyles.font_sm, CommonStyles.line_height_md ] }>
					{ postInfo.title }
				</Text>
			</View>
		)
	}

	renderPostDescr(postInfo){
		return (
			<View style={ [ CommonStyles.m_b_2 ] }>
				<Text style={ [ CommonStyles.text_gray, CommonStyles.font_xs, CommonStyles.line_height_sm ] }>
					{ postInfo.description }
				</Text>
			</View>
		)
	}

	renderPostMeta(postInfo){
		return (
			<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsBetween ] }>
				<Text style={ [CommonStyles.text_gray, CommonStyles.font_ms] }>
					{postInfo.leftMeta}
				</Text>
				
				<View>
					<Text style={ [ CommonStyles.text_primary ] }>
						{postInfo.rightMeta}
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
				key={ postInfo._id }>

				<View style={ ComponentStyles.list }>
					{ this.renderPostAuthor(postInfo) }
					{ this.renderPostTitle(postInfo) }
					{ this.renderPostDescr(postInfo) }
					{ this.renderPostMeta(postInfo) }
				</View>
			</TouchableHighlight>
		)
	}
}

export default PostRow;
