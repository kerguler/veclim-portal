import "./TileSelector.css";
import { useContext, useEffect, useState } from "react";
import { setDisplayTileNames, setSuperUser, setTileArray } from "store";
import { useDispatch, useSelector } from "react-redux";
import { useFetchColorBarsDataQuery } from "store";
import { iconClasses } from "@mui/material";
import Panel from "components/panel/Panel";
import PanelContext from "context/panelsIcons";
function TileSelector({ tileIcons }) {
	const selectedTiles = useSelector(
		(state) => state.fetcher.fetcherStates.tileArray
	);
	const { data, error, isFetching } = useFetchColorBarsDataQuery();

	const [displayWarning, setDisplayWarning] = useState(false);
	const [displayNoTileWarning, setDisplayNoTileWarning] = useState(false);
	const dispatch = useDispatch();
	const handleContextMenu = (e, key) => {
		e.preventDefault();
	};

	const handleIconClick = (item) => {
		let temp;
		// item is the icon that was clicked
		const filteredArray = selectedTiles.filter((element) => element === item);
		// if the icon is already selected it will be in the array
		const exists = filteredArray.length > 0;
		// if the icon is already selected and there is more than one icon selected
		if (exists && selectedTiles.length !== 1) {
			temp = selectedTiles.filter((element) => {
				return element !== item;
			});
			// we remove it from the array of selected icons
			setDisplayWarning(false);
		} else if (exists && selectedTiles.length === 1) {
			//this means there was only one icon selected and it was the one that was clicked
			// we will remove it and show only the base layer
			/*
			 setDisplayNoTileWarning(true);
			 setDisplayWarning(false);
			 temp = [...selectedTiles];
			 */
			setDisplayNoTileWarning(false);
			setDisplayWarning(false);
			temp = [];
		} else {
			// if the icon is not in the array
			setDisplayNoTileWarning(false);
			if (selectedTiles.length === 2) {
				dispatch(setSuperUser(true));
				temp = [...selectedTiles];
				setDisplayWarning(true);
			} else {
				dispatch(setSuperUser(false));
				let existingTileDisplayIndex = selectedTiles.map((tileName) => {
					return tileIcons.filter((tileIcon, index) => {
						return tileIcon.key === tileName;
					})[0].tileLayer.displayIndex;
				});
				let newTileDisplayIndex = selectedTiles.map((tileName) => {
					return tileIcons.filter((tileIcon, index) => {
						return tileIcon.key === item;
					})[0].tileLayer.displayIndex;
				});

				if (newTileDisplayIndex % 10 > existingTileDisplayIndex % 10) {
					temp = [...selectedTiles, item];
				} else {
					temp = [item, ...selectedTiles];
				}
			}
		}
		dispatch(setSuperUser(temp.length === 2 ? true : false));
		setTimeout(() => {
			dispatch(setTileArray(temp));
		}, 100);
		dispatch(
			setDisplayTileNames({
				center: temp.length === 1,
				left: temp.length === 2,
				right: temp.length === 2,
			})
		);
	};

	const handleIconSwitch = (item) => {
		let temp = [item];
		setDisplayWarning(false);
		dispatch(setSuperUser(false));
		setTimeout(() => {
			dispatch(setTileArray(temp));
		}, 100);
	};

	const RenderedContent = () => {
		let description = <p>No tiles selected. Base map is on display.</p>;
		let displayedIcons = tileIcons.map((item, index) => {
			let internalClassName;
			const filteredArray = selectedTiles.filter(
				(element) => element === item.key
			);
			const exists = filteredArray.length > 0;
			if (exists) {
				internalClassName = "panel-content icons-area  active";
				description = item.description;
			} else {
				internalClassName = "panel-content icons-area inactive";
			}
			return (
				<div
					id={item.tileLayer.displayIndex}
					key={item.key}
					className={internalClassName}
					onClick={() => {
						handleIconClick(item.key);
					}}
					onContextMenu={(e) => {
						handleContextMenu(e, item.key);
					}}
				>
					<img key={item.key} alt="mapped-tile-icon" src={item.icon}></img>
				</div>
			);
		});
		let tempRow = 0;
		let tempCol = 0;

		return (
			<>
				<IconGrid icons={displayedIcons} />
				<div className="tile-select-description">{description}</div>
			</>
		);
	};

	useEffect(() => {
		setTimeout(() => {
			setDisplayNoTileWarning(false);
			setDisplayWarning(false);
		}, 1000);
	}, [displayNoTileWarning, displayWarning]);
	return (
		<div className="icons-area">
			<h1>Map Tiles</h1>
			<RenderedContent />
			{displayWarning && (
				<div className="icons-area warning">
					{" "}
					you can select a maximum of 2 tiles{" "}
				</div>
			)}
			{displayNoTileWarning && (
				<div className="icons-area warning"> you have to have 1 tile </div>
			)}
			{/* <div className="tile-select-button"> <p>Submit</p></div> */}
		</div>
	);
}

export default TileSelector;

const IconGrid = ({ icons }) => {
	const { tileIconsRowHeadings } = useContext(PanelContext);
	let tempRow = 0;
	let tempCol = 0;
	icons.forEach((icon, index) => {
		if (icon.props.id > tempRow) {
			tempRow = icon.props.id;
		}
		if (icon.props.id % 10 > tempCol) {
			tempCol = icon.props.id % 10;
		}
	});

	let columnsPerRow = tempCol;

	const groupedIcons = icons.reduce((acc, icon) => {
		const row = Math.floor(icon.props.id / 10);
		if (!acc[row]) {
			acc[row] = [];
		}
		acc[row].push(icon);
		return acc;
	}, {});
	return (
		<div className="icon-grid">
			{Object.keys(groupedIcons).map((row) => {
				const rowIcons = groupedIcons[row];
				const emptySlots = columnsPerRow - rowIcons.length;
				return (
					<div className="icon-row-container" key={`id-icon-row-container-${row}`}>
						<div className="icon-row-label" key={`id-icon-row-label-${row}`}>
							{
								tileIconsRowHeadings.filter(
									(heading) => heading.row === parseInt(row)
								)[0].label
							}
						</div>
						<div
							key={`id-icon-row-${row}`}
							className="icon-row"
							style={{
								gridTemplateColumns:
									"repeat(" + rowIcons.length + ", minmax(50px, 1fr))",
							}}
						>
							{rowIcons
								.sort((a, b) => (a.id % 10) - (b.id % 10))
								.map((icon) => {
									return (
										<div key={`id-icon-row-${row}-${icon.key}`} className="icon-item">
											{icon}
										</div>
									);
								})}
							{Array.from({ length: emptySlots }).map((_, idx) => (
								<div
									key={`empty-${row}-${idx}`}
									className="icon-item empty"
								></div>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
};

function IconRowLabels({ row }) {
	return (
		<div key={`label-${row}`} className="icon-row-label">
			2010-2020
		</div>
	);
}
