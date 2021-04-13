import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/Row.css';
// import '../styles/Row.scss';
import addicon from '../styles/icons/add_icon.svg';

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
							<div
								className={`poster_container ${
									isLargeRow && 'poster_container_large'
								}`}
								key={movie.id}
							>
								<img
									className={`row_poster ${isLargeRow && 'row_poster_large'}`}
									key={movie.id}
									src={`${base_url}${
										isLargeRow ? movie.poster_path : movie.backdrop_path
									}`}
									alt={movie.name}
								/>
								<img className='list_add_icon' src={`${addicon}`} alt='' />
							</div>
						)
				)}
			</div>
		</div>
	);
}

export default Row;
