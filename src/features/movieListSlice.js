import { createSlice } from '@reduxjs/toolkit';

const movieListSlice = createSlice({
	name: 'movieList',
	initialState: {
		movieList: 1,
	},
	reducers: {
		movieListChecker: (state, action) => {
			state.movieList = action.payload;
		},
	},
});

export const { movieListChecker } = movieListSlice.actions;

export const selectMovieList = (state) => state.movieList.movieList;

export default movieListSlice.reducer;
