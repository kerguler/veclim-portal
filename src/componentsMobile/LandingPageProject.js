import FloatPanel from "../components/FloatPanel";
import Footer from "../components/Footer/Footer";
import "../styles/MobileLandingPage.css";

import NonInteractiveLandingPageContent from "../components/NonInteractiveLandingPageContent";

function LandingPageProject() {
	return (
		<>
			<FloatPanel page="project" />
			<div className="mobile-landing-page">
				{/* <div className="empty-background-under-header">  </div> */}

				<div className="non-interactive-content-container">
					<NonInteractiveLandingPageContent page="project" />
				</div>

				<div className="footer-container-mobile">
					<Footer />
				</div>
			</div>
		</>
	);
}

export default LandingPageProject;
