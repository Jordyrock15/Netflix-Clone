import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import '../styles/MovieModal.scss';

function MovieModal({
	movie_name,
	isModal,
	movie_title,
	movie_description,
	setIsModal,
	rating,
	movie_id,
	photo,
}) {
	const base_url = 'https://image.tmdb.org/t/p/original/';

	const exitDetailHandler = (e) => {
		const element = e.target;
		console.log(e.target);

		if (
			element.classList.contains('movie_modal_container') ||
			element.parentElement.classList.contains('movie_modal_close')
		) {
			setIsModal(false);
		}
	};

	return (
		<div
			className='movie_modal_container'
			style={{ display: isModal ? 'block' : 'none' }}
			onClick={exitDetailHandler}
		>
			<div className='movie_modal_card'>
				<div className='movie_modal_top_row'>
					<h1>{movie_name || movie_title}</h1>
					<div className='movie_modal_close'>
						<h1>&times;</h1>
					</div>
				</div>
				<h2>
					Rating: <span className='rating'>{rating}</span>
				</h2>
				<img src={`${base_url}${photo}`} alt={`${photo}`} />
				<h2 className='movie_modal_description'>Description:</h2>
				<p>{movie_description}</p>
			</div>
		</div>
	);
}

export default MovieModal;
