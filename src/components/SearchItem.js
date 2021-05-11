import addicon from '../styles/icons/add_icon.svg';
import MovieModal from '../components/MovieModal';
import { Fragment, useState } from 'react';
import db from '../firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { selectCurrentProfile } from '../features/currentProfileSlice';

export default function SearchItem({ movie }) {
	const [isModal, setIsModal] = useState(false);
	const user = useSelector(selectUser);
	const currentProfile = useSelector(selectCurrentProfile);
	const baseURL = `https://image.tmdb.org/t/p/original/`;

	const addMovieToList = (id, title, desc, rating, poster, backdrop) => {
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
			})
			.catch((error) => {
				console.error('Error adding movie: ', error);
			});
	};

	return (
		<Fragment>
			<div className='search_poster_container'>
				<img
					className='search_row_poster'
					src={`${baseURL}${movie.backdrop_path}`}
					alt={movie.name}
					onClick={() => setIsModal(true)}
				/>
				<img
					className='search_poster_addIcon'
					src={`${addicon}`}
					alt=''
					onClick={() =>
						addMovieToList(
							movie.id,
							movie.name || movie.title,
							movie.overview,
							movie.vote_average,
							movie.poster_path,
							movie.backdrop_path
						)
					}
				/>
			</div>
			<MovieModal
				movie_name={movie.name}
				movie_title={movie.title}
				movie_description={movie.overview}
				rating={movie?.vote_average}
				movie_id={movie.id}
				photo={movie.backdrop_path}
				isModal={isModal}
				setIsModal={setIsModal}
			/>
		</Fragment>
	);
}
