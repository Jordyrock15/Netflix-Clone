import React, { useEffect, useState } from 'react';
// import '../styles/Banner.css';
import '../styles/Banner.scss';
import axios from '../api/axios';
import requests from '../api/Requests';
import playIcon from '../styles/icons/Play.png';
import infoIcon from '../styles/icons/info.png';

function Banner() {
	const [movie, setMovie] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(requests.fetchNetflixOriginals);
			setMovie(
				request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
			);
			return request;
		}

		fetchData();
	}, []);

	const truncate = (string, n) => {
		return string?.length > n ? string.substr(0, n - 1) + ' ...' : string;
	};

	return (
		<header
			className='banner'
			style={{
				backgroundSize: 'cover',
				backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
				backgroundPosition: 'center center',
			}}
		>
			<div className='banner_contents'>
				<h1 className='banner_title'>
					{movie?.title || movie?.name || movie?.original_name}
				</h1>
				<h1 className='banner_description'>{truncate(movie?.overview, 150)}</h1>
				<div className='banner_buttons'>
					<button className='banner_button banner_button_color'>
						<img src={`${playIcon}`} alt='playIcon' /> Play
					</button>
					<button className='banner_button'>
						<img src={`${infoIcon}`} alt='infoIcon' />
						More Info
					</button>
				</div>
			</div>

			<div className='banner--fadeBottom' />
		</header>
	);
}

export default Banner;
