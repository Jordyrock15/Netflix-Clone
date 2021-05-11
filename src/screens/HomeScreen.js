import React, { useEffect, useState } from 'react';
// import '../styles/HomeScreen.css';
import '../styles/HomeScreen.scss';
import Banner from '../components/Banner';
import Nav from '../components/Nav';
import requests from '../api/Requests';
import Row from '../components/Row';
import MovieListRow from '../components/MovieListRow';
import { selectCurrentProfile } from '../features/currentProfileSlice';
import { useSelector } from 'react-redux';
import db from '../firebase';
import { selectUser } from '../features/userSlice';

function HomeScreen() {
	return (
		<div className='homeScreen'>
			<Nav />
			<Banner />
			<div className='homeRow'>
				<MovieListRow isLargeRow />
			</div>
			<div className='homeRow'>
				<Row
					title='NETFLIX ORIGINALS'
					fetchUrl={requests.fetchNetflixOriginals}
					// isLargeRow
					key='NetflixOriginals'
					rowType='addicon'
				/>
			</div>
			<div className='homeRow'>
				<Row
					title='Top Rated'
					fetchUrl={requests.fetchTopRated}
					key='TopRated'
					rowType='addicon'
				/>
			</div>
			<div className='homeRow'>
				<Row
					title='Action Movies'
					fetchUrl={requests.fetchActionMovies}
					key='ActionMovies'
					rowType='addicon'
				/>
			</div>
			<div className='homeRow'>
				<Row
					title='Comedy Movies'
					fetchUrl={requests.fetchComedyMovies}
					key='ComedyMovies'
					rowType='addicon'
				/>
			</div>
			<div className='homeRow'>
				<Row
					title='Horror Movies'
					fetchUrl={requests.fetchHorrorMovies}
					key='HorrorMovies'
					rowType='addicon'
				/>
			</div>
			<div className='homeRow'>
				<Row
					title='Romance Movies'
					fetchUrl={requests.fetchRomanceMovies}
					key='RomanceMovies'
					rowType='addicon'
				/>
			</div>
			<div className='homeRow'>
				<Row
					title='Documentaries'
					fetchUrl={requests.fetchDocumentaries}
					key='Documentaries'
					rowType='addicon'
				/>
			</div>
		</div>
	);
}

export default HomeScreen;
