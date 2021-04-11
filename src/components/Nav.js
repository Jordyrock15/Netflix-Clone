import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { selectSubscription } from '../features/subscriptionSlice';
import { auth } from '../firebase';
//Icons
import notificationIcon from '../styles/icons/notification.svg';
import netflixLogo from '../styles/icons/netflix-logo.png';
import searchIcon from '../styles/icons/search.svg';
import axios from '../api/axios';

import '../styles/Nav.css';
import { searchMoviesChecker } from '../features/searchMoviesSlice';

function Nav() {
	const [show, handleShow] = useState(false);
	const history = useHistory();
	const subscription = useSelector(selectSubscription);
	const dispatch = useDispatch();
	const location = useLocation();
	const searchInput = useRef(null);

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

	const logout = () => {
		history.push('/');
		auth.signOut();
	};

	async function fetchData(input) {
		const request = await axios.get(
			`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${input}&page=1&include_adult=false`
		);
		dispatch(searchMoviesChecker(request.data.results));

		console.log(request.data.results);
		return request;
	}

	const movieSearch = (e) => {
		e.preventDefault();
		fetchData(searchInput.current.value);
		searchInput.current.value = '';
		history.push('/search');
	};

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
						<h4 className='nav-light-link' onClick={() => logout()}>
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
				<div className='search_container'>
					<form className='search_form' onSubmit={(e) => movieSearch(e)}>
						<img
							className='search_icon'
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
						<input
							ref={searchInput}
							type='text'
							className='search_input'
							placeholder='Search...'
						/>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Nav;
