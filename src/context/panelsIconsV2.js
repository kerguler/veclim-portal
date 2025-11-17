import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getVector } from '../vectors/registry';

const PanelContextV2 = createContext(null);

export function PanelProviderV2({ children }) {
  const mapVector = useSelector((s) => s.fetcher.fetcherStates.mapVector);
  const vec = useMemo(() => getVector(mapVector), [mapVector]);

  const [tree, setTree] = useState([]);

  useEffect(() => {
    function buildNestedMenu(data, parentKey = null) {
      return data
        .filter((item) => item.parent === parentKey)
        .map((item) => ({
          ...item,
          children: buildNestedMenu(data, item.key),
        }));
    }
    setTree(buildNestedMenu(vec.menu || []));
  }, [vec]);

  const sharedValues = useMemo(() => {
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

      // (optional) keep these for legacy consumers:
      tileIconsSand: (getVector('sandfly') || {}).tileIcons,
      tileIconsAlbo: (getVector('albopictus') || {}).tileIcons,
      panelDataSand: (getVector('sandfly') || {}).panelData,
      panelDataAlbo: (getVector('albopictus') || {}).panelData,
    };
  }, [vec, tree]);

  return (
    <PanelContextV2.Provider value={sharedValues}>
      {children}
    </PanelContextV2.Provider>
  );
}

export default PanelContextV2;
