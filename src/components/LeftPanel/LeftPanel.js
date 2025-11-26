// src/components/LeftPanel/LeftPanel.js
import { useSelector } from 'react-redux';
import { getVector } from 'vectors/registry';
import AlbopictusLeftPanel from 'vectors/albopictus/LeftPanel';

function DefaultLeftPanel() {
  return <AlbopictusLeftPanel />;
}

function LeftPanel(props) {
  const vectorName = useSelector(
    (state) => state.fetcher.fetcherStates.vectorName
  );

  const vec = getVector(vectorName);
  const VectorLeftPanelComponent =
    vec?.ui?.LeftPanelComponent || DefaultLeftPanel;

  return <VectorLeftPanelComponent {...props} />;
}

export default LeftPanel;
