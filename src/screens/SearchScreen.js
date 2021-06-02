import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Nav from '../components/Nav';
import { selectSearchMovies } from '../features/SearchMovieSlice';
import '../styles/SearchScreen.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchItem from '../components/SearchItem';

function SearchScreen() {
	const searchedMovies = useSelector(selectSearchMovies);
	const [isLoading, setIsloading] = useState(true);
	const [isModal, setIsModal] = useState(false);

	useEffect(() => {
		if (searchedMovies === null) {
			setIsloading(true);
		} else {
			setIsloading(false);
		}
	}, [searchedMovies]);

	return (
		<div className='search_screen'>
			<Nav />
			<div className='movie_container'>
				<h1 className='search_title'>Search Results</h1>
				<div className='search_movie_container'>
					{isLoading === false &&
						searchedMovies.map(
							(movie) =>
								movie.backdrop_path && (
									<SearchItem
										movie={movie}
										isModal={isModal}
										setIsModal={setIsModal}
										key={movie.id}
									/>
								)
						)}
				</div>
			</div>
			<ToastContainer
				position='bottom-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
}

export default SearchScreen;
