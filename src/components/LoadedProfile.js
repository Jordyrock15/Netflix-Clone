import React, { useState } from 'react';
// import '../styles/LoadedProfile.css';
import '../styles/LoadProfile.scss';
import close from '../styles/icons/close.svg';
import db from '../firebase';
import { loadProfiles } from '../features/profileSlice';
import { addCurrentProfile } from '../features/currentProfileSlice';
import { selectUser } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { movieListChecker } from '../features/movieListSlice';

function LoadedProfile({ name, movieList }) {
	const [isHover, setIsHover] = useState(false);
	const user = useSelector(selectUser);
	const history = useHistory();
	const dispatch = useDispatch();

	const removeProfile = () => {
		db.collection('customers')
			.doc(user.uid)
			.collection('profiles')
			.doc(`${name}`)
			.delete()
			.then(() => {
				console.log('Document Successfully deleted');
				dispatch(loadProfiles([]));
				profileLoad();
			})
			.catch((error) => {
				console.error('Error removing document: ', error);
			});
	};

	const profileLoad = () => {
		db.collection('customers')
			.doc(user.uid)
			.collection('profiles')
			.get()
			.then((querySnapshot) => {
				let profileArray = [];
				querySnapshot.forEach(async (profile) => {
					profileArray.push({
						name: profile.data().name,
						movieList: profile.data().movieList,
					});
				});
				dispatch(loadProfiles(profileArray));
			})
			.catch((error) => {
				console.error('Error fetching profiles', error);
			});
	};

	const currentProfile = (name) => {
		dispatch(movieListChecker([]));
		dispatch(addCurrentProfile(name));

		localStorage.setItem('Current Profile', name);

		history.push('/');
	};

	return (
		<div className='single_profile_container'>
			<div
				className='profile_icon_container'
				onMouseEnter={() => {
					name !== 'Default' && setIsHover(true);
				}}
				onMouseLeave={() => {
					setIsHover(false);
				}}
			>
				<img
					className='profile_icon'
					src='https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png'
					alt=''
					onClick={() => currentProfile(name)}
				/>
				{isHover && (
					<img
						onClick={() => removeProfile()}
						className='profile_close_icon'
						src={`${close}`}
						alt=''
					/>
				)}
			</div>
			<h2>{name}</h2>
		</div>
	);
}

export default LoadedProfile;
