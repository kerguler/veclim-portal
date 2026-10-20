// available base layers (no key, no labels)
export const BASEMAPS = {
  terrain:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
  relief:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
  lightGray:
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
};

// no tiles outside the world (noWrap alone still requests them)
export const WORLD_TILE_BOUNDS = [
  [-85.0511, -180],
  [85.0511, 180],
];

// last zoom with real tiles worldwide (sampled; esri returns a placeholder past this)
export const BASEMAP_MAX_ZOOM = { terrain: 10, relief: 10, lightGray: 10 };
export const OSM_MAX_ZOOM = 10;

export const BASEMAP_OPTIONS = {
  attribution: '',
  noWrap: true,
  bounds: WORLD_TILE_BOUNDS,
  zIndex: 0, // stays under data layer
};

// which one where, change here
export const HOME_BASEMAP = 'relief'; // MyMap, main page
export const MAP_BASEMAP = 'relief'; // MapPage default
export const VECTOR_BASEMAP = {
  // vectorId: 'relief',
};

export const mapBasemapKey = (vectorId) =>
  VECTOR_BASEMAP[vectorId] || MAP_BASEMAP;
