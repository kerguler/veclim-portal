import useDirectorFun from "customHooks/useDirectorFun";
import RenderedPanelV2 from "components/panel/SwitcherV2/RenderedPanelV2";
import MenuList from "./MenuList";
import { setGraphType } from "store";
import { setShimmerLeft } from "store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { lazy, Suspense } from "react";
import { useState } from "react";
import { setTwinIndex } from "store";
import { setOpenItems } from "store";
const PanelChildren = lazy(() => import("./PanelChildren"));
const MenuChildren = lazy(() => import("./MenuChildren"));
function MenuItemV2({ item, onToggle, iconClassName }) {
	const {
		panelDataDir: panelData,
		openItems,
		panelLevelLeft: levelData,
		vectorName,
		mapVector,
		mapPagePosition,
	} = useDirectorFun("left");

	const isOpen = openItems[item.key];
	const displayedItem = panelData.filter((panel) => panel.key === item.key)[0];
	let imgClassName = "rotate0";
	if (displayedItem && displayedItem?.rotate === 90) {
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

	let menuDirection = displayedItem?.subMenuOpenDirection;

	useEffect(() => {
		if (displayedItem.initialOpen) {
			onToggle(displayedItem.key);
		}
	}, []);

	const [style, setStyle] = useState({});

	useEffect(() => {
		panelChildren.forEach((panel) => {
			let fifi = panelData.filter(
				(panelData) => panelData.key === panel.key
			)[0];
			if (mapPagePosition.lat === null) {
				if (
					fifi &&
					fifi.chartParameters &&
					Object.keys(fifi.chartParameters).length > 0
				) {
					setStyle({ backgroundColor: "grey", pointerEvents: "none" });
				} else {
					setStyle({ color: "white", pointerEvents: "all" });
				}
			} else {
				setStyle({ color: "white", pointerEvents: "all" });
			}
		});
	}, [mapPagePosition.lat,openItems]);

	return (
		<>
			{" "}
			<div
				key={displayedItem.key}
				className={iconClassName}
				style={style}
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
						<Suspense>
							<PanelChildren level={level} displayedItem={displayedItem} />
						</Suspense>
					)}

					{menuChildren.length > 0 && (
						<Suspense>
							<MenuChildren
								menuChildren={menuChildren}
								openItems={openItems}
								menuDirection={menuDirection}
								level={level}
								iconClassName={iconClassName}
								onToggle={onToggle}
							/>
						</Suspense>
						// <MapMenuV2 menuDirection={menuDirection} level={level}>
						// 	<MenuList
						// 		iconClassName={iconClassName}
						// 		items={menuChildren}
						// 		openItems={openItems}
						// 		onToggle={onToggle}
						// 	/>
						// </MapMenuV2>
					)}
				</>
			)}
		</>
	);
}
export default MenuItemV2;
