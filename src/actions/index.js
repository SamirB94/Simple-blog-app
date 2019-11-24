import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';
import { async } from 'q';

//this is action creator inside the action creator
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
	await dispatch(fetchPosts());
 
	// const userIds = _.uniq(_.map(getState().posts, 'userId'));
	
	// userIds.forEach(id => dispatch(fetchUser(id)));

	//refactoring lodash method chains bunch of additional funcions to manipulate with data
	_.chain(getState().posts)
		//iterating over users and getting user id from userId
		.map('userId')
		//returns array with just unique user IDs
		.uniq()
		//look at each ID and dispatch the result of calling fetchUser with the given ID
		.forEach(id => dispatch(fetchUser(id)))
		//something like execute...value is must in order to execute _.chain()
		.value();
};

export const fetchPosts = () => async dispatch => {
	const response = await jsonPlaceholder.get('/posts');

	dispatch({ type: 'FETCH_POSTS', payload: response.data});
};

export const fetchUser = (id) => async dispatch => {
	const response = await jsonPlaceholder.get(`/users/${id}`);

	dispatch({ type: 'FETCH_USER', payload: response.data });
};

// export const fetchUser = (id) => dispatch => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {
// 	const response = await jsonPlaceholder.get(`/users/${id}`);

// 	dispatch({ type: 'FETCH_USER', payload: response.data });
// });


