import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentProfile } from '../features/currentProfileSlice';
import { selectMovieList } from '../features/movieListSlice';

import { selectUser } from '../features/userSlice';
import db from '../firebase';
import '../styles/Row.css';
// import '../styles/Row.scss';

import RowItem from './RowItem';

function MovieListRow({ isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const currentProfile = useSelector(selectCurrentProfile);
	const dispatch = useDispatch();
	const movieListRedux = useSelector(selectMovieList);
	const [refresh, setRefresh] = useState(0);
	const user = useSelector(selectUser);
	const [movieList, setMovieList] = useState([]);

	const base_url = 'https://image.tmdb.org/t/p/original/';

	const movieListLoad = () => {
		db.collection('customers')
			.doc(user.uid)
			.collection('profiles')
			.doc(currentProfile)
			.get()
			.then((querySnapshot) => {
				setMovieList(querySnapshot.data().movieList);
				console.log(movies);
			})
			.catch((error) => {
				console.error('Error fetching profiles', error);
			});
	};

	useEffect(() => {
		setRefresh(movieListRedux);
		setMovies([]);
		movieListLoad();
	}, [movieListRedux]);

	useEffect(() => {
		if (movieList.length !== 0) {
			movieList.forEach((movieid) => setMovies((movies) => [...movies, movieid]));
		}
	}, [movieList]);

	return (
		<div className='row'>
			{movieList.length !== 0 && (
				<div>
					<h2>My List</h2>

					<div className={`${isLargeRow && 'row_posters_large'}`}>
						{movies.map(
							(movie) =>
								isLargeRow &&
								movie.poster && (
									<Fragment key={movie.id}>
										<RowItem
											movie_id={movie.id}
											poster_path={movie.poster}
											movie_title={movie.title}
											backdrop_path={movie.backdrop}
											base_url={base_url}
											movie_description={movie.description}
											rating={movie?.rating}
											isLargeRow={isLargeRow}
										/>
									</Fragment>
								)
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default MovieListRow;
