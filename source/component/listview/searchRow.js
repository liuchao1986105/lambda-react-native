import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableHighlight
} from 'react-native';

import moment from 'moment';
import _ from 'lodash';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { decodeHTML }  from '../../common';
import { CommonStyles, ComponentStyles, StyleConfig } from '../../style';

class SearchRow extends Component {

	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	getSearchInfo(){
		let { search } = this.props;
		let searchInfo = {};
		if (search && search.Title) {
			searchInfo.Title = decodeHTML(search.Title).replace(/<strong>/g,'').replace(/<\/strong>/g,'');
            searchInfo.DateAdded = moment(search.PublishTime).startOf('minute').fromNow();
            searchInfo.Author = search.UserName;
            searchInfo.ViewCount = search.ViewTimes;
			searchInfo.CommentCount = search.CommentTimes;
            searchInfo.Url = search.Uri;
            searchInfo.Id = search.Id;
            searchInfo.Description = decodeHTML(search.Content).replace(/<strong>/g,'').replace(/<\/strong>/g,'');
		}
		return searchInfo;
	}

    renderSearchItemHeader(searchInfo){
        return (
        <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_b_2 ]}>
            <Text style={[CommonStyles.text_danger, CommonStyles.font_xs]}>
            {/*{ searchInfo.Author }*/}
             {'testuse11'}
            </Text>
        </View>
        )
    }

    renderSearchItemMeta(searchInfo){
        return (
        <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_t_2 ]}>
            <Text style={[CommonStyles.text_gray, CommonStyles.font_ms]}>
            {/*{ searchInfo.DateAdded }*/}
            {'8 months ago'}
            </Text>
            <Text style={ [ CommonStyles.text_primary ] }>
              {/* { searchInfo.CommentCount + ' / ' + searchInfo.ViewCount }*/}
            </Text>
        </View>
        )
    }

    renderSearchItemContent(searchInfo){
        return (
        <View>
            <Text style={ [CommonStyles.text_black, CommonStyles.font_sm, CommonStyles.line_height_md, CommonStyles.m_b_2 ] }>
                {/*{ searchInfo.Title }*/}
                {'静安区快递服务站'}
            </Text>
            <Text style={ [CommonStyles.text_gray, CommonStyles.font_xs, CommonStyles.line_height_sm ] }>
                 {/*{ searchInfo.Description }*/}
                 { '静安区人才济济，高档地区，服务站必将竭尽全力服务好该地区人民' }
            </Text>
        </View>
        )
    }

	render() {
		//const searchInfo = this.getSearchInfo();
        const searchInfo = {};
		return (
			<TouchableHighlight
				onPress={(e)=>{ this.props.onRowPress(searchInfo) }}
				underlayColor={ StyleConfig.touchable_press_color }>
                <View style={[ ComponentStyles.list ]}>
                    { this.renderSearchItemHeader(searchInfo) }
                    { this.renderSearchItemContent(searchInfo) }
                    { this.renderSearchItemMeta(searchInfo) }
                </View>
            </TouchableHighlight>
		)
	}
}

export default SearchRow;
