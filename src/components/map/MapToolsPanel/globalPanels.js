import MapToolsPanel from 'components/map/MapToolsPanel/MapToolsPanel';
import shareIcon from 'assets/icons/map-page-right-menu/svg/share-32px.svg';
export const GLOBAL_TOOLS_PANEL = {
  key: 'map_tools_panel',
  label: 'Share & Download',
  icon: shareIcon, // whatever your menu renderer expects
  component: MapToolsPanel,
  simulation: false,
  isUtility: true,
};

export const GLOBAL_TOOLS_MENU_ITEM = {
  key: 'map_tools_utility',
  label: 'Share & Download',
  icon: shareIcon,
  parent: 'menu_icon', // top-level item in the vertical menu
  isUtility: true,
};
