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
import { decodeHTML, openLink }  from '../../common';
import { postCategory } from '../../config';
import { CommonStyles, ComponentStyles, StyleConfig } from '../../style';

class UserFavoriteRow extends Component {

	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	formatFavoriteMeta(favoriteInfo){
		let favoriteMeta = {};

		return favoriteMeta;
	}

	getFavoriteInfo(){
		let { favorite } = this.props;
		let favoriteInfo = {};
		// if (favorite && favorite.WzLinkId) {
		// 	const favoriteMeta = this.formatFavoriteMeta(favorite);
		// 	favoriteInfo.Title = decodeHTML(favoriteMeta.title);
		// 	favoriteInfo.Author = decodeHTML(favoriteMeta.author);
		// 	favoriteInfo.Category = favoriteMeta.category;
		// 	favoriteInfo.Tags = favoriteMeta.tags;
		// 	favoriteInfo.Id = favoriteMeta.id; 

		// 	favoriteInfo.LinkUrl = favorite.LinkUrl;
		// 	favoriteInfo.Summary = decodeHTML(favorite.Summary);
		// 	favoriteInfo.FromCNBlogs = favorite.FromCNBlogs;
		// 	favoriteInfo.WzLinkId = favorite.WzLinkId;
        //     favoriteInfo.DateAdded = moment(favorite.DateAdded).startOf('minute').fromNow();
		// }
		return favoriteInfo;
	}

	onRowPress(favoriteInfo){
		if(favoriteInfo.Id){
			this.props.onRowPress(favoriteInfo);
		}else{
			openLink(favoriteInfo.LinkUrl);
		}
	}

	renderFavoriteHeader(favoriteInfo){
		let authorStyle;
		if(favoriteInfo.Category === postCategory.home){
			authorStyle = CommonStyles.text_danger;
		}else{
			authorStyle = CommonStyles.text_primary;
		}
		return (
			<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_b_2 ]}>
				<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle ]}>
					<Text style={ [authorStyle, CommonStyles.font_xs ] }>
						{/*{ favoriteInfo.Author }*/}
						{'testuser3'}
					</Text>
				</View>
			</View>
		)
	}

	renderFavoriteContent(favoriteInfo){
		return (
			<View>
				<View>
					<Text style={ [CommonStyles.text_black, CommonStyles.font_sm, CommonStyles.line_height_md, CommonStyles.m_b_2 ] }>
						{/*{ favoriteInfo.Title }*/}
						{'长宁区快递服务站'}
					</Text>
				</View>
				<View style={ [ CommonStyles.m_b_2 ] }>
					<Text style={ [CommonStyles.text_gray, CommonStyles.font_xs, CommonStyles.line_height_sm ] }>
						{/*{ favoriteInfo.Summary }*/}
						{'长宁区快递服务器站位于淞虹路1188号，地铁2号线淞虹路站下'}
					</Text>
				</View>
			</View>
		)
	}

	renderFavoriteMeta(favoriteInfo){
		return (
			<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween ] }>
				<Text style={ [CommonStyles.text_gray, CommonStyles.font_ms] }>
					{/*{ favoriteInfo.DateAdded }*/}
					{'4 days ago'}
				</Text>
				{/*{
					favoriteInfo.Tags?
					<Text style={ [CommonStyles.text_primary, CommonStyles.font_xs] }>
						#{ favoriteInfo.Tags }
					</Text>
					: null
				}*/}
			</View>
		);
	}

	render() {
		const favoriteInfo = this.getFavoriteInfo();
		const { onRowLongPress = ()=>null } = this.props;
		return (
			<TouchableHighlight
				onPress={(e)=>{ this.onRowPress(favoriteInfo) }}
				onLongPress={(e)=>{ onRowLongPress(favoriteInfo) }}
				underlayColor={ StyleConfig.touchable_press_color }
				key={ favoriteInfo.Id }>

				<View style={ ComponentStyles.list }>
					{ this.renderFavoriteHeader(favoriteInfo) }
					{ this.renderFavoriteContent(favoriteInfo) }
					{ this.renderFavoriteMeta(favoriteInfo) }
				</View>
			</TouchableHighlight>
		)
	}
}

export default UserFavoriteRow;
