import { combineReducers } from 'redux';
import subscriptionSlice from './subscriptionSlice';
import userSlice from './userSlice';

export default combineReducers({
	subscriptionSlice,
	userSlice,
});
