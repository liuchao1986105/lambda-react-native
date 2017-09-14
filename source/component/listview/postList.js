import React, { Component } from 'react';
import {
	View,
	ListView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as PostAction from '../../action/post';
import PostRow from './postRow';
import Spinner from '../spinner';
import EndTag from '../endtag';
import ViewPage from '../view';

class PostList extends Component {
	
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: dataSource.cloneWithRows(props.posts||{}),
		};

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.posts && nextProps.posts.length && nextProps.posts !== this.props.posts) {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(nextProps.posts)
			});
		}
	}

	renderListFooter() {
		const { posts, ui } = this.props;
		if (ui.pagePending) {
			return <Spinner/>;
		}
		if(ui.refreshPending!==true && ui.pageEnabled!==true && posts.length){
			return <EndTag/>;
		}
	}

	onListRowPress(post){
		this.props.router.push(ViewPage.post(), {
			id: post._id,
			category: this.props.category,
			post
		});
	}

	renderListRow(post) {
		if(post && post._id){
			return (
				<PostRow 
					key={ post._id } 
					post={ post } 
					category={ this.props.category }
					onRowPress={ (e)=>this.onListRowPress(e) } />
			)
		}
	}

	render() {
		return (
			<ListView
				ref = {(view)=> this.listView = view }
				removeClippedSubviews
				enableEmptySections = { true }
				onEndReachedThreshold={ 10 }
				initialListSize={ 10 }
				pageSize = { 10 }
				pagingEnabled={ false }
				scrollRenderAheadDistance={ 150 }
				dataSource={ this.state.dataSource }
				renderRow={ (e)=>this.renderListRow(e) }
				renderFooter={ (e)=>this.renderListFooter(e) }>
			</ListView>
		);
	}
}

export default connect((state, props) => ({
  posts: state.post[props.category],
  ui: state.postListUI[props.category]
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}))(PostList);