import React from 'react';
import Nav from '../components/Nav';
import AddProfile from '../components/AddProfile';
import '../styles/ProfileScreen.css';

function ProfileScreen() {
	return (
		<div className='ProfileScreen'>
			<Nav />

			<div className='main_profileScreen_container'>
				<h1 className='header'>Manage Profiles:</h1>

				<div className='profile-container'>
					<img
						src='https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png'
						alt=''
					/>
					<img
						src='https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png'
						alt=''
					/>
					<img
						src='https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png'
						alt=''
					/>

					<AddProfile />
				</div>
			</div>
		</div>
	);
}

export default ProfileScreen;
