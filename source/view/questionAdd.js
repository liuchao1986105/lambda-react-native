import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TimerMixin from 'react-timer-mixin';
import Toast from 'react-native-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import * as PostAction from '../action/post';
import { getImageSource, numberValidator } from '../common';
import Navbar from '../component/navbar';
import Spinner from '../component/spinner';
import { postCategory } from '../config';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const navTitle = "博问发布";
const backgroundImageSource = getImageSource(15);
const category = postCategory.question;

const questionAddEnabled = false;

class QuestionAddPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      questionTitle:'',
      questionContent:'',
      questionTags:'',
      questionFlags:'',
      pending: false
    }
  }

  componentDidFocus(){
    Alert.alert(
      '系统提示',
      '博问的发布还有一点儿问题没有解决',
      [
        {text: '好的', onPress: () => null }
      ]
    )
  }

  questionValidator(){
    let questionTitle = this.state.questionTitle,
        questionContent = this.state.questionContent,
        questionFlags = this.state.questionFlags || 0,
        message;
    if(!_.trim(questionTitle)){
        message = "请输入博问标题";
    }
    else if(!_.trim(questionContent)){
        message = "请输入博问详情";
    }
    else if(!numberValidator(questionFlags)){
        message = "请输入正确的悬赏积分";
    }
    if(message){
       Toast.show(message);
       return false;
    }
    return {
      Title: questionTitle,
      Content: questionContent,
      Flags: questionFlags,
    };
  }

  onQuestionSendPress(){
    if(questionAddEnabled === false){
      return;
    }
    const questionData = this.questionValidator();
    if(questionData){
        this.setState({ pending: true });

        this.props.postAction.addPost({
          category, 
          data: questionData,
          resolved: (data)=>{
            this.onQuestionResolved(data);
          },
          rejected: (data)=>{
            this.onQuestionRejected(data);
          }
        });
    }
  }

  onQuestionResolved(){
    const { router } = this.props;
    Toast.show("恭喜你，博问发布成功");
    this.timer = TimerMixin.setTimeout(() => {
        if(router.getPreviousRoute().name === 'userAsset'){
          router.replacePreviousAndPop(ViewPage.userAsset(), {
            category: category
          });
        }else{
          router.replace(ViewPage.userAsset(), {
            category: category
          });
        }
	  }, 2000);
  }

  onQuestionRejected(){
    this.setState({pending: false});
    Toast.show("博问发布失败，请稍候重试");
  }

  renderNavbar(){
    return (
      <Navbar leftIconOnPress={ ()=>this.props.router.pop() }/>
    )
  }

  renderQuestionTitle(){
    return (
          <View>
              <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
                <Text style={[CommonStyles.text_danger, CommonStyles.font_xs]}>
                  博问标题
                </Text>
              </View>
              <View  style={[ CommonStyles.p_a_3 ]}>
                <TextInput 
                    ref="txtTitle"
                    maxLength = { 80 }
                    multiline = { true }
                    editable = { questionAddEnabled }
                    style={ [ComponentStyles.textarea, styles.text_title] }
                    placeholder={'请输入博问标题...'}
                    placeholderTextColor={ StyleConfig.color_dark }
                    underlineColorAndroid = { 'transparent' }
                    onChangeText = {(val)=>this.setState({questionTitle: val})}
                    value={ this.state.questionTitle } />
              </View>
          </View>
      )
  }

  renderQuestionContent(){
      return (
          <View>
            <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
                <Text style={[CommonStyles.text_danger, CommonStyles.font_xs]}>
                  博问详情
                </Text>
            </View>
            <View style={[ CommonStyles.p_a_3 ]}>
                <TextInput 
                    ref="txtContent"
                    maxLength = { 1000 }
                    multiline = { true }
                    editable = { questionAddEnabled }
                    style={ [ComponentStyles.textarea, styles.text_content] }
                    placeholder={'请输入博问详情...'}
                    placeholderTextColor={ StyleConfig.color_gray }
                    underlineColorAndroid = { 'transparent' }
                    onChangeText = {(val)=>this.setState({questionContent: val})}
                    value={ this.state.questionContent } />
            </View>
          </View>
      )
  }

  renderQuestionFlags(){
     return (
        <View>
          <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
              <Text style={[CommonStyles.text_danger, CommonStyles.font_xs]}>
                悬赏积分
              </Text>
          </View>
          <View style={[ CommonStyles.p_a_3 ]}>
          <TextInput 
                ref="txtFlags"
                maxLength = { 5 }
                multiline = { false }
                keyboardType='numeric'
                editable = { questionAddEnabled }
                style={ [ComponentStyles.input] }
                placeholder={'请输入悬赏积分，留空则默认为0'}
                placeholderTextColor={ StyleConfig.color_gray }
                underlineColorAndroid = { 'transparent' }
                onChangeText = {(val)=>this.setState({questionFlags: val})}
                value={ this.state.questionFlags } />
          </View>
        </View>
     )
  }

  renderUserInfo(){
    const { user } = this.props;
    return (
         <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle ]}>
            <Image ref={view => this.imgView=view}
              style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2] }
              source={ {uri: user.Avatar } }>
            </Image>
            <Text style={ [ CommonStyles.text_gray, CommonStyles.font_xs ] }>
              { user.DisplayName }
            </Text>
        </View>
    )
  }

  renderSendButton(){
    return (
      <TouchableOpacity
            activeOpacity={ StyleConfig.touchable_press_opacity }
            style={[ ComponentStyles.btn, ComponentStyles.btn_sm, ComponentStyles.btn_primary_outline ]}
            onPress={()=>this.onQuestionSendPress()}>
            <Text style={[ComponentStyles.btn_text, CommonStyles.text_primary, CommonStyles.font_xs]}>
              提交
            </Text>
        </TouchableOpacity>
    )
  }

  renderQuestionOp(){
    return (
        <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
          { this.renderUserInfo() }
          { this.renderSendButton() }
        </View>
    )
  }

  renderPending(){
    if(this.state.pending === true){
      return (
        <Spinner style={ ComponentStyles.pending_container }/>
      )
    }
  }

  renderContent(){
    return (
        <ScrollView
           keyboardDismissMode= { 'interactive'}
           showsVerticalScrollIndicator  = { false }
           keyboardShouldPersistTaps  = { true }>
          { this.renderQuestionTitle()}
          { this.renderQuestionFlags()}
          { this.renderQuestionContent() }
          { this.renderQuestionOp() }
        </ScrollView>
    )
  }

  renderPending(){
    if(this.state.pending === true){
      return (
        <Spinner style={ ComponentStyles.pending_container }/>
      )
    }
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        { this.renderNavbar() }
        { this.renderContent() }
        { this.renderPending() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text_title:{
    height: 40
  },
  text_content:{
    height: StyleConfig.screen_height / 5
  }
})

export default connect((state, props) => ({
  user: state.user
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}), null, {
  withRef: true
})(QuestionAddPage);