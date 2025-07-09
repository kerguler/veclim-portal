import { useEffect } from 'react';
import classNames from 'classnames';
function useSetIconActive(
  openItems,
  displayedItem,
  className,
  setLevel,
  shimmerOn,
  levelData,
  isOpen
) {
  if (openItems[displayedItem.key]) {
    if (displayedItem.key !== 'menu_icon' && displayedItem.key !== 'secondary_menu_icon') {
      className = classNames('icon', 'active', shimmerOn ? 'shimmer-on' : 'shimmer-off');
    } else {
      className = classNames('icon', shimmerOn ? 'shimmer-on' : 'shimmer-off');
    }
  } else {
    className = classNames('icon', shimmerOn ? 'shimmer-on' : 'shimmer-off');
  }

  useEffect(() => {
    isOpen && setLevel(levelData.level);
  }, [isOpen, levelData.level]);

 return className
}

export default useSetIconActive;
