import React, { useEffect } from 'react';
import '../styles/HomeScreen.css';
import Banner from '../components/Banner';
import Nav from '../components/Nav';
import requests from '../api/Requests';
import Row from '../components/Row';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { selectProfile } from '../features/profileSlice';
import db from '../firebase';

function HomeScreen() {
	const user = useSelector(selectUser);
	const profiles = useSelector(selectProfile);

	const addDefaultProfile = () => {
		db.collection('customers')
			.doc(user.uid)
			.collection('profiles')
			.doc(`Default`)
			.set({
				name: 'Default',
				movieList: '',
			})
			.then(() => {
				console.log('Document Written');
			})
			.catch((error) => {
				console.error('Error writing document: ', error);
			});
	};

	useEffect(() => {
		if (profiles.length === 0) {
			addDefaultProfile();
		}
	}, []);
	return (
		<div className='homeScreen'>
			<Nav />

			<Banner />

			<Row title='NETFLIX ORIGINALS' fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
			<Row title='Top Rated' fetchUrl={requests.fetchTopRated} />
			<Row title='Action Movies' fetchUrl={requests.fetchActionMovies} />
			<Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
			<Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
			<Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
			<Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} />
		</div>
	);
}

export default HomeScreen;
