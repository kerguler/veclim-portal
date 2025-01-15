import { useEffect } from "react";
import "./TileNameDisplay.css";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import PanelContext from "../../../context/panelsIcons";
import { useRef } from "react";
import { setDisplayTileNames } from "../../../store";
import { useState } from "react";
import { setDividerPosition } from "../../../store";
import PanelContextV2 from "context/panelsIconsV2";
import useDirectorFun from "customHooks/useDirectorFun";
function TileNameDisplay() {
	const tileArray = useSelector(
		(state) => state.fetcher.fetcherStates.tileArray
	);
	const { tileIconsDir:tileIcons } = useDirectorFun("left");
	const displayTileNames = useSelector((state) => state.panel.displayTileNames);
	const dividerPos = useSelector((state) => state.location.dividerPosition);
	const [positions, setPositions] = useState({ left: 0, right: 0 });
	const dividerRef = useRef({
		left: (dividerPos / 2 / window.innerWidth) * 100,
		right: ((window.innerWidth - dividerPos) / (2 * window.innerWidth)) * 100,
	});
	const leftRef = useRef(null);
	const rightRef = useRef(null);

	let divider = dividerRef.current;

	let lft = leftRef.current ? leftRef.current.getBoundingClientRect().width : 0;
	let rght = rightRef.current
		? rightRef.current.getBoundingClientRect().width
		: 0;

	divider.left = ((dividerPos - lft / 2) / (2 * window.innerWidth)) * 100;

	divider.right =
		((window.innerWidth - dividerPos - rght) / (2 * window.innerWidth)) * 100;
	const tileLabels = displayTileNames
		? tileArray.map((tile, index) => {
				let selectedTile = tileIcons.find((tileIcon) => tileIcon.key === tile);
				return selectedTile ? selectedTile.label : null;
		  })
		: [];

	useEffect(() => {
		setPositions(divider);
	}, [dividerPos, divider]);

	const display = useRef({ left: null, right: null, single: null });
	const dispatch = useDispatch();

	useEffect(() => {
		if (displayTileNames) {
			display.current = {
				left: displayTileNames.left && tileLabels.length === 2 ? true : false,
				right: displayTileNames.right && tileLabels.length === 2 ? true : false,
				single:
					displayTileNames.center && tileLabels.length === 1 ? true : false,
			};
		} else {
			display.current = {
				left: tileLabels.length === 2 ? true : false,
				right: tileLabels.length === 2 ? true : false,
				single: tileLabels.length === 1 ? true : false,
			};
			dispatch(setDisplayTileNames(display.current));
		}
		let timeoutId = setTimeout(() => {
			dispatch(
				setDisplayTileNames({ center: false, left: false, right: false })
			);
		}, 3000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [tileLabels.length, dispatch, displayTileNames, positions]);
	const leftTitle = (
		<div ref={leftRef} className="left" style={{ left: `${positions.left}%` }}>
			{" "}
			<p>{tileLabels[0]}</p>
		</div>
	);
	const rightTitle = (
		<div
			ref={rightRef}
			className="right"
			style={{ left: "unset", right: `${positions.right}%` }}
		>
			<p>{tileLabels[1]}</p>
		</div>
	);
	const centerTitle = (
		<div className="center">
			<p>{tileLabels[0]}</p>
		</div>
	);

	let d = display.current;
	return (
		<div className="tile-name-wrapper">
			<div style={{ position: "relative" }}>
				{displayTileNames.left && d.left && leftTitle}
				{displayTileNames.right && d.right && rightTitle}
				{displayTileNames.center && d.single && centerTitle}
			</div>
		</div>
	);
}

export default TileNameDisplay;
