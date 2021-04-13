import React from 'react';
import { useSelector } from 'react-redux';
import Nav from '../components/Nav';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import PlansScreen from './PlansScreen';
// import '../styles/AccountScreen.css';
import '../styles/AccountScreen.scss';

function ProfileScreen() {
	const user = useSelector(selectUser);

	return (
		<div className='profileScreen'>
			<Nav />
			<div className='profileScreen_body'>
				<h1>Edit Account</h1>
				<div className='profileScreen_info'>
					<img
						src='https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png'
						alt='profile'
					/>
					<div className='profileScreen_details'>
						<h2>{user.email}</h2>
						<div className='profileScreen_plans'>
							<h3>Plans</h3>
							<PlansScreen />
							<button
								onClick={() => auth.signOut()}
								className='profileScreen_signOut'
							>
								Sign Out
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileScreen;
