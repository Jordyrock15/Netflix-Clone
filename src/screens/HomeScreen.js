import React from 'react';
import '../styles/HomeScreen.css';
import Banner from '../components/Banner';
import Nav from '../components/Nav';
import requests from '../api/Requests';
import Row from '../components/Row';

function HomeScreen() {
	return (
		<div className='homeScreen'>
			<Nav />
			<Banner />
			<div className='homeRow'>
				<Row
					title='NETFLIX ORIGINALS'
					fetchUrl={requests.fetchNetflixOriginals}
					isLargeRow
					key='NetflixOriginals'
				/>
			</div>
			<div className='homeRow'>
				<Row title='Top Rated' fetchUrl={requests.fetchTopRated} key='TopRated' />
			</div>
			<div className='homeRow'>
				<Row
					title='Action Movies'
					fetchUrl={requests.fetchActionMovies}
					key='ActionMovies'
				/>
			</div>
			<div className='homeRow'>
				<Row
					title='Comedy Movies'
					fetchUrl={requests.fetchComedyMovies}
					key='ComedyMovies'
				/>
			</div>
			<div className='homeRow'>
				<Row
					title='Horror Movies'
					fetchUrl={requests.fetchHorrorMovies}
					key='HorrorMovies'
				/>
			</div>
			<div className='homeRow'>
				<Row
					title='Romance Movies'
					fetchUrl={requests.fetchRomanceMovies}
					key='RomanceMovies'
				/>
			</div>
			<div className='homeRow'>
				<Row
					title='Documentaries'
					fetchUrl={requests.fetchDocumentaries}
					key='Documentaries'
				/>
			</div>
		</div>
	);
}

export default HomeScreen;
