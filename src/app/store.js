import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import subscriptionReducer from '../features/subscriptionSlice';
import profileReducer from '../features/profileSlice';
import searchMoviesReducer from '../features/searchMoviesSlice';

export default configureStore({
	reducer: {
		user: userReducer,
		subscription: subscriptionReducer,
		profiles: profileReducer,
		searchMovies: searchMoviesReducer,
	},
});
