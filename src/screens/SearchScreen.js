import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Nav from '../components/Nav';
import { selectSearchMovies } from '../features/searchMoviesSlice';
// import '../styles/SearchScreen.css';
import '../styles/SearchScreen.scss';
import addIcon from '../styles/icons/add_icon.svg';

function SearchScreen() {
	const searchedMovies = useSelector(selectSearchMovies);
	const [isLoading, setIsLoading] = useState(true);

	const base_url = 'https://image.tmdb.org/t/p/original/';

	useEffect(() => {
		if (searchedMovies === null) {
			setIsLoading(true);
			console.log(isLoading);
		} else {
			setIsLoading(false);
			console.log(isLoading);
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
									<div className={`search_poster_container`} key={movie.id}>
										<img
											className={`search_row_poster`}
											key={movie.id}
											src={`${base_url}${movie.backdrop_path}`}
											alt={movie.name}
										/>
										<img
											className='search_poster_addIcon'
											src={`${addIcon}`}
											alt=''
										/>
									</div>
								)
						)}
				</div>
			</div>
		</div>
	);
}

export default SearchScreen;
