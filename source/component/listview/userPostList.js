import React, { Component } from 'react';
import {
	View,
	ListView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UserPostRow from './userPostRow';
import Spinner from '../spinner';
import EndTag from '../endtag';
import ViewPage from '../view';
import { postCategory } from '../../config';

//const category = postCategory.home;

class UserPostList extends Component {
	
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
		const { ui } = this.props;
		if (ui.pagePending) {
			return <Spinner/>;
		}
		if(ui.refreshPending!==true && ui.pageEnabled!==true){
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
		const { category } = this.props;
		if(post && post._id){
			return (
				<UserPostRow 
					key={ post.Id } 
					post={ post } 
					category={ category }
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
    posts: state.user[props.category],
	user: state.user,
    ui: state.userListUI[props.category]
}), dispatch => ({ 

}))(UserPostList);