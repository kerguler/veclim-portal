export default function findDestroyChildren(
  menuStructure,
  key,
  openItemsTemp,
  levelData,
  dispatch,
  setPanelLevel,
  
  
  
  
) {
  let dataInStructure = menuStructure.filter((item) => item.key === key)[0];
  let children = menuStructure.filter((item) => item.parent === key);
  children = menuStructure.filter((item) => item.parent === key);

  children.forEach((child) => {
    if (openItemsTemp[child.key]) {
      delete openItemsTemp[child.key];
    }
    findDestroyChildren(child.key);
  });

  dispatch(
    setPanelLevel({
      ...levelData,
      level: Object.keys(openItemsTemp).length,
    })
  );
}
