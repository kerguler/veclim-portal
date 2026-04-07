import adultsandfly from 'assets/icons/map-page-right-menu/png/mosquito-3-32px.png';
import model from 'assets/icons/map-page-right-menu/png/019-refresh-32px.png';
import info from 'assets/icons/map-page-right-menu/png/008-files-32px.png';
import ChartIndicators from 'components/ChartIndicators/CharterIndicators';
import TileSelector from '../../components/TileSelector/TileSelector';
import suser from 'assets/icons/map-page-right-menu/png/007-arrows-32px.png';
import menuIcon from 'assets/icons/map-page-right-menu/png/menu-32px.png';
import OptionsPanel from 'components/optionsPanel/OptionsPanel';
import ChangeMapPanel from '../../components/vectorSelection/ChangeMapPanel/ChangeMapPanel';
import { tileIcons } from './tileIcons';
import XLink from 'components/xlink';

export const panelData = [
  {
    id: [1, 1],
    key: 'menu_icon',
    parent: [],
    icon: menuIcon,
    hasPanels: false,
    panelList: [],
    hasSubMenus: true,
    subMenuOpenDirection: 'down',
    subMenuIndex: 0,
  },
  {
    id: 0,
    icon: info,
    hasPanels: true,
    key: 'location_info',
  },
  {
    label: 'Location Information',
    key: 'location_info_panel',
    chartParameters: {},
    icon: info,
    content: (
      <div className="text-area">
        <h1>Location Information</h1>
        <div>
          <ChartIndicators />
        </div>
      </div>
    ),
  },
  {
    id: 1,
    key: 'sandfly_population',
    icon: adultsandfly,
  },
  {
    key: 'sandfly_population_panel',
    label: 'Sandfly Population',
    chartParameters: {
      years: 'ISMED-CLIM',
      mixedKeys: [
        {
          key: 'g1',
          levels: ['sim-ts', 'V2511A_PRT', 'newegg'],
        },
        {
          key: 'g2',
          levels: ['risk-ts', 'V2511A_PRT', 'risk'],
        },
        {
          key: 'g3',
          levels: ['surv-ts', 'adult_norm'],
        },
      ],
      sliceInfo: {
        g1: {
          sliceLabels: { slice0: 'New egg' },
          sliceColors: { slice0: '#167997' },
        },
        g2: {
          sliceLabels: { slice0: 'Risk' },
          sliceColors: { slice0: '#972516ff' },
        },
        g3: {
          sliceLabels: { slice0: 'Data' },
          sliceColors: { slice0: '#0d540aff' },
        },
      },
      horizontalAxis: 'date',
      chartType: 'rechart',
      initialSetting: 'sim-ts',
      orientation: { g2: 'right', g3: 'right' },
      plottedKeys: ['newegg', 'risk', 'adult_norm'],
      colors: ['#167997', '#1B3958', '#0d540a'],
      labels: ['New eggs', 'Category', 'Data'],
      lineStyle: { g3: 'dots' },
      lineSlice: [],
    },

    content: (
      <div className="text-area">
        <h1>Female vector abundance</h1>
        <div>
          <p>
            The number of <i>Phlebotomus papatasi</i> females averaged over the
            time period: 2011-2015. The dotted lines mark the 50% range of the
            V2511A model output. This work has been developed in the framework
            of the <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink>{' '}
            project.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    key: 'sandfly_tile_selector',

    icon: suser,
  },
  {
    key: 'sandfly_tile_selector_panel',
    label: 'Tile Selector',
    forgetOpen: true,

    chartParameters: {},
    content: <TileSelector tileIcons={tileIcons}></TileSelector>,
  },
  {
    id: 3,

    key: 'sandfly_vector_selector',
    icon: model,
  },
  {
    key: 'sandfly_vector_selector_panel',
    label: 'Vector Selector',
    forgetOpen: true,

    chartParameters: {},
    content: (
      <>
        <ChangeMapPanel></ChangeMapPanel>
        <OptionsPanel></OptionsPanel>
      </>
    ),
  },
];
