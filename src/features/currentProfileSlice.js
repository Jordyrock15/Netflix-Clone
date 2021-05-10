import { createSlice } from '@reduxjs/toolkit';

const currentProfileSlice = createSlice({
	name: 'currentProfile',
	initialState: {
		currentProfile: 'Default',
	},
	reducers: {
		addCurrentProfile: (state, action) => {
			state.currentProfile = action.payload;
		},
		unLoadCurrentProfile: (state) => {
			state.currentProfile = 'Default';
		},
	},
});

export const { addCurrentProfile, unLoadCurrentProfile } = currentProfileSlice.actions;

export const selectCurrentProfile = (state) => state.currentProfile.currentProfile;

export default currentProfileSlice.reducer;
