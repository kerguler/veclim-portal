import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import rightArrow from "assets/icons/arrow-teal-16px.png";
import useDirectorFun from "customHooks/useDirectorFun";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { lazy, Suspense } from "react";
import { setGraphType } from "store";
const UnifiedRechartPlotter = lazy(() =>
	import("components/charts/Plotter/UnifiedRechartPlotter")
);
const RenderedPanelChart = ({ direction }) => {
	const {
		switcher,
		twinIndex,
		setTwinIndexDir,
		twinArray,
		panelDataDir,
		displayedIcons,
		dataArrivedRight,
		displayedPanelID,
	} = useDirectorFun(direction);
	const dispatch = useDispatch();
	const [showSwitcherArrows, setShowSwitcherArrows] = useState({
		left: false,
		right: false,
	});
	const graphType = useSelector(
		(state) => state.fetcher.fetcherStates.graphType
	);
	const switcherRefLeft = useRef(null);
	const switcherRefRight = useRef(null);
	useEffect(() => {
		if (switcher) {
			if (twinIndex === 0) {
				setShowSwitcherArrows({ left: false, right: true });
			} else if (twinIndex < twinArray - 1) {
				setShowSwitcherArrows({ left: true, right: true });
			} else if (twinIndex === twinArray - 1) {
				setShowSwitcherArrows({ left: true, right: false });
			}
		} else {
			setShowSwitcherArrows({ left: false, right: false });
		}
	}, [switcher, twinIndex]);
	console.log({ twinIndex, dataArrivedRight });

	const handlePrev = (params) => {
		if (twinIndex === 0) {
			return;
		}
		dispatch(setTwinIndexDir(twinIndex - 1));
		dispatch(setPlotReady({direction, value: false}));
	};

	const handleNext = (params) => {
		if (twinIndex === twinArray - 1) {
			return;
		}
		dispatch(setPlotReady({direction, value: false}));

		dispatch(setTwinIndexDir(twinIndex + 1));
	};
	let pointerRight, pointerLeft;

	showSwitcherArrows.left === false
		? (pointerLeft = "default")
		: (pointerLeft = "pointer");
	showSwitcherArrows.right === false
		? (pointerRight = "default")
		: (pointerRight = "pointer");
	return (
		<div className="panel-content chart">
			{" "}
			<div ref={switcherRefLeft} className="switcher-arrows left">
				{showSwitcherArrows.left && (
					<img
						onClick={handlePrev}
						className="switcher-arrow left"
						src={rightArrow}
						alt="left arrow"
						style={{ cursor: `${pointerLeft}` }}
					/>
				)}
			</div>
			<div ref={switcherRefRight} className="switcher-arrows right">
				{showSwitcherArrows.right && (
					<img
						onClick={handleNext}
						className="switcher-arrow right"
						src={rightArrow}
						alt="right arrow"
						style={{ cursor: `${pointerRight}` }}
					/>
				)}
			</div>
			<ErrorBoundary>
				<Suspense fallback={<div>Loading...</div>}>
					<UnifiedRechartPlotter direction={direction} />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};
export default RenderedPanelChart;
