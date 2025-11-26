// src/components/LeftPanel/LeftPanel.js
import { useSelector } from 'react-redux';
import { getVector } from 'vectors/registry';

// Fallback in case a vector doesn’t define its own LeftPanel yet
function DefaultLeftPanel() {
  return null; // or a simple placeholder
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
