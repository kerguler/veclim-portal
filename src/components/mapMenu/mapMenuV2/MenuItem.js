import RenderedPanel from "components/panel/RenderedPanel";
import RenderedPanelV2 from "components/panel/SwitcherV2/RenderedPanelV2";
import SwitcherV2 from "components/panel/SwitcherV2/SwitcherV2";
import { useEffect, useState } from "react";
import MapMenuV2 from "./MapMenuV2";
import { setPanelLevel } from "store";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import useDirectorFun from "customHooks/useDirectorFun";
function MenuItem({ key, item, iconClassName1 }) {

	const panelChildren = item.children.filter((child) =>
		child.key.endsWith('_panel')
	  );
	  const menuChildren = item.children.filter(
		(child) => !child.key.endsWith('_panel')
	  );

	const { panelLevelLeft: levelData } = useDirectorFun("left");
	const dispatch = useDispatch();
	const [displayChildren, setDisplayChildren] = useState(false);

	const handlePanel = (id) => {
		console.log({ id });
		if (id[0] <= levelData.level) {
			console.log({ l: levelData.level });
			dispatch(
				setPanelLevel({ path: id, level: levelData.level + 1, key: item.key })
			);
		} else {
			dispatch(setPanelLevel({ path: id, level: levelData.path.length - 1 }));
		}
		setDisplayChildren(!displayChildren);
	};
if (menuChildren.length > 0) {
	return  <div
			id={item.id}
			key={item.id}
			className={iconClassName1}
			onClick={() => handlePanel(item.id)}
		>
			<img alt="item icon" src={item.icon}></img>
		</div>}
		else if (panelChildren.length > 0) {
			return <RenderedPanelV2></RenderedPanelV2>
		}
	
}

export default MenuItem;
