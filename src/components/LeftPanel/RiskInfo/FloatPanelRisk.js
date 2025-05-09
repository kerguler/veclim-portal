import 'components/LeftPanel/MosquitoInfo/FloatPanelMosquitoInfo.css';
import '../Indicators/FloatPanelIndicators.css';
import './RiskIndicator.css';

import closePicB from 'assets/icons/flip2-close.jpg';
import closePicW from 'assets/icons/flip2-close-white.jpg';

import useWindowSize from 'customHooks/useWindowSize';

import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { useSelector } from 'react-redux';
import { useFetchCoordinateDataQuery } from 'store';
import { RiskIndicator, AccuracyIndicator } from './FloatPanelRiskIndicator';

function RiskPanel() {
	const position = useSelector((state) => {
		return state.fetcher.fetcherStates.map.globalPosition;
	});
	const { data, error, isFetching } = useFetchCoordinateDataQuery(
		JSON.stringify(position),
	);

	const { webApp } = useWindowSize();
	const closePic = webApp ? closePicW : closePicB;

	const [isFlipped, setFlip] = useState(false);

	const handleClickHow = (event) => {
		event.stopPropagation();
		setFlip(!isFlipped);
	};

	const handleClickClose = (event) => {
		event.stopPropagation();
		setFlip(false);
	};
	let content;
	if (isFetching) {
		content = <></>;
	} else if (error) {
	} else if (data) {
		content = (
			<>
				<div className='risk-indicator-container-nodata'>
					<p>Ops! We cannot display risk at this location!</p>
				</div>
			</>
		);
		if ('risk-mean' in data && '2010-2019' in data['risk-mean']) {
			let riskL = {
				name: 'Larva',
				value: data['risk-mean']['2010-2019'].larva,
				text: 'Number of larva in breeding sites',
			};
			let riskA = {
				name: 'Biting',
				value: data['risk-mean']['2010-2019'].adult,
				text: 'Mosquito biting activity',
			};
			let riskO = {
				name: 'Outbreak',
				value: data['risk-mean']['2010-2019'].pouts,
				text: 'Outbreak risk',
			};
			let riskI = {
				name: 'Impact',
				value: data['risk-mean']['2010-2019'].iouts,
				text: 'Outbreak impact',
			};
			let acc = {
				name: 'Accuracy',
				value: data['risk-mean']['2010-2019'].accuracy,
				text: 'Prediction accuracy',
			};
			content = (
				<>
					{' '}
					<RiskIndicator props={riskL} />
					<RiskIndicator props={riskA} />
					<RiskIndicator props={riskO} />
					<RiskIndicator props={riskI} />
					<AccuracyIndicator props={acc} />
					<div
						className='risk-indicator-info clickable'
						onClick={handleClickHow}
					></div>
				</>
			);
		}
	}

	return (
		<ReactCardFlip isFlipped={isFlipped} flipDirection='vertical'>
			<div className='risk-indicator-container-wrap'>{content}</div>
			<div className='risk-indicator-container-wrap'>
				{' '}
				<img
					alt='close-button'
					className='flip-close'
					src={closePic}
					onClick={handleClickClose}
				></img>
				<div className='risk-indicator-ipanel'>
					<h1>
						<code>Vector08c</code> and <code>CHIKV</code> model
						predictions
					</h1>
					<p>
						Mosquito activity as{' '}
						<strong>predicted by the model</strong> (assumes tiger
						mosquito presence). These offer a hint on{' '}
						<strong>
							suitability even if the vector is absent
						</strong>
						.
					</p>
					<ul>
						<li>
							<strong>Larva:</strong> Larvae in a typical breeding
							site
						</li>
						<li>
							<strong>Biting:</strong> Mosquito activity (bites on
							people)
						</li>
						<li>
							<strong>Outbreak:</strong> Outbreak risk due to an
							imported case
						</li>
						<li>
							<strong>Impact:</strong> Average impact of an
							imported case
						</li>
					</ul>
					<div className='risk-indicator-mini'>
						<RiskIndicator
							props={{ name: 'Low', value: 0, text: '' }}
						/>
						<RiskIndicator
							props={{ name: 'Medium', value: 1, text: '' }}
						/>
						<RiskIndicator
							props={{ name: 'High', value: 2, text: '' }}
						/>
					</div>
					<p>
						Predictions are normalised against Emilia-Romagna,
						Italy. Roughly,{' '}
						<strong>
							low is off season, medium is start/end, and high is
							peak vector activity
						</strong>
						.
					</p>
					<p>
						We present <strong>10-year averages</strong> (from 2010
						to 2020).
					</p>
					<p>
						<strong>Accuracy</strong>
					</p>
					<div className='risk-indicator-mini'>
						<AccuracyIndicator
							props={{ name: 'Unknown', value: 0, text: '' }}
						/>
						<AccuracyIndicator
							props={{ name: 'Pending', value: 1, text: '' }}
						/>
						<AccuracyIndicator
							props={{ name: 'Valid', value: 2, text: '' }}
						/>
					</div>
					<ul>
						<li>
							<strong>Unknown:</strong> Not tested with any
							observations from this region
						</li>
						<li>
							<strong>Pending:</strong> Pending validation with
							recent observations
						</li>
						<li>
							<strong>Valid:</strong> Validated with past and
							present data from this region
						</li>
					</ul>

					<p>
						Please refer to our methods section for more
						information.
					</p>
				</div>
			</div>
		</ReactCardFlip>
	);
}

export default RiskPanel;
