import { SAND_MENU } from './menu';
import { tileIconsSand as tileIcons } from './tileIconsSand';
import { panelDataSand as panelData } from './panelDataSand';
import { tileIconRowHeadingsSand as tileIconRowHeadings } from './tileIconRowHeadings';
import tileIconFly from 'assets/icons/map-page-right-menu/png/mosquito-3-32px.png';
import { methodsPageSand as methodsPage } from './methodsPage';
import { indicators } from './indicators';
import { timeseries } from './timeSeries';
import PapatasiLeftPanel from './LeftPanel';
const colorKeys = Object.fromEntries(
  (tileIcons || []).map((t) => [t.key, t.colkey])
);

const moduleObj = {
  id: 'papatasi',
  meta: {
    icon: tileIconFly,
    description: (
      <p>
        The model of sand flies (<i>Ph. papatasi</i>) in Cyprus
      </p>
    ),
    // this one still uses the session param
    route: '/MapPage?session=papatasi',
    session: 'papatasi',
    methods: {
      route: '/Methods/papatasi',
      label: 'Sand Fly',
    },
  },
  methodsPage,
  indicators,
  tileIcons,
  panelData,
  menu: SAND_MENU,
  tileIconRowHeadings,
  colorKeys,
  timeseries,
  map: {
    defaultBounds: 'cyprus',
    switchBounds: 'cyprus',
    defaultCenter: { lat: 35.1, lng: 33.33 },
    defaultZoom: 8,
    switchCenter: { lat: 35.1, lng: 33.33 },
    switchZoom: 8,
  },
  ui: { LeftPanelComponent: PapatasiLeftPanel },
  sampling: {
    round(lat, lng) {
      const latR = 0.009 + Math.round((lat - 0.009) / 0.0215) * 0.0215;
      const lngR = 0.0033 + Math.round((lng - 0.0033) / 0.0215) * 0.0215;
      return { lat: latR, lng: lngR, res: [0.0215 / 2, 0.0215 / 2] };
    },
  },
  defaults: {
    tileArray: ['papatasi_aprdec'],
    firstPanelKey: 'location_info_panel',
  },
};

export default moduleObj;
