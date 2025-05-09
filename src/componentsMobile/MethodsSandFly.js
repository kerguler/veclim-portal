import FloatPanel from 'components/FloatPanel';
import Footer from 'components/Footer/Footer';
import 'pages/MobileLandingPage/MobileLandingPage.css';
import MethodsPage from 'pages/MethodsPage/MethodsPage';
import MyNavbar from 'components/NavBar/DesktopNav/MyNavbar';
import MobileNav from 'components/NavBar/MobileNav/MobileNav';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPageSelect } from '../store';
function MethodsSandFly() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setPageSelect('papatasi'));
	}, [dispatch]);

	return (
		<>
			<div className='navbar'>
				{' '}
				<MyNavbar />
			</div>
			<div className='navbar mobile'>
				<MobileNav />
			</div>
			<FloatPanel page='methods' />
			<div className='mobile-landing-page'>
				<div className='non-interactive-content-container'>
					<div className='non-interactive-content'>
						<MethodsPage />
					</div>
				</div>
				<div className='footer-container-mobile'>
					<Footer />
				</div>
			</div>
		</>
	);
}

export default MethodsSandFly;
