import './Panel.css';
import closeIcon from 'assets/icons/flip2-close-white.jpg';
import classNames from 'classnames';
import useDirectorFun from 'customHooks/useDirectorFun';
import { useDispatch } from 'react-redux';
import { setPanelOpen } from 'store';
function Panel({ onClosed, children, className, direction }) {
	const dispatch = useDispatch();
	const { panelOpen, interferePanelStyleRight: interferePanelStyle } =
		useDirectorFun(direction);
	const handleClick = () => {
		onClosed();
		dispatch(setPanelOpen({ direction, value: !panelOpen }));
	};
	const outerClassNames = classNames('panel-container', className);
	return (
		<div className={outerClassNames} style={interferePanelStyle}>
			<div className='panel-inner-box'>
				<div className='panel-close-button' onClick={handleClick}>
					<img alt='close-button' src={closeIcon} />
				</div>
				{children}
			</div>
		</div>
	);
}

export default Panel;
