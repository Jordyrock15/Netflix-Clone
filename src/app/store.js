import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import subscriptionReducer from '../features/subscriptionSlice';
import profileReducer from '../features/profileSlice';

export default configureStore({
	reducer: {
		user: userReducer,
		subscription: subscriptionReducer,
		profiles: profileReducer,
	},
});
