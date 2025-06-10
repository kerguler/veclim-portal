import useDirectorFun from 'customHooks/useDirectorFun';
import MapMenuV2 from './MapMenuV2';
import MenuList from './MenuList';
function MenuChildren({
	menuDirection,
	level,
	iconClassName,
	menuChildren,
	onToggle,
	direction,
}) {
	const { openItems } = useDirectorFun('left');

	return (
		<MapMenuV2 menuDirection={menuDirection} level={level}>
			<MenuList
				iconClassName={iconClassName}
				items={menuChildren}
				openItems={openItems}
				onToggle={onToggle}
				direction={direction}
			/>
		</MapMenuV2>
	);
}

export default MenuChildren;
