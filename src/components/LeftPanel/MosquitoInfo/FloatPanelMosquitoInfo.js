import './FloatPanelMosquitoInfo.css';
import mosquitoIcon from 'assets/icons/mosquito-64px.png';
import infoIcon from 'assets/icons/info-48px.png';
import emailIcon from 'assets/icons/mail-48px.png';
import closePicB from 'assets/icons/flip-close.jpg';
import closePicW from 'assets/icons/flip-close-white.jpg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchCoordinateDataQuery } from 'store';

// import "../RiskInfo/FloatPanelIndicators.css";

import ReactCardFlip from 'react-card-flip';
import ChartLoadingSkeleton from 'components/skeleton/Skeleton';
import useWindowSize from 'customHooks/useWindowSize';

function FloatPanelMosquitoInfo() {
  const { webApp } = useWindowSize();
  const closePic = !webApp ? closePicB : closePicW;

  var content = '';
  var explain = '';
  const position = useSelector((state) => {
    return state.fetcher.fetcherStates.map.globalPosition;
  });
  const { data, error, isFetching } = useFetchCoordinateDataQuery(JSON.stringify(position));

  const [isFlipped, setFlip] = useState(false);

  const handleClickMailTo = () => {
    window.open('mailto:k.erguler@cyi.ac.cy', '_blank', 'noreferrer');
  };

  const handleClickHow = (event) => {
    event.stopPropagation();
    setFlip(!isFlipped);
  };

  const handleClickClose = (event) => {
    event.stopPropagation();
    setFlip(false);
  };
  if (isFetching) {
    return (
      <div className="mosquito-container-wrap">
        <div className="mosquito-container">
          {' '}
          <ChartLoadingSkeleton noBorder={true} times={4}></ChartLoadingSkeleton>
        </div>
      </div>
    );
  } else if (error) {
  } else if (data) {
    if (!('location' in data) || !data.location.island) {
      content = <p>Ops! We do not have information about the tiger mosquito in your region</p>;
      explain = (
        <div className="mosquito-text-full">
          <p>This is strage!</p>
          <p>
            Please{' '}
            <a href="mailto:k.erguler@cyi.ac.cy" target="_blank" rel="noreferrer">
              contact us
            </a>{' '}
            about this problem.
          </p>
        </div>
      );
    } else if (data.presence.albopictus[0]) {
      content = (
        <p>
          There are reports of the <strong>tiger mosquito</strong> in your region
        </p>
      );
      explain = (
        <>
          <div className="mosquito-text-full">
            <p>
              The tiger mosquito is seen somewhere around the <strong>little red square</strong>.
            </p>
            <p>How do we know? Here:</p>
            <ul>
              {data.presence.albopictus.map((elm, i) => {
                return (
                  <li key={i}>
                    <a target="_blank" rel="noreferrer" href={elm.citation.url}>
                      {elm.dataset}
                    </a>
                  </li>
                );
              })}
            </ul>
            <p>
              Please check it out,{' '}
              <strong>contact your regional authorities for information</strong>, and do let us know
              if we've made a mistake.
            </p>
            <p>
              I am sure you will find this excellent{' '}
              <a
                href="https://www.ecdc.europa.eu/en/publications-data/invasive-mosquitoes-colonising-europe-what-can-we-do"
                target="_blank"
                rel="noreferrer"
              >
                animation
              </a>{' '}
              by ECDC quite informative.
            </p>
          </div>
        </>
      );
    } else {
      content = (
        <p>
          There are <strong>no</strong> reports of the tiger mosquito in your region
        </p>
      );
      explain = (
        <>
          <div className="mosquito-text-full">
            <p>
              <strong>Good news!</strong> The little red square on the map does not overlap with any
              administrative region where the tiger mosquito is seen.
            </p>
            <p>
              We try to keep an up-to-date database of mosquito sightings. Please let us know if we
              missed something!
            </p>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div className="mosquito-container-wrap">
          <div className="mosquito-container">
            <div className="mosquito-text">
              {' '}
              {content}
              <div className="mosquito-container icons">
                {' '}
                <img
                  loading="lazy"
                  onClick={handleClickMailTo}
                  className="clickable"
                  alt="email"
                  src={emailIcon}
                ></img>
                <img
                  loading="lazy"
                  onClick={handleClickHow}
                  className="clickable"
                  alt="question"
                  src={infoIcon}
                ></img>
              </div>
            </div>
            <div className="mosquito-heading">
              <img alt="mosquito" src={mosquitoIcon} />
            </div>
          </div>
        </div>

        <div className="mosquito-container-wrap">
          <img
            alt="close-button"
            className="flip-close"
            src={closePic}
            onClick={handleClickClose}
          ></img>
          <div className="mosquito-container">
            <div className="mosquito-text"> {explain}</div>
          </div>
        </div>
      </ReactCardFlip>
    </>
  );
}

export default FloatPanelMosquitoInfo;
