import Panel from "./Panel";
import { useSelector, useDispatch } from "react-redux";
import { setPanelOpen } from "store";
import { useEffect } from "react";
import { useRef } from "react";
import { setPanelTop } from "store";
import UnifiedRechartPlotter from "components/charts/Plotter/UnifiedRechartPlotter";
import { useState } from "react";
import rightArrow from "assets/icons/arrow-teal-16px.png";
import { setTwinIndex } from "store";
import "./Switcher/Switcher.css";

const RenderedPanel = ({ panel, panelChart, panelClassName }) => {
	const dispatch = useDispatch();
	const panelOpen = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.panelOpen
	);
	// console.log("pan)
	const panelRef = useRef(null);
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 499 && panelRef.current) {
				dispatch(setPanelTop(panelRef.current.getBoundingClientRect().top));
			} else {
				panelRef.current &&
					dispatch(setPanelTop(panelRef.current.getBoundingClientRect().top));
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [panelOpen, dispatch]);

	useEffect(() => {
		if (panelRef.current) {
			dispatch(setPanelTop(panelRef.current.getBoundingClientRect().top));
		}
	});
	const handlePanelClosed = (value) => {
		dispatch(setPanelOpen(false));
	};
	return (
		<span className="panel-restrictive-wrapper">
			{panelOpen && (
				<div ref={panelRef}>
					<Panel
						className={panelClassName}
						onClosed={() => handlePanelClosed(true)}
					>
						<div className="panel-content" style={{ userSelect: "none" }}>
							{panel}
							{panelChart && <RenderedPanelChart />}
						</div>{" "}
					</Panel>
				</div>
			)}
		</span>
	);
};

export default RenderedPanel;
const RenderedPanelChart = () => {
	const dispatch = useDispatch();
	const [showSwitcherArrows, setShowSwitcherArrows] = useState({
		left: false,
		right: false,
	});
	const switcherRefLeft = useRef();
	const switcherRefRight = useRef();
	const switcher = useSelector((state) => state.graphSwitch.left.switcher);
	const twinIndex = useSelector((state) => state.graphSwitch.left.twinIndex);
	const twinArray = useSelector((state) => state.graphSwitch.left.twinArray);
	useEffect(() => {
		if (switcher) {
			if (twinIndex === 0) {
				setShowSwitcherArrows({ left: false, right: true });
			} else {
				setShowSwitcherArrows({ left: true, right: false });
			}
		} else {
			setShowSwitcherArrows({ left: false, right: false });
		}
	}, [switcher, twinIndex]);

	const handlePrev = (params) => {
		if (twinIndex === 0) {
			return;
		}
		dispatch(setTwinIndex({direction:"left",value:twinIndex - 1}));
	};
	const handleNext = (params) => {
		if (twinIndex === twinArray - 1) {
			return;
		}

		dispatch(setTwinIndex({direction:"left",value:twinIndex + 1}));
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
			{<UnifiedRechartPlotter />}
		</div>
	);
};
