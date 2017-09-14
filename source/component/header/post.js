import React, { Component } from 'react';
import {
	View,
	Image,
	Text,
	ScrollView,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { getImageSource, lambdaImage, getFormatDate } from '../../common';
import Navbar from '../navbar';

import { CommonStyles, ComponentStyles, StyleConfig } from '../../style';

class PostRender extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cover: null
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidMount(){
		const cover = getImageSource();
		this.setState({
			cover: cover
		});
	}

	componentWillUnmount(){
		this.setState({
			cover: null
		});
	}
	
	renderParallaxScrollComponent(){
		return (
			<ScrollView 
        		showsVerticalScrollIndicator = {false}
				showsHorizontalScrollIndicator = {false}>
        	</ScrollView>
		)
	}

	renderParallaxBackground(postInfo){
		return (
			<View>
	            <Image 
	            	resizeMode="cover"
		            style={ [ComponentStyles.header_img ] } 
		            source={ this.state.cover }
	            	ref={(view)=>{this.parallaxBackground = view}} >
	            </Image>		
	            <View style={ [ ComponentStyles.header_backdrop ] }/>
	        </View>
		)
	}

	renderPostMetaAuthor(postInfo){
		let { onAuthorPress } = this.props; 
		// postInfo.AuthorEnabled === false && (onAuthorPress = ()=>null);
		return (
			<TouchableOpacity 
				activeOpacity={ StyleConfig.touchable_press_opacity }
				style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle ] }
				onPress={ ()=> onAuthorPress() }>
					<Image 
						style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2 ] } 
						source={{uri: postInfo.authorId.headimgurl }}/>
					<View>
						<Text style={ [ CommonStyles.text_white, CommonStyles.font_sm ] }>
							{postInfo.authorId.name}
						</Text>
						<Text style={ [ CommonStyles.text_light, CommonStyles.font_ms ] }>
							{getFormatDate(postInfo.created_at)}
						</Text>
					</View>
			</TouchableOpacity>
		)
	}

	renderPostMetaComment(postInfo){
		const { onCommentListPress = ()=>null } = this.props; 
		return (
			<TouchableOpacity 
				activeOpacity={ StyleConfig.touchable_press_opacity }
				style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, styles.comment_box ] }
				onPress={ ()=> onCommentListPress() }>
				<Icon 
					name={ 'ios-text-outline' }  
					size= { StyleConfig.icon_size }
					color={ StyleConfig.color_white }  />
				<Text style={[ CommonStyles.text_white, CommonStyles.font_xs, CommonStyles.m_l_1 ]}>
					{/*{ postInfo.CommentCount }*/}
					{ '2' }
				</Text>
			</TouchableOpacity>
		)
	}

	renderPostInfo(postInfo){
		const postTitle = _.truncate(postInfo.title, { length : 50 });
		return (
			<View style={[CommonStyles.m_b_4]}>
				<Text style={ [CommonStyles.text_white, CommonStyles.font_eg, CommonStyles.line_height_lg, CommonStyles.text_left] }>
					{postTitle}
				</Text>
			</View>
		)
	}

	renderPostMeta(postInfo){
		return (
			<View style={ [ ComponentStyles.pos_absolute, CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.p_a_3, styles.header_meta ] }>
				{ this.renderPostMetaAuthor(postInfo) }
				{ this.renderPostMetaComment(postInfo) }
			</View>
		)
	}

	renderParallaxForeground(postInfo){
		return (
			<View style = { [CommonStyles.flexColumn, CommonStyles.flexItemsCenter, CommonStyles.p_a_3, styles.foreground ] }> 
				{ this.renderPostInfo(postInfo) }
	            { this.renderPostMeta(postInfo) }
            </View> 
		)
	}

	renderParallaxStickyHeader(postInfo){
		let rightIconName, 
			rightText,
			onCommentListPress = ()=>null;
		if(postInfo.comments){
			rightIconName = 'ios-text-outline';
			rightText = postInfo.CommentCount;
			onCommentListPress = this.props.onCommentListPress;
		}

		return (
			<Navbar 
				backgroundImage = { this.state.cover }
				leftIconOnPress={ ()=> this.props.router.pop() }
				leftIconName = {{ uri: postInfo.authorId.headimgurl }}
				title = {postInfo.authorId.name}
				rightIconName = { rightIconName }
				rightIconOnPress = {()=> onCommentListPress()}
				rightText = { rightText }/>
		);
	}

	render() {

		const { post } = this.props;

		return (
			<ParallaxScrollView
		        ref={(view)=>{this.parallaxView = view}}
		        headerBackgroundColor={ StyleConfig.color_dark }
		        stickyHeaderHeight={ StyleConfig.navbar_height }
		        parallaxHeaderHeight={ StyleConfig.header_height }
		        renderScrollComponent={()=> this.renderParallaxScrollComponent()}
		        renderBackground={() => this.renderParallaxBackground(post)}
		        renderForeground={() => this.renderParallaxForeground(post)}
		        renderStickyHeader={() => this.renderParallaxStickyHeader(post)}>
		        
		        { this.props.children }

			</ParallaxScrollView>
		);
	}
}

export const styles = StyleSheet.create({
    foreground:{
      height: StyleConfig.header_height,
	  paddingTop: StyleConfig.space_4
    },
	header_meta:{
		bottom:0,
		width: StyleConfig.width
	}
});

export default PostRender;