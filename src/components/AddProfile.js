import React from 'react';
import addProfileIcon from '../styles/icons/AddProfile.svg';
import '../styles/AddProfile.css';

function AddProfile() {
	return (
		<div className='AddProfile_container'>
			<img src={`${addProfileIcon}`} alt='addProfileIcon' />
		</div>
	);
}

export default AddProfile;
