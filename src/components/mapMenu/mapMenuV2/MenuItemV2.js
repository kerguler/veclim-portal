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
import useWindowSize from "customHooks/useWindowSize";
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
	const webApp = useWindowSize();
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
	const [imgStyle, setImgStyle] = useState({});

	useEffect(() => {
		panelChildren.forEach((panel) => {
			let myPanel = panelData.filter(
				(panelData) => panelData.key === panel.key
			)[0];
			if (mapPagePosition.lat === null) {
				if (
					(myPanel &&
						myPanel.chartParameters &&
						Object.keys(myPanel.chartParameters).length > 0) ||
					myPanel.positionDependent
				) {
					setStyle({
						backgroundColor: "var(--neutral-color1)",
						pointerEvents: "none",
						cursor: "not-allowed",
					});
					setImgStyle({
						color: "grey",
						// width: "20px",
						// height: "20px",
					});
				} else {
					setStyle({ color: "white", pointerEvents: "all" });
					setImgStyle({
						color: "grey",
						// width: webApp ? "20px" : "2px",
						// height: webApp ? "20px" : "32px",
					});
				}
			} else {
				setStyle({ color: "white", pointerEvents: "all" });
				setImgStyle({
					color: "grey",
					// width: webApp ? "20px" : "32px",
					// height: webApp ? "20px" : "32px",
				});
			}
		});
	}, [mapPagePosition.lat, openItems]);

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
					style={imgStyle}
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
