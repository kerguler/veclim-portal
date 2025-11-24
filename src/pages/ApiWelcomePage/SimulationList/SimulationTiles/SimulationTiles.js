import './SimulationTiles.css';
import SimTile from './SimTile/SimTile';
import React from 'react';
import useDirectorFun from 'customHooks/useDirectorFun';
function SimulationTiles({ fetchedSimList, direction }) {
  const { simulationPanels, menuStructure } = useDirectorFun(direction);
  let parents = [];
  const findParents = (key) => {
    let parent = menuStructure.filter((item) => item.key === key)[0].parent;
    return parent;
  };
  let shimmerList = {};
  simulationPanels.forEach((panel) => {
    const parentChain = [];
    let current = findParents(panel.key);
    while (current !== null) {
      parentChain.push(current);
      current = findParents(current);
    }
    parents.push(...parentChain);
  });

  parents.forEach((parent) => {
    if (parent !== null) {
      shimmerList = { ...shimmerList, [parent]: false };
    }
  });

  if (fetchedSimList && fetchedSimList.length === 0) {
    return (
      <div className="flex-row full-width">
        <div className="flex-column border-r5 float-bg2">
          <p>No simulations found</p>
        </div>
      </div>
    );
  } else {
    return (
      fetchedSimList &&
      fetchedSimList.map((sim) => {
        return (
          <SimTile shimmerList={shimmerList} direction={direction} key={sim.id} sim={sim}></SimTile>
        );
      })
    );
  }
}

export default SimulationTiles;
