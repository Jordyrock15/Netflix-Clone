import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { selectSubscription } from '../features/subscriptionSlice';
import { auth } from '../firebase';
//Icons
import notificationIcon from '../styles/icons/notification.svg';
import netflixLogo from '../styles/icons/netflix-logo.png';
import searchIcon from '../styles/icons/search.svg';

import '../styles/Nav.css';

function Nav() {
	const [show, handleShow] = useState(false);
	const history = useHistory();
	const subscription = useSelector(selectSubscription);
	const location = useLocation();

	const transitionNavBar = () => {
		if (window.scrollY > 100) {
			handleShow(true);
		} else {
			handleShow(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', transitionNavBar);
		return () => window.removeEventListener('scroll', transitionNavBar);
	}, []);

	return (
		<div className={`nav ${show && 'nav_black'}`}>
			<div className='nav_contents'>
				<img
					onClick={() => {
						subscription != null ? history.push('/') : history.push('/account');
					}}
					className='nav_logo'
					src={`${netflixLogo}`}
					alt=''
				/>

				<div className='nav_dropdown'>
					<img
						className='nav_avatar'
						src='https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png'
						alt=''
					/>

					<div className='nav_dropdown_content'>
						<h4 onClick={() => history.push('/profiles')}>Manage profiles</h4>
						<div className='drop_divider'></div>
						<h4 onClick={() => history.push('/account')} className='nav-light-link'>
							Account
						</h4>
						<h4 onClick={() => history.push('/help')} className='nav-light-link'>
							Help Centre
						</h4>
						<h4 className='nav-light-link' onClick={() => auth.signOut()}>
							Sign out of Netflix
						</h4>
					</div>
				</div>

				<img
					className='notificationIcon'
					src={`${notificationIcon}`}
					alt='notificationIcon'
					style={
						location.pathname === '/help' ||
						location.pathname === '/account' ||
						location.pathname === '/profiles' ||
						subscription === null
							? { display: `none` }
							: { display: `block` }
					}
				/>
				<img
					className='searchIcon'
					src={`${searchIcon}`}
					alt='searchIcon'
					style={
						location.pathname === '/help' ||
						location.pathname === '/account' ||
						location.pathname === '/profiles' ||
						subscription === null
							? { display: `none` }
							: { display: `block` }
					}
				/>
			</div>
		</div>
	);
}

export default Nav;
