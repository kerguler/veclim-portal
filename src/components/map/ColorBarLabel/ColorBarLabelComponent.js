import './ColorBarLabelComponent.css';
import { setDisplayTileNames, useFetchColorBarsDataQuery } from 'store';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useDirectorFun from 'customHooks/useDirectorFun';
import useColorBarResize from '../ColorBar/useColorBarResize';
import { getVector } from 'vectors/registry';

function TileNameDisplay({ side, tiles = [], tileIcons = [] }) {
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    setFaded(false);
    const timer = setTimeout(() => setFaded(true), 10000);
    return () => clearTimeout(timer);
  }, [side, tiles]);

  const labelIndex = side === 'left' ? 0 : 1;
  const tileKey = tiles[labelIndex];
  const selectedTile = tileIcons.find((tileIcon) => tileIcon.key === tileKey);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className={`tile-name-wrapper ${faded ? 'faded' : 'visible'}`}
    >
      <div className={side}>
        <p>{selectedTile?.label || tileKey || ''}</p>
      </div>
    </div>
  );
}

function ColorBarLabelComponent({ times }) {
  const dispatch = useDispatch();

  const {
    panelOpen,
    panelTop,
    tileArray = [],
    mapVector,
  } = useDirectorFun('left');

  const selectedTiles = useSelector(
    (state) => state.fetcher.fetcherStates.tileArray
  );

  const activeVector = getVector(mapVector);

  const tileIcons = useMemo(() => {
    return (
      activeVector?.tiles ||
      activeVector?.tileIcons ||
      activeVector?.map?.tiles ||
      []
    );
  }, [activeVector]);

  const [style, setStyle] = useState([]);

  const { data, error, isFetching } = useFetchColorBarsDataQuery();

  const leftBarRef = useRef(null);
  const rightBarRef = useRef(null);

  const extractedTile = useMemo(() => {
    return tileArray
      ?.map((tile) => {
        const found = tileIcons.find((icon) => icon.key === tile);
        return found?.colkey;
      })
      .filter(Boolean);
  }, [tileArray, tileIcons]);

  const barsReady =
    !!data && !isFetching && extractedTile && extractedTile.length > 0;

  useColorBarResize(
    leftBarRef,
    rightBarRef,
    panelOpen,
    panelTop,
    times,
    setStyle,
    barsReady
  );

  const handleDisplayTiles = (direction) => {
    if (direction === 'left') {
      dispatch(
        setDisplayTileNames({ center: false, left: true, right: false })
      );
    } else if (direction === 'right') {
      dispatch(
        setDisplayTileNames({ center: false, left: false, right: true })
      );
    } else {
      dispatch(
        setDisplayTileNames({ center: true, left: false, right: false })
      );
    }
  };

  const renderColors = (colors = []) => {
    const transColor = '#00000000';

    return colors.map((_, index) => {
      const color = colors[colors.length - index - 1];

      return (
        <div
          onContextMenu={(e) => e.preventDefault()}
          key={index}
          className="color-bar-rect"
          style={{
            backgroundColor: color === transColor ? '#FFFFFF' : color,
          }}
        />
      );
    });
  };

  const renderLabels = (labels = []) => {
    return labels.map((_, index) => {
      const label = labels[labels.length - index - 1];

      return (
        <div
          onContextMenu={(e) => e.preventDefault()}
          key={index}
          className="color-bar-p"
        >
          <p>{label}</p>
        </div>
      );
    });
  };

  if (isFetching || error) return <div />;
  if (!data || !tileArray.length || !extractedTile.length) return <div />;

  const entry0 = data[extractedTile[0]];
  if (!entry0) return <div />;

  const entry1 = extractedTile[1] ? data[extractedTile[1]] : null;

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <div
        onMouseOver={() =>
          handleDisplayTiles(selectedTiles.length === 2 ? 'left' : 'center')
        }
        ref={leftBarRef}
        className="color-bar left"
        style={style[0]}
      >
        <div className="color-bar-wrapper">
          <div className="color-bar-colors">
            {renderColors(entry0.colors || [])}
          </div>
          <div className="color-bar-texts">
            {renderLabels(entry0.labels || [])}
          </div>
        </div>

        <TileNameDisplay
          side="left"
          tiles={selectedTiles}
          tileIcons={tileIcons}
        />
      </div>

      {times === 2 && entry1 && (
        <div
          onContextMenu={(e) => e.preventDefault()}
          onMouseOver={() => handleDisplayTiles('right')}
          ref={rightBarRef}
          className="color-bar right"
          style={style[1]}
        >
          <div className="color-bar-wrapper">
            <div className="color-bar-texts">
              {renderLabels(entry1.labels || [])}
            </div>
            <div className="color-bar-colors">
              {renderColors(entry1.colors || [])}
            </div>
          </div>

          <TileNameDisplay
            side="right"
            tiles={selectedTiles}
            tileIcons={tileIcons}
          />
        </div>
      )}
    </div>
  );
}

export default ColorBarLabelComponent;
