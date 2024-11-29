import "./ColorBarComponent.css";
import {
	setDisplayTileNames,
	useFetchColorBarsDataQuery,
} from "store";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
function ColorBarComponent({ times }) {
	const panelOpenLeft = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.panelOpen
	);

	const panelTop = useSelector((state) => state.panel.panelTop);

	const { data, error, isFetching } = useFetchColorBarsDataQuery();
	const selectedTiles = useSelector(
		(state) => state.fetcher.fetcherStates.tileArray
	);

	const leftBarRef = useRef(),
		rightBarRef = useRef();

	const [style, setStyle] = useState([]);
	const dispatch = useDispatch();
	const [extractedTile, setExtractedTile] = useState([]);

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
				if (panelOpenLeft) {
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
	}, [panelOpenLeft, panelTop, times]);
	useEffect(() => {
		if (!data) {
			return;
		}
		if (!selectedTiles) return;

		const extractedTile1 =
			selectedTiles &&
			selectedTiles.map((tile, index) => {
				let acc;
				if (tile in data) {
					acc = { key: tile, ...data[tile] };
					return acc;
				}
			});
		setExtractedTile(extractedTile1);
	}, [data, selectedTiles]);

	let colors, labels;
	if (isFetching) {
		return <div></div>;
	} else if (error) {
		return <div></div>;
	} else {
		if (!extractedTile || extractedTile.length === 0) return <div></div>;
		if (selectedTiles.length === 0) return <div></div>;
		if (!data) return <div></div>;

		colors = data[extractedTile[0].key].colors;
		labels = data[extractedTile[0].key].labels;
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
			let colors2 = data[extractedTile[1].key].colors;
			let labels2 = data[extractedTile[1].key].labels;
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
					</div>
				)}
			</div>
		);
	}
}

export default ColorBarComponent;
