import './ColorBarLabelComponent.css';
import { setDisplayTileNames, useFetchColorBarsDataQuery } from 'store';

import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

import PanelContextV2 from 'context/panelsIconsV2';
import useDirectorFun from 'customHooks/useDirectorFun';
import useColorBarResize from '../ColorBar/useColorBarResize';

function TileNameDisplay({ side, tiles }) {
  const { tileIcons } = useContext(PanelContextV2);

  const [faded, setFaded] = useState(false);

  useEffect(() => {
    setFaded(false);
    const timer = setTimeout(() => {
      setFaded(true);
    }, 10000); // fade after 3 seconds
    return () => clearTimeout(timer);
  }, [side, tiles]);

  const tileLabels = tiles.map((tile, index) => {
    let selectedTile = tileIcons.find((tileIcon) => tileIcon.key === tile);
    return selectedTile ? selectedTile.label : null;
  });

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className={`tile-name-wrapper ${faded ? 'faded' : 'visible'}`}
    >
      <div className={side}>
        {' '}
        <p>{tileLabels[side == 'left' ? 0 : 1]}</p>
      </div>
    </div>
  );
}

function ColorBarLabelComponent({ times }) {
  const colorBarRef = useRef();
  const { panelOpen, panelTop, tileArray, tileIcons, mapVector } = useDirectorFun('left');
  const [extractedTile, setExtractedTile] = useState([]);
  const [style, setStyle] = useState([]);

  const { colorKeys } = useContext(PanelContextV2);

  const { data, error, isFetching } = useFetchColorBarsDataQuery();
  const selectedTiles = useSelector((state) => state.fetcher.fetcherStates.tileArray);

  const leftBarRef = useRef(),
    rightBarRef = useRef();

  const [webApp, setWebApp] = useState(null);
  const dispatch = useDispatch();

  const handleDisplayTiles = (e, direction) => {
    if (direction === 'left') {
      dispatch(setDisplayTileNames({ center: false, left: true, right: false }));
    } else if (direction === 'right') {
      dispatch(setDisplayTileNames({ center: false, left: false, right: true }));
    } else {
      dispatch(setDisplayTileNames({ center: true, left: false, right: false }));
    }
  };
  useColorBarResize(leftBarRef, rightBarRef, panelOpen, panelTop, times, setStyle);
  let colors, labels;
  useEffect(() => {
    if (data) {
      const extractedTile1 = tileArray?.map((tile) => {
        const found = tileIcons.find((icon) => icon.key === tile);
        return found?.colkey;
      });
      setExtractedTile(extractedTile1);
    }
  }, [data, tileArray, mapVector, isFetching, error]);

  if (isFetching) {
    return <div></div>;
  } else if (error) {
    return <div></div>;
  } else {
    if (!extractedTile || extractedTile.length === 0) return <div></div>;
    if (tileArray.length === 0) return <div></div>;
    if (!data) return <div></div>;

    colors = data[colorKeys[extractedTile[0]]].colors;
    labels = data[colorKeys[extractedTile[0]]].labels;
    let renderedDivs2, renderedLabels2;
    let transColor = '#00000000';

    const renderedDivs = colors.map((color, index) => {
      return (
        <div
          onContextMenu={(e) => e.preventDefault()}
          key={index}
          className="color-bar-rect"
          style={{
            backgroundColor: `${
              colors[colors.length - index - 1] === transColor
                ? '#FFFFFF'
                : colors[colors.length - index - 1]
            }`,
            backgroundColor: `${
              colors[colors.length - index - 1] === transColor
                ? '#FFFFFF'
                : colors[colors.length - index - 1]
            }`,
          }}
        ></div>
      );
    });
    const renderedLabels = labels.map((label, index) => {
      return (
        <div onContextMenu={(e) => e.preventDefault()} key={index} className="color-bar-p">
          <p>{labels[labels.length - index - 1]}</p>
        </div>
      );
    });
    if (extractedTile.length === 2) {
      let colors2 = data[colorKeys[extractedTile[1]]].colors;
      let labels2 = data[colorKeys[extractedTile[1]]].labels;
      if (colors2.length !== 0) {
        renderedDivs2 = colors2.map((color, index) => {
          return (
            <div
              onContextMenu={(e) => e.preventDefault()}
              key={index}
              className="color-bar-rect"
              style={{
                backgroundColor: `${
                  colors2[colors2.length - index - 1] === transColor
                    ? '#FFFFFF'
                    : colors2[colors2.length - index - 1]
                }`,
              }}
            ></div>
          );
        });

        renderedLabels2 = labels2.map((label, index) => {
          return (
            <div onContextMenu={(e) => e.preventDefault()} key={index} className="color-bar-p">
              <p>{labels2[labels2.length - index - 1]}</p>
            </div>
          );
        });
      } else {
        // renderedLabels2 = renderedLabels;
        // renderedDivs2 = renderedDivs;
      }
    }

    return (
      <div onContextMenu={(e) => e.preventDefault()}>
        <div
          onMouseOver={(e) => handleDisplayTiles(e, selectedTiles.length === 2 ? 'left' : 'center')}
          ref={leftBarRef}
          className="color-bar left"
          style={style[0]}
        >
          <div className="color-bar-wrapper">
            <div className="color-bar-colors">{renderedDivs}</div>
            <div className="color-bar-texts">{renderedLabels}</div>
          </div>
          <TileNameDisplay side="left" tiles={selectedTiles} />
        </div>
        {times === 2 && (
          <div
            onContextMenu={(e) => e.preventDefault()}
            onMouseOver={(e) => handleDisplayTiles(e, 'right')}
            ref={rightBarRef}
            className="color-bar right"
            style={style[1]}
          >
            <div className="color-bar-wrapper">
              <div className="color-bar-texts">{renderedLabels2}</div>
              <div className="color-bar-colors">{renderedDivs2}</div>
            </div>
            <TileNameDisplay side="right" tiles={selectedTiles} />
          </div>
        )}
      </div>
    );
  }
}

export default ColorBarLabelComponent;
