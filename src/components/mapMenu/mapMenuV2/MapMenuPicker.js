import useDirectorFun from "customHooks/useDirectorFun";
import React, { useEffect, useState } from "react";
import MapMenuV2 from "./MapMenuV2";
import classNames from "classnames";
import RenderedPanelV2 from "components/panel/SwitcherV2/RenderedPanelV2";
import MenuList from "./MenuList";
import { useDispatch } from "react-redux";
import { setPanelLevel } from "store";
import { setTwinIndex } from "store";
import { useAlboData } from "context/AlboDataContext";
import { setDataArrivedRight } from "store";

export default function MapMenuPicker() {
	const {
		menuStructure,
		openItems,
		setOpenItems,
		panelLevelLeft: levelData,
		panelDataDir: panelData,
		dataArrivedRight,
		tree,
		invalidateSimData,
	} = useDirectorFun("left");
	// Build the nested menu once
	const dispatch = useDispatch();

	const [panelClassName, setPanelClassName] = useState("");
	const [shimmerOn, setShimmerOn] = useState(false);
	let className = classNames("icon");
	if (shimmerOn) {
		className = classNames("icon", "shimmer-on");
	} else {
		className = classNames("icon", "shimmer-off");
	}
	const { setDataSim } = useAlboData();
	useEffect(() => {
		if (invalidateSimData) {
			console.log("should have set dataArrived False datasim null ");
			dispatch(setDataArrivedRight(false));

			setDataSim(null);
		}
	}, [invalidateSimData]);
	// Here is the "close siblings" logic
	function handleToggle(clickedKey) {
		const findParents = (key) => {
			let dataInStructure = menuStructure.filter((item) => item.key === key);
			return dataInStructure[0].parent;
		};
		const findDestroyChildren = (key) => {
			let dataInStructure = menuStructure.filter((item) => item.key === key)[0];
			let children = menuStructure.filter((item) => item.parent === key);
			children = menuStructure.filter((item) => item.parent === key);

			children.forEach((child) => {
				if (openItemsTemp[child.key]) {
					delete openItemsTemp[child.key];
				}
				findDestroyChildren(child.key);
			});

			dispatch(
				setPanelLevel({
					...levelData,
					level: Object.keys(openItemsTemp).length,
				})
			);
		};
		let parentKey = findParents(clickedKey);
		let openItemsTemp = {};
		while (parentKey !== null) {
			openItemsTemp[parentKey] = true;
			parentKey = findParents(parentKey);
		}
		if (!openItems[clickedKey]) {
			openItemsTemp[clickedKey] = true;
		} else {
			delete openItemsTemp[clickedKey];
			let currentPanel = panelData.filter(
				(panel) => panel.key === clickedKey
			)[0];
			if (currentPanel.selfClose) {
				delete openItemsTemp[findParents(clickedKey)];
			}
		}
		dispatch(
			setPanelLevel({ ...levelData, level: Object.keys(openItemsTemp).length })
		);

		dispatch(setOpenItems(openItemsTemp));
		dispatch(setTwinIndex(0));
	}

	if (!tree || !tree.length) return null;

	const itemKey = tree[0].key;
	const menuDirection = "";
	return (
		<MapMenuV2 menuDirection={menuDirection} level={0}>
			<MenuList
				items={tree}
				iconClassName={className}
				onToggle={handleToggle}
			/>
		</MapMenuV2>
	);
}
