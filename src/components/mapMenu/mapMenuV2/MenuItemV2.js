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

	const panelChildren = item.children.filter((child) =>
		child.key.endsWith("_panel")
	);
	const menuChildren = item.children.filter(
		(child) => !child.key.endsWith("_panel")
	);

	const [level, setLevel] = useState(0);

	useEffect(() => {
		isOpen && setLevel(levelData.level);
	}, [isOpen]);
	const dispatch = useDispatch();


	

	return (
		<>
			{" "}
			<div
				key={displayedItem.key}
				className={iconClassName}
				onClick={() => onToggle(displayedItem.key)}
			>
				<img alt="item icon" src={displayedItem.icon}></img>
			</div>
			{isOpen && (
				<>
					{panelChildren.length > 0 && (
						<PanelChildren displayedItem={displayedItem} />
					)}

					{menuChildren.length > 0 && (
						<MapMenuV2 level={level}>
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
