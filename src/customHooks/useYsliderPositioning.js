import { useEffect } from 'react';
function useYsliderPositioning(setTransform) {
	useEffect(() => {
		const handleBrushPosition = () => {
			if (window.innerWidth <= 500) {
				setTransform([0.8 * window.innerWidth, 0]);
			}
			if (window.innerWidth <= 320) {
				setTransform([0.78 * window.innerWidth, 0]);
			}
			if (window.innerWidth <= 315) {
				setTransform([0.76 * window.innerWidth, 10]);
			}
			if (window.innerWidth > 500) {
				setTransform([360, 0]);
			}
		};
		handleBrushPosition();
		window.addEventListener('resize', handleBrushPosition, true);
		return () => {
			window.removeEventListener('resize', handleBrushPosition, true);
		};
	}, []);
}
export default useYsliderPositioning;
