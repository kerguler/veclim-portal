import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { setTileArray } from 'store';
import { setMapPagePosition } from 'store';

class FetcherService {
  static handleTiles(dispatch, tile, tileIcons) {
    if (tileIcons === undefined) {
      return;
    }
    let vectorDependentTiles = tileIcons && tileIcons.map((tile) => tile.key);
    if (vectorDependentTiles.length === 0) {
      return;
    }

    let localTileArray = [];
    let heading = 'No tile found';
    const error = new Error(heading);
    error.type = 'TileError';
    if (tile === null || tile === '') {
      console.log('no tile was entered', vectorDependentTiles);
      error.explanation =
        'available tiles are:' +
        `${vectorDependentTiles.map((tile) => {
          return tile + '\n';
        })}`;
      dispatch(setTileArray([vectorDependentTiles[0]]));
      return;
    } else {
      console.log('tile was entered', tile);
      localTileArray = tile.split(':');
      if (localTileArray.length === 1) {
        if (vectorDependentTiles.includes(localTileArray[0])) {
          dispatch(setTileArray(localTileArray));
          return;
        } else {
          dispatch(setTileArray([vectorDependentTiles[0]]));
          error.heading = `Tile ${localTileArray[0]} Not Found`;
          error.explanation = `available tiles are: ${vectorDependentTiles.map((tile) => {
            return tile + '\n';
          })}`;
          throw error;
        }
      } else {
        const m = [
          vectorDependentTiles.includes(localTileArray[0]),
          vectorDependentTiles.includes(localTileArray[1]),
        ];
        if (m[0] && m[1]) {
          dispatch(setTileArray(localTileArray));
          return;
        }
        if (m[0] && !m[1]) {
          dispatch(setTileArray([localTileArray[0]]));
          const heading = `two tiles were entered but only the first tile was found  ${localTileArray[0]}`;
          const explanation = `available tiles are: ${vectorDependentTiles.map((tile) => {
            return tile + '\n';
          })}`;
          error.heading = heading;
          error.explanation = explanation;

          throw error;
        }

        if (!m[0] && m[1]) {
          dispatch(setTileArray([localTileArray[1]]));
          const heading = `two tiles were entered but only the second tile was found  ${localTileArray[1]}`;
          const explanation = `available tiles are: ${vectorDependentTiles.map((tile) => {
            return tile + '\n';
          })}`;
          error.heading = heading;
          error.explanation = explanation;

          throw error;
        }
        if (!m[0] && !m[1]) {
          dispatch(setTileArray([vectorDependentTiles[0]]));

          const heading = `two tiles were entered but none was found `;
          const explanation = `available tiles are: ${vectorDependentTiles.map((tile) => {
            return tile + '\n';
          })}`;
          error.heading = heading;
          error.explanation = explanation;

          throw error;
        }
      }
    }
  }
  static handlePanels(dispatch, panel, panelData, lon, lat) {
    if (panelData === undefined) {
      return;
    }

    let panels = panelData.filter((item) => item.key.endsWith('_panel'));

    if (panels.length === 0) {
      return;
    }
    let heading = 'No panel found';
    let longi, lati;
    if (lon == null || lat === null || lon === '' || lat === '') {
      longi = PackageMapServices.defaultCypCenter[1];
      lati = PackageMapServices.defaultCypCenter[0];
    } else if (-90 <= lat && lat <= 90 && -180 <= lon && lat <= lon) {
      longi = lon;
      lati = lat;
      dispatch(setMapPagePosition({ lat: lati, lng: longi }));
    } else {
      longi = PackageMapServices.defaultCypCenter[1];
      lati = PackageMapServices.defaultCypCenter[0];
    }
    const error = new Error(heading);
    error.type = 'PanelError';
  }
}

export default FetcherService;
