import useDirectorFun from "customHooks/useDirectorFun";
import React, { useEffect, useState } from "react";
import MapMenuV2 from "./MapMenuV2";
import classNames from "classnames";
import RenderedPanelV2 from "components/panel/SwitcherV2/RenderedPanelV2";
import MenuList from "./MenuList";
import { useDispatch } from "react-redux";
import { setPanelLevel } from "store";
import { setTwinIndex } from "store";

function buildNestedMenu(data, parentKey = null) {
	return data
		.filter((item) => item.parent === parentKey)
		.map((item) => ({
			...item,
			children: buildNestedMenu(data, item.key),
		}));
}

export default function MapMenuPicker() {
	const [tree, setTree] = useState([]);

	const {
		menuStructure,
		openItems,
		setOpenItems,
		panelLevelLeft: levelData,
		dataArrivedRight,
	} = useDirectorFun("left");
	// Build the nested menu once
	const dispatch = useDispatch();
	useEffect(() => {
		const nested = buildNestedMenu(menuStructure);
		setTree(nested);
	}, [menuStructure]);

	const [panelClassName, setPanelClassName] = useState("");
	const [shimmerOn, setShimmerOn] = useState(false);
	let className = classNames("icon");
	if (shimmerOn) {
		className = classNames("icon", "shimmer-on");
	} else {
		className = classNames("icon", "shimmer-off");
	}

	// Here is the "close siblings" logic
	function handleToggle(clickedKey) {
		const findParents = (key) => {
			let dataInStructure = menuStructure.filter((item) => item.key === key);
			return dataInStructure[0].parent;
		};
		const findDestroyChildren = (key) => {
			let dataInStructure = menuStructure.filter((item) => item.key === key)[0];
			console.log({ dataInStructure });
			let children = menuStructure.filter((item) => item.parent === key);
			children = menuStructure.filter((item) => item.parent === key);
			console.log("children found", children);

			children.forEach((child) => {
				if (openItemsTemp[child.key]) {
					console.log("deleting child", child.key);
					delete openItemsTemp[child.key];
				}
				console.log("child", child);
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
		}
		dispatch(
			setPanelLevel({ ...levelData, level: Object.keys(openItemsTemp).length })
		);
		dispatch(setOpenItems(openItemsTemp));
		dispatch(setTwinIndex(0));
	}

	if (!tree || !tree.length) return null;

	console.log({ tree });
	return (
		<MapMenuV2 level={0}>
			
			<MenuList
				items={tree}
				iconClassName={className}
				onToggle={handleToggle}
			/>

		</MapMenuV2>
	);
}
