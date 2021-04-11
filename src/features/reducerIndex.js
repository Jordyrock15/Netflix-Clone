import { combineReducers } from 'redux';
import subscriptionSlice from './subscriptionSlice';
import userSlice from './userSlice';
import profileSlice from './profileSlice';
import searchMoviesSlice from './searchMoviesSlice';

export default combineReducers({
	subscriptionSlice,
	userSlice,
	profileSlice,
	searchMoviesSlice,
});
