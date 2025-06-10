import FloatPanel from 'components/FloatPanel';
import Footer from 'components/Footer/Footer';
import 'pages/MobileLandingPage/MobileLandingPage.css';
import ProjectPage from 'pages/ProjectPage';
import backgroundPic from 'assets/images/dark_background_overlay_complete.png';
import MyNavbar from 'components/NavBar/DesktopNav/MyNavbar';
import MobileNav from 'components/NavBar/MobileNav/MobileNav';
import NonInteractiveLandingPageContent from 'components/NonInteractiveLandingPageContent';

function MobileLandingPageProject() {
	return (
		<>
			{' '}
			<div className='navbar'>
				{' '}
				<MyNavbar />
			</div>
			<div className='navbar mobile'>
				<MobileNav />
			</div>
			<FloatPanel page='project' />
			<div className='mobile-landing-page'>
				{/* <div className="empty-background-under-header">  </div> */}

				<div className='non-interactive-content-container'>
					<div className='non-interactive-content'>
						<ProjectPage />
					</div>
				</div>

				<div className='footer-container-mobile'>
					<Footer />
				</div>
			</div>
		</>
	);
}

export default MobileLandingPageProject;
