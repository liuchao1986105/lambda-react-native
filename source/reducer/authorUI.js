import * as types from '../constant/actiontype';
import { pageSize } from '../config';



export default function (state = {}, action) {
	const { type, meta={}, payload = [], error } = action;
	const { sequence={}, user_id } = meta;
	const pendingStatus = sequence.type == 'start';

	switch (type) {
		case types.FETCH_AUTHOR_DETAIL:
			return {
				...state,
				[user_id]:{
					...state[user_id],
					refreshPending: pendingStatus
				}
			};
		case types.FETCH_AUTHOR_POSTS:
			return {
				...state,
				[user_id]:{
					...state[user_id],
					refreshPending: pendingStatus,
					postPageEnabled: payload.length >= pageSize,
					postPageIndex: 1
				}
			};
		case types.FETCH_AUTHOR_POSTS_WITHPAGE:
			return {
				...state,
				[user_id]:{
					...state[user_id],
					postPageEnabled: payload.length >= pageSize,
					postPagePending: pendingStatus,
					postPageIndex: (!error && !pendingStatus) ? state[user_id].postPageIndex + 1: state[user_id].postPageIndex	
				}
			};
		default:
			return state;
	}
}