import useDirectorFun from "customHooks/useDirectorFun";
import RenderedPanelV2 from "components/panel/SwitcherV2/RenderedPanelV2";
import MapMenuV2 from "./MapMenuV2";
import MenuList from "./MenuList";
import { setGraphType } from "store";
import { setShimmerLeft } from "store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import PanelChildren from "./PanelChildren";
import { setTwinIndex } from "store";
import { setOpenItems } from "store";
function MenuItemV2({ item, onToggle, iconClassName }) {
	const {
		dataArrivedRight,
		panelDataDir: panelData,
		openItems,
		panelLevelLeft: levelData,
		simulationPanels,
		menuStructure,
	} = useDirectorFun("left");
	const isOpen = openItems[item.key];
	const displayedItem = panelData.filter((panel) => panel.key === item.key)[0];
	let imgClassName = "rotate0";
	if (displayedItem.rotate === 90) {
		imgClassName = "rotate90";
	}
	const panelChildren = item.children.filter((child) =>
		child.key.endsWith("_panel")
	);
	const menuChildren = item.children.filter(
		(child) => !child.key.endsWith("_panel")
	);

	const [level, setLevel] = useState(0);

	useEffect(() => {
		isOpen && setLevel(levelData.level);
	}, [isOpen, levelData.level]);

	let menuDirection = displayedItem.subMenuOpenDirection;

	const dispatch = useDispatch();
	// useEffect(() => {
	// 	if (displayedItem.initialOpen === true) {
	// 		if (isOpen === true) {
	// 			let tempOpenItems = { ...openItems };
	// 			delete tempOpenItems[displayedItem.key];
	// 			dispatch(setOpenItems(tempOpenItems));
	// 		} else {
	// 			dispatch(setOpenItems({ ...openItems, [displayedItem.key]: true }));
	// 		}
	// 	} else {
	// 	}
	// }, [dispatch, displayedItem.initialOpen, displayedItem.key, isOpen]);

	return (
		<>
			{" "}
			<div
				key={displayedItem.key}
				className={iconClassName}
				onClick={() => onToggle(displayedItem.key)}
			>
				<img
					className={imgClassName}
					alt="item icon"
					src={displayedItem.icon}
				></img>
			</div>
			{isOpen && (
				<>
					{panelChildren.length > 0 && (
						<PanelChildren displayedItem={displayedItem} />
					)}

					{menuChildren.length > 0 && (
						<MapMenuV2 menuDirection={menuDirection} level={level}>
							<MenuList
								iconClassName={iconClassName}
								items={menuChildren}
								openItems={openItems}
								onToggle={onToggle}
							/>
						</MapMenuV2>
					)}
				</>
			)}
		</>
	);
}
export default MenuItemV2;
