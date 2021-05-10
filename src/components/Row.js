import React, { Fragment, useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/Row.css';
// import '../styles/Row.scss';

import RowItem from './RowItem';

function Row({ title, fetchUrl, isLargeRow = false }) {
	const [movies, setMovies] = useState([]);

	const base_url = 'https://image.tmdb.org/t/p/original/';

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			console.log(request.data.results);
			return request;
		}

		fetchData();
	}, [fetchUrl]);

	return (
		<div className='row'>
			<h2>{title}</h2>
			<div className={`row_posters ${isLargeRow && 'row_posters_large'}`}>
				{movies.map(
					(movie) =>
						((isLargeRow && movie.poster_path) ||
							(!isLargeRow && movie.backdrop_path)) && (
							<Fragment key={movie.id}>
								<RowItem
									movie_id={movie.id}
									isLargeRow={isLargeRow}
									poster_path={movie.poster_path}
									backdrop_path={movie.backdrop_path}
									movie_name={movie.name}
									movie_title={movie.title}
									base_url={base_url}
									movie_description={movie.overview}
									rating={movie?.vote_average}
								/>
							</Fragment>

							// <div
							// 	className={`poster_container ${
							// 		isLargeRow && 'poster_container_large'
							// 	}`}
							// 	key={movie.id}
							// >
							// 	<img
							// 		className={`row_poster ${isLargeRow && 'row_poster_large'}`}
							// 		key={movie.id}
							// 		src={`${base_url}${
							// 			isLargeRow ? movie.poster_path : movie.backdrop_path
							// 		}`}
							// 		alt={movie.name}
							// 	/>
							// 	<img className='list_add_icon' src={`${addicon}`} alt='' />
							// </div>
						)
				)}
			</div>
		</div>
	);
}

export default Row;
