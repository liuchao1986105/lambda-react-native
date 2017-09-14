import React, { Component } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as CommentAction from '../action/comment';
import ViewPage from '../component/view';
import Navbar from '../component/navbar';
import Spinner from '../component/spinner';
import SingleButton from '../component/button/single';
import HintMessage from '../component/hintMessage';
import NewsCommentList from '../component/listview/newsCommentList';
import PostCommentList from '../component/listview/postCommentList';
import { postCategory } from '../config';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';
import { lambdaImage } from '../common';

const navTitle = "评论";

class PostCommentPage extends Component {

  constructor (props) {
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

  componentDidMount() {
    const { commentAction, category, id, blogger } = this.props;
    commentAction.getCommentsByPost(category, id, {
      blogger
    });
  }

  onCommentPress(){
    const { post, router, category, id } = this.props;
		if (router && category && id) {
      router.push(ViewPage.commentAdd(), {
        data: post,
				blogger: post.Blogger,
				category: category,
				id: id
      });
		}
  }
  
  renderNavbar(){
    const { post } = this.props;
    return (
      <Navbar
        leftIconName = { lambdaImage }
        title = { 'testuser6' } 
        leftIconOnPress={ ()=>this.props.router.pop() } />
    )
  }

  renderSourceAuthor(post){
    return (
      <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.m_b_2]}>
        <Image ref={view => this.imgView=view}
          style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2] }
          source={ {uri:post.Avatar} }>
        </Image>
        <Text style={ [ CommonStyles.text_gray, CommonStyles.font_xs ] }>
          { post.Author }
        </Text>
      </View>
    )
  }

  renderSourceContent(post){
    const sourceContent = post.Title;
    return (
      <View>
          <Text style={[ CommonStyles.text_black, CommonStyles.font_sm, CommonStyles.line_height_sm ]}>
            { sourceContent }
          </Text>
      </View>
    )
  }

  renderSource(){
    const { post } = this.props; 
    return (
      <View style={[ CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
        { this.renderSourceAuthor(post) }
        { this.renderSourceContent(post) }
      </View>
    )
  }

  renderContent(){
    const { router, comments, ui, category, blogger,  id } = this.props;
    if (this.state.hasFocus === false || !ui || ui.refreshPending !== false) {
      return (
					<Spinner style={ ComponentStyles.message_container }/>
      )
    }
    if (comments && comments.length) {
      return (
          <View style={ CommonStyles.flex_1 }>
              {
                category === postCategory.news?
                <NewsCommentList router={ router } category={ category } blogger={ blogger } id={ id }/>
                :
                <PostCommentList router={ router } category={ category } blogger={ blogger } id={ id }/>
              }
          </View>
      )
    }
    return(
      <HintMessage message=" - 暂无回复记录 - "/>
    );
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
					onPress = { ()=>this.props.router.pop() }/>
      </View>
    );
  }
}

export default connect((state, props) => ({
  comments : state.comment[props.id],
  ui: state.commentListUI[props.id]
}), dispatch => ({ 
  commentAction : bindActionCreators(CommentAction, dispatch)
}), null, {
  withRef: true
})(PostCommentPage);