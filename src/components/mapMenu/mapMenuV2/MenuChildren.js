import useDirectorFun from 'customHooks/useDirectorFun';
import MapMenuV2 from './MapMenuV2';
import MenuList from './MenuList';
import classNames from 'classnames';
function MenuChildren({ menuDirection, level, iconClassName, menuChildren, onToggle, direction }) {
  const { openItems } = useDirectorFun('left');
  const handleToggle = (key) => {
    onToggle(key);
  };
  return (
    <MapMenuV2 menuDirection={menuDirection} level={level}>
      <MenuList
        iconClassName={iconClassName}
        items={menuChildren}
        openItems={openItems}
        onToggle={(key) => handleToggle(key)}
        direction={direction}
      />
    </MapMenuV2>
  );
}

export default MenuChildren;
