import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import AddProfile from '../components/AddProfile';
// import '../styles/ProfileScreen.css';
import '../styles/ProfileScreen.scss';
import LoadedProfile from '../components/LoadedProfile';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfiles, selectProfile } from '../features/profileSlice';
import db from '../firebase';
import { selectUser } from '../features/userSlice';

function ProfileScreen() {
	const profiles = useSelector(selectProfile);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	console.log(profiles);

	const addDefaultProfile = () => {
		db.collection('customers')
			.doc(user.uid)
			.collection('profiles')
			.doc(`Default`)
			.set({
				name: 'Default',
				movieList: [],
			})
			.then(() => {
				console.log('Document Written');
			})
			.catch((error) => {
				console.error('Error writing document: ', error);
			});
	};

	useEffect(() => {
		const unsubscribe = db
			.collection('customers')
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
				// if (profileArray.length === 0) {
				// 	addDefaultProfile();
				// }

				if (profileArray.length === 0) {
					addDefaultProfile();
					profileLoad();
				}
				dispatch(loadProfiles(profileArray));
			})
			.catch((error) => {
				console.error('Error fetching profiles', error);
			});

		return () => unsubscribe;
	}, [user.uid, dispatch]);

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

	return (
		<div className='ProfileScreen'>
			<Nav />

			<div className='main_profileScreen_container'>
				<h1 className='header'>Manage Profiles:</h1>

				<div className='profile-container'>
					{profiles.map((profile) => (
						<div key={profile.name}>
							<LoadedProfile name={profile.name} movieList={profile.movieList} />
						</div>
					))}

					<AddProfile />
				</div>
			</div>
		</div>
	);
}

export default ProfileScreen;
