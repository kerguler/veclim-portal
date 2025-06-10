import './modal.css';

import dataPolicy from 'assets/documents/VEClim_Data Management Plan_20230905.pdf';
import { useCookies } from 'react-cookie';
import GenericModal from '../../GenericModal/GenericModal';
import { useState } from 'react';
// import Iubenda from "react-iubenda-policy";
import IuBendaScripts from '../IubendaScripts/IuBendaScripts';
import DataPolicy from '../DataPolicy/DataPolicy';
function Modal() {
	const manualDataPolicy = {
		title: (
			<div className='regular-row content'>
				<h4>Data Policy of VEClim</h4>
			</div>
		),
		content: (
			<div className='regular-row'>
				<div className='regular-row content'>
					<p>
						VEClim adheres to the principles of free and open
						exchange of data, knowledge, and open-access publishing.
						Intellectual property generated shall be the property of
						The Cyprus Institute and shared with the community
						following internal review.
					</p>
					<p className='single-line'>
						<strong>
							We generate and freely provide the following data:
						</strong>
					</p>
					<ul>
						<li>
							Mathematical models of vectors and vector-borne
							diseases
						</li>
						<li>
							Predictions of vector activity and associated
							disease risk
						</li>
						<li>Tools and methods of anlaysis</li>
					</ul>
					<p className='single-line'>
						<strong>
							We host a subset of the following publicly available
							data:
						</strong>
					</p>
					<ul>
						<li>
							Meteorological variables, climate projections, and
							environmental covariates
						</li>
						<li>Anonymised vector and disease surveillance data</li>
					</ul>
					<p className='single-line'>
						<strong>
							We share all strictly according to the permissions
							granted by the licenses of the original data
							sources.
						</strong>
					</p>
					<p className='single-line'>Last update: 5 September 2023</p>
					<p className='single-line'>
						Click for our complete
						<a
							onClick={(e) => {}}
							href={dataPolicy}
							className='iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe internal'
							target='_blank'
							rel='noreferrer'
						>
							Data Management Plan
						</a>
					</p>
				</div>
			</div>
		),
		accept: false,
		decline: false,
	};
	const [cookies, setCookie] = useCookies(['cookieConsent']);
	const handleDismiss = () => {
		giveCookieConsent();
	};
	const giveCookieConsent = () => {
		setCookie('cookieConsent', true, { path: '/' });
	};
	const [genericModalVisibility, setGenericModalVisibility] = useState(false);
	const handleGenericModalVisibility = (visibility) => {
		setGenericModalVisibility(false);
	};

	return (
		<div>
			{/* <div className="modal-background"></div> */}
			<div className='modal-content'>
				{' '}
				<div>
					<h1>We use cookies!</h1>
					<p>
						We value your privacy and we only collect the minimum
						necessary information to provide you with a useful
						service. Please contact us if you wish to know more, and
						if you have any feedback on our data policies:{' '}
						<IuBendaScripts id='10679144' type='privacy'>
							privacy policy
						</IuBendaScripts>
						<IuBendaScripts id='10679144' type='cookie'>
							cookie policy
						</IuBendaScripts>
						{/* <a
							href="https://www.iubenda.com/privacy-policy/10679144/cookie-policy"
							className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe internal"
							title="Cookie Policy ">
							cookie policy
						</a>{" "} */}
						<span
							onClick={(e) => {
								e.preventDefault();
								setGenericModalVisibility(true);
							}}
						>
							{' '}
							<DataPolicy></DataPolicy>{' '}
						</span>
					</p>
				</div>
				{/* <div className="modal-button" onClick={handleDismiss}>
					{" "}
					<p>Consent</p>
				</div> */}
			</div>
			{genericModalVisibility && (
				<GenericModal
					title={manualDataPolicy.title}
					content={manualDataPolicy.content}
					accept={manualDataPolicy.accept}
					decline={manualDataPolicy.decline}
					onClose={handleGenericModalVisibility}
				></GenericModal>
			)}
		</div>
	);
}

export default Modal;
