import MenuItemV2 from "./MenuItemV2";
import useDirectorFun from "customHooks/useDirectorFun";
import classNames from "classnames";
function MenuList({ items, onToggle, iconClassName }) {
	const {
		openItems,
		setOpenItems,
		dataArrivedRight,
		menuStructure,
		simulationPanels,
	} = useDirectorFun("left");

	if (!items || items.length === 0) return null;

	let className = classNames("icon");
	if (Object.keys(openItems).length === 0) {
		className = classNames("icon", "shimmer-on");
	} else {
		className = classNames("icon", "shimmer-off");
	}

	return items.map((item) => {
		let siblingKeys = items.filter((i) => i.key !== item.key).map((i) => i.key);
		if (dataArrivedRight) {
			let parents = [];
			const findParents = (key) => {
				let parent = menuStructure.filter((item) => item.key === key)[0].parent;

				return parent;
			};

			simulationPanels.forEach((panel) => {
				parents.push(findParents(panel.key));
				while (parents[parents.length - 1] !== null) {
					parents.push(findParents(parents[parents.length - 1]));
				}
			});

			if (parents.includes(item.key)) {
				className = classNames("icon", "shimmer-on");
			} else {
				className = classNames("icon", "shimmer-off");
			}
		}
		return (
			<MenuItemV2
				iconClassName={className}
				key={item.key}
				item={item}
				openItems={openItems}
				onToggle={(clickedKey) => {
					return onToggle(clickedKey, siblingKeys);
				}}
			/>
		);
	});
}

export default MenuList;
