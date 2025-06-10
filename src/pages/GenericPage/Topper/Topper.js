import './topper.css';
import backgroundPic from 'assets/images/dark_background_overlay_complete.webp';

function Topper({ writerLink, title, content, writer, reference }) {
	const webApp = window.innerWidth < 500;
	return (
		<div className='topper'>
			<div className='topper-title'>{title}</div>
			<div className='topper-content'>{content}</div>

			<div className={writerLink ? 'owner-link' : 'owner'}>{writer}</div>

			<div className='reference'>{reference}</div>
			{!webApp && (
				<div className=' non-interactive-content overlay'>
					<img alt='overlay' src={backgroundPic} />
				</div>
			)}
		</div>
	);
}

export default Topper;
