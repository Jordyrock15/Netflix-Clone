import React from 'react';
import '../styles/LoadedProfile.css';

function LoadedProfile({ name }) {
	return (
		<div className='profile_container'>
			<img
				src='https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png'
				alt=''
			/>
			<h2>{name}</h2>
		</div>
	);
}

export default LoadedProfile;
