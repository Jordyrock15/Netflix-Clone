import React, { useState } from 'react';
import '../styles/HelpScreen.css';

function AccordianItem({ title, answer }) {
	const [isActive, setIsActive] = useState('');

	const toggleAccordianHandler = () => {
		setIsActive(isActive === '' ? 'active' : '');
	};
	return (
		<div>
			<div className='accordian_item' onClick={toggleAccordianHandler}>
				<div className='accordian_item_title'>{title}</div>
				<div
					className={
						isActive === '' ? `accordian_item_answer` : `accordian_answer_active`
					}
				>
					{answer}
				</div>
			</div>
		</div>
	);
}

export default AccordianItem;
