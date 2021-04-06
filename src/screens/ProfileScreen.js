import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import AddProfile from '../components/AddProfile';
import '../styles/ProfileScreen.css';
import LoadedProfile from '../components/LoadedProfile';
import { useSelector } from 'react-redux';
import { selectProfile } from '../features/profileSlice';

function ProfileScreen() {
	const profiles = useSelector(selectProfile);

	return (
		<div className='ProfileScreen'>
			<Nav />

			<div className='main_profileScreen_container'>
				<h1 className='header'>Manage Profiles:</h1>

				<div className='profile-container'>
					{profiles?.map((profile) => (
						<LoadedProfile name={profile.name} key={profile.name} />
					))}

					<AddProfile />
				</div>
			</div>
		</div>
	);
}

export default ProfileScreen;
