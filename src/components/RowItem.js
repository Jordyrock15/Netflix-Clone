import React, { Fragment, useEffect, useState } from 'react';
import addicon from '../styles/icons/add_icon.svg';
import closeicon from '../styles/icons/close.svg';

import MovieModal from './MovieModal';
import axios from '../api/axios';
import db from '../firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProfile } from '../features/currentProfileSlice';
import { selectUser } from '../features/userSlice';
import { movieListChecker, selectMovieList } from '../features/movieListSlice';

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
	genre_ids,
	rowType,
}) {
	const [isModal, setIsModal] = useState(false);
	const user = useSelector(selectUser);
	const currentProfile = useSelector(selectCurrentProfile);
	const dispatch = useDispatch();
	const movieListRedux = useSelector(selectMovieList);

	const addMovieToList = (id, title, desc, rating, poster, backdrop, rowType) => {
		if (rowType === 'addicon') {
			db.collection('customers')
				.doc(user.uid)
				.collection('profiles')
				.doc(currentProfile)
				.update({
					movieList: firebase.firestore.FieldValue.arrayUnion({
						id: id,
						title: title,
						description: desc,
						rating: rating,
						poster: poster,
						backdrop: backdrop,
					}),
				})
				.then(() => {
					console.log('Movie Added');
					dispatch(movieListChecker(movieListRedux + 1));
				})
				.catch((error) => {
					console.error('Error adding movie: ', error);
				});
		} else {
			db.collection('customers')
				.doc(user.uid)
				.collection('profiles')
				.doc(currentProfile)
				.update({
					movieList: firebase.firestore.FieldValue.arrayRemove({
						id: id,
						title: title,
						description: desc,
						rating: rating,
						poster: poster,
						backdrop: backdrop,
					}),
				})
				.then(() => {
					console.log('Document Successfully deleted');
					dispatch(movieListChecker(movieListRedux + 1));
				})
				.catch((error) => {
					console.error('Error removing document: ', error);
				});
		}
	};

	return (
		<Fragment>
			<div className={`poster_container ${isLargeRow && 'poster_container_large'}`}>
				<img
					className={`row_poster ${isLargeRow && 'row_poster_large'}`}
					src={`${base_url}${isLargeRow ? poster_path : backdrop_path}`}
					alt={movie_name || movie_title}
					onClick={() => setIsModal(true)}
				/>
				<img
					className='list_add_icon'
					src={rowType === 'addicon' ? addicon : closeicon}
					alt=''
					onClick={() =>
						addMovieToList(
							movie_id,
							movie_name || movie_title,
							movie_description,
							rating,
							poster_path,
							backdrop_path,
							rowType
						)
					}
				/>
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
