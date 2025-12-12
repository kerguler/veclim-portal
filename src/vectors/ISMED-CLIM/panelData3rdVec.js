import adultsandfly from 'assets/icons/map-page-right-menu/png/mosquito-3-32px.png';
import model from 'assets/icons/map-page-right-menu/png/019-refresh-32px.png';
import info from 'assets/icons/map-page-right-menu/png/008-files-32px.png';
import  ChartIndicators  from 'components/ChartIndicators/CharterIndicators';
import TileSelector from '../../components/TileSelector/TileSelector';
import suser from 'assets/icons/map-page-right-menu/png/007-arrows-32px.png';
import menuIcon from 'assets/icons/map-page-right-menu/png/menu-32px.png';
import OptionsPanel from 'components/optionsPanel/OptionsPanel';
import ChangeMapPanel from '../../components/vectorSelection/ChangeMapPanel/ChangeMapPanel';
import { tileIconsSand } from './tileIcons3rdVec';
import XLink from 'components/xlink';

export const panelDataSand = [
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
    chartParameters: {
      years: 'ISMED-CLIM',
      mixedKeys: [
        {
          key: 'g3',
          levels: ['sim-ts', 'V2511A', 'simL'],
        },
        {
          key: 'g2',
          levels: ['sim-ts', 'V2511A', 'simM'],
        },
        {
          key: 'g1',
          levels: ['sim-ts', 'V2511A', 'simH'],
        },
      ],
      sliceInfo: {
        g3: {
          sliceLabels: { slice0: 'Q1: 25%' },
          sliceColors: { slice0: '#167997' },
        },
        g2: {
          sliceLabels: { slice0: 'Median' },
          sliceColors: { slice0: '#1B3958' },
        },
        g1: {
          sliceLabels: { slice0: 'Q3: 75%' },
          sliceColors: { slice0: '#167997' },
        },
      },
      horizontalAxis: 'date',
      chartType: 'rechart',
      initialSetting: 'sim-ts',
      plottedKeys: ['simL', 'simM', 'simH'],
      colors: ['#167997', '#1B3958', '#167997'],
      labels: ['Q1: 25%', 'Median', 'Q3: 75%'],
      lineStyle: { g1: 'dots', g3: 'dots' },
      lineSlice: [],
    },

    content: (
      <div className="text-area">
        <h1>Female vector abundance</h1>
        <div>
          <p>
            The number of <i>Phlebotomus papatasi</i> females averaged over the
            time period: 2011-2015. The dotted lines mark the 50% range of the
            V2511A model output. This work has been developed in the framework of the <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
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
    forgetOpen: true,

    chartParameters: {},
    content: <TileSelector tileIcons={tileIconsSand}></TileSelector>,
  },
  {
    id: 3,

    key: 'sandfly_vector_selector',
    icon: model,
  },
  {
    key: 'sandfly_vector_selector_panel',
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
