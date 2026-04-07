import { menu } from './menu';
import { tileIcons } from './tileIcons';
import { panelData } from './panelData';
import { tileIconRowHeadings } from './tileIconRowHeadings';
import tileIconFly from 'assets/icons/map-page-right-menu/png/mosquito-3-32px.png';
import { indicators } from './indicators';
import { timeseries } from './timeSeries';
import IsmedClimLeftPanel from './LeftPanel';
const colorKeys = Object.fromEntries(
  (tileIcons || []).map((t) => [t.key, t.colkey])
);

const moduleObj = {
  id: 'ISMED-CLIM',
  meta: {
    icon: tileIconFly,
    description: (
      <p>Zoonotic disease risk assessment for the ISMED-CLIM project</p>
    ),
    // this one still uses the session param
    route: '/MapPage?session=ISMED-CLIM',
    session: 'ISMED-CLIM',
    methods: {
      route: '/Methods/ISMED-CLIM',
      label: 'ISMED-CLIM',
    },
  },
  tileIcons,
  indicators,
  panelData,
  menu: menu,
  tileIconRowHeadings,
  colorKeys,
  timeseries,
  ui: { LeftPanelComponent: IsmedClimLeftPanel },
  map: {
    defaultBounds: 'portugal',
    switchBounds: 'portugal',
    defaultCenter: { lat: 39.0, lng: -8.0 },
    defaultZoom: 6,
    switchCenter: { lat: 39.0, lng: -8.0 },
    switchZoom: 6,
  },
  sampling: {
    round(lat, lng) {
      const latR = 0.009 + Math.round((lat - 0.009) / 0.0215) * 0.0215;
      const lngR = 0.0033 + Math.round((lng - 0.0033) / 0.0215) * 0.0215;
      return { lat: latR, lng: lngR, res: [0.0215 / 2, 0.0215 / 2] };
    },
  },
  defaults: {
    tileArray: ['papatasi_V2511A_PRT_newegg'],
    firstPanelKey: 'location_info_panel',
  },
};

export default moduleObj;
