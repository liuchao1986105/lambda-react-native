import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Panel from '../component/panel';
import Navbar from '../component/navbar';
import Config from '../config';
import { ComponentStyles, CommonStyles } from '../style';

const navTitle = "关于";
const authorAvatar = require('../image/author.jpg');

class AboutPage extends Component {

  constructor (props) {
    super(props);
  }

  renderNavbar(){
    return (
      <Navbar
        leftIconOnPress={ ()=>this.props.router.pop() }
        title={ navTitle }/>
    )
  }

  renderAboutItem(){
    return (
      <Panel
        title = { `${Config.appInfo.name} - ${Config.appInfo.descr}` }
        descr = { Config.appInfo.descr2 }/>
    )
  }

  renderDeclareItem(){
    return (
      <Panel
        title = "特别声明"
        descr={ Config.appInfo.declare }/>
    )
  }

  renderAuthorItem(){
    const tailImage = <Image 
        style={[ ComponentStyles.avatar, styles.avatar ]}
        resizeMode={"cover"}
        source={ authorAvatar }/>

    return (
      <Panel
        title = "作者信息"
        descr = { Config.authorInfo.email }
        tailControl = { tailImage }/>
    )
  }

  renderCopyright(){
    return (
      <View style={ [ComponentStyles.pos_absolute, styles.footer]}>
        <Text style={ [ CommonStyles.text_center, CommonStyles.m_b_4, CommonStyles.text_muted ] }>
          { Config.appInfo.copyright }
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        { this.renderNavbar() }
        { this.renderAboutItem() }
        { this.renderDeclareItem() }
        { this.renderAuthorItem() }
        { this.renderCopyright() }
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  avatar:{
    width: 50,
    height: 50,
    borderRadius: 25
  },
  footer:{
    bottom : 0
  }
});

export default AboutPage;