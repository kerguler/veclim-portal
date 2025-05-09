import closePic from 'assets/icons/flip-close-white.jpg';

import './ChangesComponent.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactCardFlip from 'react-card-flip';

function ChangesComponent({ props }) {
	const [isFlipped, setFlip] = useState(false);

	const handleClickOpen = (event) => {
		event.stopPropagation();
		setFlip(!isFlipped);
	};

	const handleClickClose = (event) => {
		event.stopPropagation();
		setFlip(false);
	};

	let rowglow = '';
	let today = new Date();
	if (today < Date.parse('2023-11-25')) {
		rowglow = (
			<>
				<ReactCardFlip isFlipped={isFlipped} flipDirection='vertical'>
					<div className='glow clickable' onClick={handleClickOpen}>
						<h5>What has changed?</h5>
					</div>

					<div className='glow'>
						<img
							alt='close-button'
							className='flip-close'
							src={closePic}
							onClick={handleClickClose}
						></img>
						<p>
							We updated the site on{' '}
							<strong>23 November 2023</strong> and made some
							changes.
						</p>
						<ul>
							<li>
								We revised the risk indicators for vector
								activity. They should now better represent day
								to day changes.
							</li>
							<li>
								We added two more indicators for disease
								transmission. Have a look at the{' '}
								<Link to='/LandingPageMethods'>Methods</Link> to
								find out.
							</li>
							<li>
								We performed near future predictions of outbreak
								risk and impact, and displayed these in separate
								tile layers on{' '}
								<Link to='/MapPage'>The Map</Link>.
							</li>
						</ul>
					</div>
				</ReactCardFlip>
			</>
		);
	}

	return rowglow;
}

export default ChangesComponent;

//export { ChangesComponent };
