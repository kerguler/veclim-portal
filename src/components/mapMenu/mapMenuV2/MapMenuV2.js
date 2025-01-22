import "./mapMenuV2.css";
import classNames from "classnames";
import useDirectorFun from "customHooks/useDirectorFun";
import { useEffect, useRef, useState } from "react";
function MapMenuV2({ menuDirection, direction, children, level }) {
	const { panelDataDir: panelData, openItems } = useDirectorFun("left");
	const menuRef = useRef(null);
	let className = classNames("icon-column", `level${level}`);
	const [style, setStyle] = useState({});
	useEffect(() => {
		let m = menuRef.current;
		if (menuDirection === "right") {
			setStyle({
				top: `${(m.getBoundingClientRect().top - level * 50) / level}px`,
			});
		}
	}, [level, menuDirection]);

	className = classNames(className, `direction-${menuDirection}`);

	return (
		<div>
			<div className={className} style={style}>
				{
					<div ref={menuRef} className="vertical-menu">
						{children}
					</div>
				}
			</div>
		</div>
	);
}

export default MapMenuV2;
