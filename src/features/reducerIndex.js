import { combineReducers } from 'redux';
import subscriptionSlice from './subscriptionSlice';
import userSlice from './userSlice';
import profileSlice from './profileSlice';

export default combineReducers({
	subscriptionSlice,
	userSlice,
	profileSlice,
});
