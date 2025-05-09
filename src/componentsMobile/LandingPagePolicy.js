import FloatPanel from '../components/FloatPanel';
import Footer from '../components/Footer/Footer';
import '../styles/MobileLandingPage.css';

import NonInteractiveLandingPageContent from '../components/NonInteractiveLandingPageContent';

function LandingPagePolicy() {
	return (
		<>
			<FloatPanel page='policy' />
			<div className='mobile-landing-page'>
				{/* <div className="empty-background-under-header">  </div> */}

				<div className='non-interactive-content-container'>
					<NonInteractiveLandingPageContent page='policy' />
				</div>

				<div className='footer-container-mobile'>
					<Footer />
				</div>
			</div>
		</>
	);
}

export default LandingPagePolicy;
