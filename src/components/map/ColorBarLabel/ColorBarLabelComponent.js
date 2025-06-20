import "./ColorBarLabelComponent.css";
import {
	setDisplayTileNames,
	useFetchColorBarsDataQuery,
} from "store";

import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

import PanelContext from "context/panelsIcons";

function TileNameDisplay({ side, tiles }) {
	const { tileIcons } = useContext(PanelContext);

	const [faded, setFaded] = useState(false);

	useEffect(() => {
		setFaded(false);
		const timer = setTimeout(() => {
			setFaded(true);
		}, 3000); // fade after 3 seconds
		return () => clearTimeout(timer);
	}, [side, tiles]);

	const tileLabels = tiles.map((tile, index) => {
		let selectedTile = tileIcons.find((tileIcon) => tileIcon.key === tile);
		return selectedTile ? selectedTile.label : null;
	});

	return (
		<div className={`tile-name-wrapper ${faded ? 'faded' : 'visible'}`}>
			<div className={side}>
				{" "}
				<p>{tileLabels[side=='left'? 0 : 1]}</p>
			</div>
		</div>
	);
}

function ColorBarLabelComponent({ times }) {
	const colorBarRef = useRef();
	const panelOpen = useSelector(
		(state) => state.fetcher.fetcherStates.map.leftMenu.panelOpen
	);
	const displayedPanelID = useSelector(
		(state) => state.fetcher.fetcherStates.map.leftMenu.displayedPanelID
	);
	const panelTop = useSelector((state) => state.panel.panelTop);

	const { colorKeys } = useContext(PanelContext);

	const { data, error, isFetching } = useFetchColorBarsDataQuery();
	const selectedTiles = useSelector(
		(state) => state.fetcher.fetcherStates.tileArray
	);

	const leftBarRef = useRef(),
		rightBarRef = useRef();

	const [style, setStyle] = useState([]);
	const [webApp, setWebApp] = useState(null);
	const dispatch = useDispatch();

	const handleDisplayTiles = (e, direction) => {
		if (direction === "left") {
			dispatch(
				setDisplayTileNames({ center: false, left: true, right: false })
			);
		} else if (direction === "right") {
			dispatch(
				setDisplayTileNames({ center: false, left: false, right: true })
			);
		} else {
			dispatch(
				setDisplayTileNames({ center: true, left: false, right: false })
			);
		}
	};
	useEffect(() => {
		const handleResize = () => {
			let leftHeight, rightHeight;
			if (leftBarRef.current) {
				const { height } = leftBarRef.current.getBoundingClientRect();
				leftHeight = height;
			}

			if (rightBarRef.current) {
				const { height } = rightBarRef.current.getBoundingClientRect();
				rightHeight = height;
			}

			if (window.innerWidth <= 499) {
				if (panelOpen) {
					setStyle([
						{ top: `${panelTop - leftHeight - 20}px`, bottom: "unset" },
						{ top: `${panelTop - rightHeight - 20}px`, bottom: "unset" },
					]);
				} else {
					setStyle([
						{ bottom: "5%", top: "unset" },
						{ bottom: "5%", top: "unset" },
					]);
				}
			} else {
				setStyle([
					{ bottom: "1%", top: "unset" },
					{ bottom: "1%", top: "unset" },
				]);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [panelOpen, panelTop, times]);

	let colors, labels;
	if (isFetching) {
		return <div></div>;
	} else if (error) {
		return <div></div>;
	} else {
		const extractedTile = selectedTiles.map((tile, index) => {
			let acc;
			if (tile in colorKeys && colorKeys[tile] in data) {
				// acc = { key: tile, ...data[tile] };
				acc = { key: tile, ...data[colorKeys[tile]] };
				return acc;
			}
		});
		if (extractedTile.length === 0) return <div></div>;
		colors = data[colorKeys[extractedTile[0].key]].colors;
		labels = data[colorKeys[extractedTile[0].key]].labels;
		let renderedDivs2, renderedLabels2;
		let transColor = "#00000000";

		const renderedDivs = colors.map((color, index) => {
			return (
				<div
					key={index}
					className="color-bar-rect"
					style={{
						backgroundColor: `${
							colors[colors.length - index - 1] === transColor
								? "#FFFFFF"
								: colors[colors.length - index - 1]
						}`,
						backgroundColor: `${
							colors[colors.length - index - 1] === transColor
								? "#FFFFFF"
								: colors[colors.length - index - 1]
						}`,
					}}
				></div>
			);
		});
		const renderedLabels = labels.map((label, index) => {
			return (
				<div key={index} className="color-bar-p">
					<p>{labels[labels.length - index - 1]}</p>
				</div>
			);
		});
		if (extractedTile.length === 2) {
			let colors2 = data[colorKeys[extractedTile[1].key]].colors;
			let labels2 = data[colorKeys[extractedTile[1].key]].labels;
			if (colors2.length !== 0) {
				renderedDivs2 = colors2.map((color, index) => {
					return (
						<div
							key={index}
							className="color-bar-rect"
							style={{
								backgroundColor: `${
									colors2[colors2.length - index - 1] === transColor
										? "#FFFFFF"
										: colors2[colors2.length - index - 1]
								}`,
							}}
						></div>
					);
				});

				renderedLabels2 = labels2.map((label, index) => {
					return (
						<div key={index} className="color-bar-p">
							<p>{labels2[labels2.length - index - 1]}</p>
						</div>
					);
				});
			} else {
				// renderedLabels2 = renderedLabels;
				// renderedDivs2 = renderedDivs;
			}
		}

		return (
			<div>
				<div
					onMouseOver={(e) =>
						handleDisplayTiles(
							e,
							selectedTiles.length === 2 ? "left" : "center"
						)
					}
					ref={leftBarRef}
					className="color-bar left"
					style={style[0]}
				>
					<div className="color-bar-wrapper">
						<div className="color-bar-colors">{renderedDivs}</div>
						<div className="color-bar-texts">{renderedLabels}</div>
					</div>
					<TileNameDisplay side="left" tiles={selectedTiles} />
				</div>
				{times === 2 && (
					<div
						onMouseOver={(e) => handleDisplayTiles(e, "right")}
						ref={rightBarRef}
						className="color-bar right"
						style={style[1]}
					>
						<div className="color-bar-wrapper">
							<div className="color-bar-texts">{renderedLabels2}</div>
							<div className="color-bar-colors">{renderedDivs2}</div>
						</div>
						<TileNameDisplay side="right" tiles={selectedTiles} />
					</div>
				)}
			</div>
		);
	}
}

export default ColorBarLabelComponent;
