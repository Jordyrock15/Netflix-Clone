import { createSlice } from '@reduxjs/toolkit';

const searchMoviesSlice = createSlice({
	name: 'searchMovies',
	initialState: {
		searchMovies: null,
	},
	reducers: {
		searchMoviesChecker: (state, action) => {
			state.searchMovies = action.payload;
		},
	},
});

export const { searchMoviesChecker } = searchMoviesSlice.actions;

export const selectSearchMovies = (state) => state.searchMovies.searchMovies;

export default searchMoviesSlice.reducer;
