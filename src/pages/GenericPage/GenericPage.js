import './GenericPage.css';
import 'styles/Theme1.css';
import NavBarContainer from 'components/NavBar/NavBarContainer';
import LeftPanel from 'components/LeftPanel/LeftPanel';
import DesktopContentWrapper from './DesktopContentWrapper';
import { TextProvider } from 'context/appText';

function GenericPage() {
  return (
    <TextProvider>
      <>
        <NavBarContainer />
        <LeftPanel page="home" displayContent displayNews />
        <DesktopContentWrapper />
      </>
    </TextProvider>
  );
}

export default GenericPage;
