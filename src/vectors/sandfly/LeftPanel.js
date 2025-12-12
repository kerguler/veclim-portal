// src/vectors/albopictus/LeftPanel.js
import 'components/LeftPanel/GeneralStyles/FloatPanel.css';
import 'components/LeftPanel/GeneralStyles/FloatiesHeader.css';
import 'components/LeftPanel/LeftPanel.css';
import 'components/LeftPanel/GeneralStyles/OverflowIndicator.css';

import useWindowSize from 'customHooks/useWindowSize';
import MapWithDate from 'components/LeftPanel/MapWithDate/MapWithDate';
import PlainInfo from 'components/LeftPanel/PlainInfo/PlainInfo';
import News from 'components/LeftPanel/News/NewsFromApi';
import TemplatePage from 'pages/TemplatePage/TemplatePage';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Skeleton from 'components/skeleton/Skeleton';
import VectorSelector from 'components/LeftPanel/vectorSelection/VectorCarousel';
import XLink from 'components/xlink';

function IsmedClimLeftPanel({ page, displayNews, displayContent }) {
  const { webApp } = useWindowSize();
  const location = useLocation();
  const position = useSelector(
    (state) => state.fetcher.fetcherStates.map.globalPosition
  );

  const text = (
    <p>Risk indicators from the <XLink href="https://doi.org/10.1016/j.crpvbd.2023.100152"><strong>Sand Fly Cyprus</strong></XLink> model are not yet available on <strong>VEClim</strong></p>
  );

  const home = (
    <>
      {webApp && <div className="spacer"></div>}

      <div className="left-panel-container">
        <div className="left-panel-inner-content">
          {displayNews && !webApp && <News />}
          {position.lat === null ? (
            <Skeleton times={4} noBorder={true} />
          ) : (
            <MapWithDate />
          )}

          {/* Vector selector works for all vectors, but we keep it here
              because this layout is currently designed for albopictus */}
          <VectorSelector />

          <div className="indicators-container">
            {position.lat === null ? (
              <Skeleton times={4} noBorder={true} />
            ) : (
              <div className="indicators-container inner-content">
                <PlainInfo>
                  {text}
                </PlainInfo>
              </div>
            )}
          </div>

          {displayNews && webApp && <News />}
          {webApp && displayContent && <TemplatePage />}
        </div>
      </div>
    </>
  );

  const rest = (
    <>
      <div className="left-panel-container">
        <div className="left-panel-inner-content">
          {displayNews && !webApp && <News />}
          {!webApp && <MapWithDate />}
          <VectorSelector />

          {!webApp && (
            <div className="indicators-container">
              <div className="indicators-container inner-content">
                <PlainInfo>
                  {text}
                </PlainInfo>
              </div>
            </div>
          )}

          {webApp && displayContent && <TemplatePage />}
        </div>
      </div>
    </>
  );

  return location.pathname === '/' ? home : rest;
}

export default IsmedClimLeftPanel;
