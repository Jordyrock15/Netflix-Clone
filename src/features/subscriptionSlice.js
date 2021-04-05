import { createSlice } from '@reduxjs/toolkit';

const subscriptionSlice = createSlice({
	name: 'subscription',
	initialState: {
		subscription: null,
	},
	reducers: {
		subscriptionChecker: (state, action) => {
			state.subscription = action.payload;
		},
	},
});

export const { subscriptionChecker } = subscriptionSlice.actions;

export const selectSubscription = (state) => state.subscription.subscription;

export default subscriptionSlice.reducer;
