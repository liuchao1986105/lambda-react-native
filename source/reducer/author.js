import * as types from '../constant/actiontype';

export default function (state = {}, action) {

	let { payload, meta = {}, type, error } = action;
	const { sequence = {}, user_id } = meta;

	if (sequence.type === 'start' || error) {
		return state;
	}

	if(payload && payload.data){
		payload = payload.data;
	}

	switch (type) {
		case types.FETCH_AUTHOR_DETAIL:
			return {
				...state,
				[user_id]: payload
			};
		case types.FETCH_AUTHOR_POSTS:
			return {
				...state,
				[user_id]: {
					...state[user_id],
					posts: payload
				}
			};
		case types.FETCH_AUTHOR_POSTS_WITHPAGE:
			return {
				...state,
				[user_id]: {
					...state[user_id],
					posts: state[user_id].posts.concat(payload)
				}
			};
		default:
			return state;
	}
}