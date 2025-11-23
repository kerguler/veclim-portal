import adultsandfly from 'assets/icons/map-page-right-menu/png/mosquito-3-32px.png';
import model from 'assets/icons/map-page-right-menu/png/019-refresh-32px.png';
import info from 'assets/icons/map-page-right-menu/png/008-files-32px.png';
import { ChartIndicators } from '../../components/ChartIndicators/CharterIndicators';
import TileSelector from '../../components/TileSelector/TileSelector';
import suser from 'assets/icons/map-page-right-menu/png/007-arrows-32px.png';
import menuIcon from 'assets/icons/map-page-right-menu/png/menu-32px.png';
import OptionsPanel from 'components/optionsPanel/OptionsPanel';
import ChangeMapPanel from '../../components/vectorSelection/ChangeMapPanel/ChangeMapPanel';
import { tileIconsSand } from './tileIcons3rdVec';

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
          key: 'g1',
          levels: ['sim-ts', 'ISMED-CLIM', 'simL'],
        },
        {
          key: 'g2',
          levels: ['sim-ts', 'ISMED-CLIM', 'simH'],
        },
      ],
      sliceInfo: {
        g1: {
          sliceLabels: { slice0: 'Secondary land type' },
          sliceColors: { slice0: '#F15A48' },
        },
        g2: {
          sliceLabels: { slice0: 'Primary land type' },
          sliceColors: { slice0: '#1B3958' },
        },
      },
      horizontalAxis: 'date',
      chartType: 'rechart',
      initialSetting: 'sim-ts',
      plottedKeys: ['simL', 'simH'],
      orientation: { g1: 'right' },
      colors: ['#F15A48', '#1B3958'],
      labels: ['Secondary land type', 'Primary land type'],
      lineSlice: [],
    },

    content: (
      <div className="text-area">
        <h1>Sand fly population size</h1>
        <div>
          <p>
            The number of females (normalised) for the year 2015 as simulated in{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://doi.org/10.1016/j.crpvbd.2023.100152"
            >
              Christou et al. (2023)
            </a>
            .
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
