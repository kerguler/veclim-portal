import { Bologna2024_MENU } from './menu';
import { tileIconsSand as tileIcons } from './tileIcons3rdVec';
import { panelDataSand as panelData } from './panelData3rdVec';
import { tileIconRowHeadingsSand as tileIconRowHeadings } from './tileIconRowHeadings';
import tileIconFly from 'assets/icons/map-page-right-menu/png/mosquito-3-32px.png';
import { indicators } from './indicators';
import { timeseries } from './timeSeries';
import Bologna2024LeftPanel from './LeftPanel';
const colorKeys = Object.fromEntries(
  (tileIcons || []).map((t) => [t.key, t.colkey])
);

const moduleObj = {
  id: 'Bologna2024',
  meta: {
    icon: tileIconFly,
    description: <p>CSVD Bologna Workshop (September 2024)</p>,
    // this one still uses the session param
    route: '/MapPage?session=Bologna2024',
    session: 'Bologna2024',
    methods: {
      route: '/Methods/Bologna2024',
      label: 'Bologna2024',
    },
  },
  tileIcons,
  indicators,
  panelData,
  menu: Bologna2024_MENU,
  tileIconRowHeadings,
  colorKeys,
  timeseries,
  ui: { LeftPanelComponent: Bologna2024LeftPanel },
  map: {
    defaultBounds: 'italy',
    switchBounds: 'italy',
    defaultCenter: { lat: 44.5, lng: 11.3 },
    defaultZoom: 5,
    switchCenter: { lat: 44.5, lng: 11.3 },
    switchZoom: 5,
  },
  sampling: {
    round(lat, lng) {
      const latR = 0.009 + Math.round((lat - 0.009) / 0.0215) * 0.0215;
      const lngR = 0.0033 + Math.round((lng - 0.0033) / 0.0215) * 0.0215;
      return { lat: latR, lng: lngR, res: [0.0215 / 2, 0.0215 / 2] };
    },
  },
  defaults: {
    tileArray: ['Bologna2024_vabun'],
    firstPanelKey: 'location_info_panel',
  },
};

export default moduleObj;
