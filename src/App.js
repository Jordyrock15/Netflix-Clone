import React, { useEffect } from 'react';
import './App.css';
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

function App() {
	const user = useSelector(selectUser);
	const sub = useSelector(selectSubscription);
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
				dispatch(subscriptionChecker(null));
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
					<Switch>
						<Route path='/account'>
							<AccountScreen />
						</Route>

						<Route path={`/`} exact>
							{sub != null ? <HomeScreen /> : <AccountScreen />}
						</Route>

						<Route path='/help'>
							<HelpScreen />
						</Route>

						<Route path='/profiles'>
							<ProfileScreen />
						</Route>
					</Switch>
				)}
			</Router>
		</div>
	);
}

export default App;
