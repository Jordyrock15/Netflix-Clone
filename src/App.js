import React, { useEffect } from 'react';
// import './App.css';
import './App.scss';
//Components
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
//Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './firebase';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import AccountScreen from './screens/AccountScreen';
import { selectSubscription, subscriptionChecker } from './features/subscriptionSlice';
import ProfileScreen from './screens/ProfileScreen';
import HelpScreen from './screens/HelpScreen';
import { unLoadProfiles } from './features/profileSlice';
import SearchScreen from './screens/SearchScreen';
import { selectCurrentProfile, unLoadCurrentProfile } from './features/currentProfileSlice';

function App() {
	const user = useSelector(selectUser);
	const sub = useSelector(selectSubscription);
	const currentProfile = useSelector(selectCurrentProfile);
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				// Logged in
				dispatch(
					login({
						uid: userAuth.uid,
						email: userAuth.email,
					})
				);
			} else {
				// Logged out
				dispatch(unLoadProfiles());
				dispatch(subscriptionChecker(null));
				dispatch(unLoadCurrentProfile());
				dispatch(logout());
			}
		});

		return unsubscribe;
	}, [dispatch]);

	return (
		<div className='App'>
			<Router>
				{!user ? (
					<LoginScreen />
				) : (
					<>
						<Switch>
							<Route path='/account'>
								<AccountScreen />
							</Route>

							<Route path='/search'>
								{sub != null ? <SearchScreen /> : <AccountScreen />}
							</Route>

							<Route path={`/`} exact>
								{sub != null ? <HomeScreen /> : <AccountScreen />}
							</Route>

							<Route path='/profiles'>
								{sub != null ? <ProfileScreen /> : <AccountScreen />}
							</Route>

							<Route path='/help'>
								{sub != null ? <HelpScreen /> : <AccountScreen />}
							</Route>
						</Switch>
					</>
				)}
			</Router>
		</div>
	);
}

export default App;
