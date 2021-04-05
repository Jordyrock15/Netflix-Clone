import React from 'react';
import AccordianItem from '../components/AccordianItem';
import Nav from '../components/Nav';
import '../styles/HelpScreen.css';
import search_gray from '../styles/icons//search_gray.svg';

function HelpScreen() {
	return (
		<div className='helpScreen_container'>
			<Nav />
			<div className='help_banner'>
				<div className='help_banner_container'>
					<h1>Help Center</h1>
					<div className='input_banner_container'>
						<img src={`${search_gray}`} alt='search_gray' />
						<input type='text' placeholder='What do you need help with?' />
					</div>
				</div>
			</div>

			<h2 className='questions_title'>Most Common Questions</h2>
			<div className='accordian_container'>
				<AccordianItem
					title='How much are plans?'
					answer='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita vitae
						maiores provident voluptate ducimus rem.'
				/>
				<AccordianItem
					title='How to stop someone from using your account?'
					answer='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita vitae
						maiores provident voluptate ducimus rem.'
				/>
				<AccordianItem
					title='How to update Netflix account information?'
					answer='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita vitae
						maiores provident voluptate ducimus rem.'
				/>
				<AccordianItem
					title='How to change your current plan?'
					answer='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita vitae
						maiores provident voluptate ducimus rem.'
				/>
			</div>
			<div className='contact_container'>
				<h3>Want to contact us?</h3>

				<div className='contact_buttons'>
					<button>CALL US</button>
					<button>START LIVE CHAT</button>
				</div>
			</div>

			<footer>
				<nav className='navbar'>
					<ul className='navbar_list'>
						<li className='navbar_list_item'>Terms of Use</li>
						<li className='navbar_list_item'>Privacy</li>
						<li className='navbar_list_item'>Cookie Prefernces</li>
						<li className='navbar_list_item'>Corporate Information</li>
					</ul>
				</nav>
			</footer>
		</div>
	);
}

export default HelpScreen;
