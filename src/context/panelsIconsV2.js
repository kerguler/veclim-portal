import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getVector } from '../vectors/registry';

import { GLOBAL_TOOLS_MENU_ITEM } from 'components/map/MapToolsPanel/globalPanels';

const PanelContext = createContext(null);


function decorateVectorWithGlobalTools(vec) {
  const baseMenu = vec.menu || [];

  const hasToolsMenu = baseMenu.some(
    (m) => m && m.key === GLOBAL_TOOLS_MENU_ITEM.key
  );

  const menu = hasToolsMenu
    ? baseMenu
    : [...baseMenu, GLOBAL_TOOLS_MENU_ITEM];

  return {
    ...vec,
    menu,
    // panelData stays as vector defined it
  };
}

export function PanelProvider({ children }) {
  const mapVector = useSelector((s) => s.fetcher.fetcherStates.mapVector);

  // 1) get base vector config
  const rawVec = useMemo(() => getVector(mapVector), [mapVector]);

  // 2) decorate with global tools
  const vec = useMemo(
    () => (rawVec ? decorateVectorWithGlobalTools(rawVec) : rawVec),
    [rawVec]
  );

  const [tree, setTree] = useState([]);

  useEffect(() => {
    if (!vec) {
      setTree([]);
      return;
    }

    function buildNestedMenu(data, parentKey = null) {
      return (data || [])
        .filter((item) => item.parent === parentKey)
        .map((item) => ({
          ...item,
          children: buildNestedMenu(data, item.key),
        }));
    }

    setTree(buildNestedMenu(vec.menu || []));
  }, [vec]);

  const sharedValues = useMemo(() => {
    if (!vec) {
      return {
        panelData: [],
        tileIcons: [],
        tileIconsRowHeadings: [],
        menuStructure: [],
        simulationPanels: [],
        tree: [],
        colorKeys: {},
        features: {},
        vectorId: null,
        tileIconsSand: [],
        tileIconsAlbo: [],
        panelDataSand: [],
        panelDataAlbo: [],
      };
    }

    const simulationPanels = (vec.panelData || []).filter(
      (p) => p && p.simulation
    );

    return {
      panelData: vec.panelData,
      tileIcons: vec.tileIcons,
      tileIconsRowHeadings: vec.tileIconRowHeadings,
      menuStructure: vec.menu,
      simulationPanels,
      tree,
      colorKeys: vec.colorKeys || {},
      features: vec.features || {},
      vectorId: vec.id,

      // legacy
      tileIconsSand: (getVector('sandfly') || {}).tileIcons,
      tileIconsAlbo: (getVector('albopictus') || {}).tileIcons,
      panelDataSand: (getVector('sandfly') || {}).panelData,
      panelDataAlbo: (getVector('albopictus') || {}).panelData,
    };
  }, [vec, tree]);

  return (
    <PanelContext.Provider value={sharedValues}>
      {children}
    </PanelContext.Provider>
  );
}

export default PanelContext;
