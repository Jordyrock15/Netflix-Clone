import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadProfiles } from '../features/profileSlice';
import db from '../firebase';
import addProfileIcon from '../styles/icons/AddProfile.svg';
import '../styles/AddProfile.css';

function AddProfile() {
	const [isActive, setIsActive] = useState(false);
	const [isProfiles, setIsProfiles] = useState([]);

	const user = useSelector(selectUser);

	const profileName = useRef(null);
	const dispatch = useDispatch();

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
				setIsProfiles(profileArray);
			})
			.catch((error) => {
				console.error('Error fetching profiles', error);
			});
	};

	const formHandler = (e) => {
		e.preventDefault();

		db.collection('customers')
			.doc(user.uid)
			.collection('profiles')
			.doc(`${profileName.current.value}`)
			.set({
				name: profileName.current.value,
				movieList: '',
			})
			.then(() => {
				setIsProfiles([]);
				console.log('Document Written');
			})
			.catch((error) => {
				console.error('Error writing document: ', error);
			});

		setIsProfiles([]);
		profileLoad();
		setIsActive(false);
	};

	useEffect(() => {
		setIsProfiles([]);
		profileLoad();
	}, []);

	useEffect(() => {
		dispatch(loadProfiles(isProfiles));
	}, [dispatch, isProfiles]);

	return (
		<div className='AddProfile_container' onClick={() => setIsActive(true)}>
			{isActive === true ? (
				<form onSubmit={formHandler}>
					<input ref={profileName} type='text' placeholder='Name' />
					<button type='submit'>Add</button>
				</form>
			) : (
				<img src={`${addProfileIcon}`} alt='addProfileIcon' />
			)}
		</div>
	);
}

export default AddProfile;
