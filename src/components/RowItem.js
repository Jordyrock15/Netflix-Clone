import React, { Fragment, useEffect, useState } from 'react';
import addicon from '../styles/icons/add_icon.svg';
import MovieModal from './MovieModal';
import axios from '../api/axios';

function RowItem({
	movie_id,
	isLargeRow,
	poster_path,
	backdrop_path,
	movie_name,
	base_url,
	movie_title,
	movie_description,
	rating,
}) {
	const [isModal, setIsModal] = useState(false);

	return (
		<Fragment>
			<div
				className={`poster_container ${isLargeRow && 'poster_container_large'}`}
				onClick={() => setIsModal(true)}
			>
				<img
					className={`row_poster ${isLargeRow && 'row_poster_large'}`}
					src={`${base_url}${isLargeRow ? poster_path : backdrop_path}`}
					alt={movie_name || movie_title}
				/>
				<img className='list_add_icon' src={`${addicon}`} alt='' />
			</div>
			<MovieModal
				movie_name={movie_name}
				movie_title={movie_title}
				movie_description={movie_description}
				rating={rating}
				movie_id={movie_id}
				photo={backdrop_path}
				isModal={isModal}
				setIsModal={setIsModal}
			/>
		</Fragment>
	);
}

export default RowItem;
