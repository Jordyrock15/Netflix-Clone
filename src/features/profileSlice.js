import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		profiles: [],
	},
	reducers: {
		loadProfiles: (state, action) => {
			state.profiles = action.payload;
		},
		unLoadProfiles: (state) => {
			state.profiles = [];
		},
	},
});

export const { loadProfiles, unLoadProfiles } = profileSlice.actions;

export const selectProfile = (state) => state.profiles.profiles;

export default profileSlice.reducer;
