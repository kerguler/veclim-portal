import './GenericPage/GenericPage.css';
import 'styles/Theme1.css';

import { useParams } from 'react-router-dom';
import { getVector } from 'vectors/registry';

import NavBarContainer from 'components/NavBar/NavBarContainer';
import LeftPanel from 'components/LeftPanel/LeftPanel';
import DesktopContentWrapper from './GenericPage/DesktopContentWrapper';
import { TextProvider } from 'context/appText';

function VectorMethodsPage() {
  const { vecId } = useParams();
  const vector = getVector(vecId);

  if (!vector) {
    return <div>Unknown vector: {vecId}</div>;
  }

  if (!vector.methodsPage) {
    return (
      <div>
        No methods page defined for {vector.meta?.methods?.label || vecId}
      </div>
    );
  }

  return (
    <TextProvider pageOverride={vector.methodsPage}>
      <>
        <NavBarContainer />
        <LeftPanel page="home" displayContent displayNews />
        <DesktopContentWrapper />
      </>
    </TextProvider>
  );
}

export default VectorMethodsPage;
