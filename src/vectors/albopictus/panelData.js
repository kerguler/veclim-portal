import seasonal from 'assets/icons/map-page-right-menu/png/019-cloud-32px.png';
import adult from 'assets/icons/map-page-right-menu/png/adult-32px.png';
import larva from 'assets/icons/map-page-right-menu/png/larva-32px.png';
import virus from 'assets/icons/map-page-right-menu/png/013-coronavirus-32px.png';
import impact from 'assets/icons/map-page-right-menu/png/015-heart rate-32px.png';
import model from 'assets/icons/map-page-right-menu/png/019-refresh-32px.png';
import settingsIcon from 'assets/icons/map-page-right-menu/svg/plot-icon.svg';
import info from 'assets/icons/map-page-right-menu/png/008-files-32px.png';
import { ChartIndicators } from '../../components/ChartIndicators/CharterIndicators';
import TileSelector from '../../components/TileSelector/TileSelector';
import suser from 'assets/icons/map-page-right-menu/png/007-arrows-32px.png';
import menuIcon from 'assets/icons/map-page-right-menu/png/menu-32px.png';
import OptionsPanel from 'components/optionsPanel/OptionsPanel';
import ChangeMapPanel from '../../components/vectorSelection/ChangeMapPanel/ChangeMapPanel';
import SettingsPanel from 'components/panel/SettingsPanel';
import { tileIcons } from './tileIcons';
import AlboParams from 'components/AlboParams/AlboParams';
export const panelData = [
  {
    key: 'menu_icon',
    icon: menuIcon,
    hasPanels: false,
    panelList: [],
    hasSubMenus: true,
    subMenuOpenDirection: 'down',
    subMenuIndex: 0,
  },
  {
    key: 'secondary_menu_icon',
    icon: menuIcon,
    rotate: 90,
    hasSubMenus: true,
    subMenuOpenDirection: 'down',
    initialOpen: true,
    selfClose: true,
  },
  {
    icon: info,
    key: 'location_info',
    hasPanels: true,
  },
  {
    icon: seasonal,
    key: 'seasonal_profile',
    hasPanels: true,
  },
  {
    key: 'graphics_menu_icon',
    hasSubMenus: true,
    subMenuOpenDirection: 'right',
    submenuIndex: 1,
    icon: settingsIcon,
  },
  {
    key: 'larva_forecast',
    icon: larva,
    hasPanels: true,
  },

  {
    icon: adult,
    key: 'activity_forecast',
    hasPanels: true,
  },
  {
    key: 'location_info_panel',
    decade: '',
    icon: info,
    chartParameters: {},
    positionDependent: true,
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
    key: 'seasonal_profile_panel',
    icon: seasonal,
    chartParameters: {
      chartType: 'rechart',
      initialSetting: 'meteo-ts',
      years: '2010-2019',
      mixedKeys: [
        {
          key: 'g1',
          levels: ['meteo-ts', '2010-2019', 'atemp'],
        },
        {
          key: 'g2',
          levels: ['meteo-ts', '2010-2019', 'rehum'],
        },
        {
          key: 'g3',
          levels: ['meteo-ts', '2010-2019', 'precp'],
        },
      ],
      sliceInfo: {
        g1: {
          sliceLabels: {
            slice0: 'Temperature (°C)',
          },
          sliceColors: {
            slice0: '#F15A48',
          },
        },
        g2: {
          sliceLabels: { slice0: 'Rel. humidity (%)' },
          sliceColors: { slice0: '#50C0AD' },
        },
        g3: {
          sliceLabels: { slice0: 'Precipitation (mm)' },
          sliceColors: { slice0: '#1B3958' },
        },
      },
      plottedKeys: ['atemp', 'rehum', 'precp'],
      colors: ['#F15A48', '#50C0AD', '#1B3958'],
      horizontalAxis: 'date',
      labels: ['Temperature (°C)', 'Rel. humidity (%)', 'Precipitation (mm)'],
    },

    content: (
      <div className="text-area">
        <h1>Seasonal Profile</h1>
        <div>
          <p>
            Decadal averages (2010-2020) of some of the environmental variables
            obtained from the{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels"
            >
              ERA5
            </a>{' '}
            dataset.
          </p>
        </div>
      </div>
    ),
  },
  {
    key: 'larva_forecast_panel',
    chartParameters: {
      chartType: 'rechart',
      mixedKeys: [
        {
          key: 'g2',
          levels: ['sim-ts', '2010-2019', 'coln2'],
        },
        {
          key: 'g1',
          levels: ['fcast-ts', 'ecmwf', 'coln2'],
        },
      ],
      sliceInfo: {
        g2: {
          sliceLabels: { slice0: 'Decadal average' },
          sliceColors: { slice0: '#1B3958' },
        },
        g1: {
          sliceLabels: {
            slice0: 'This year',
            slice1: 'Overlap',

            slice2: 'Forecast',
          },
          sliceColors: {
            slice0: '#50C0AD',
            slice1: 'orange',
            slice2: '#F15A48',
          },
        },
      },
      plottedKeys: ['g1', 'g2'],
      colors: ['#1B3958', '#1B3958'],
      horizontalAxis: 'date',
      lineSlice: ['g1'],
      labels: ['Larva forecast', 'Decadal average'],
      sliceLabels: ['This year', 'Overlap', 'Forecast'],
      sliceColors: ['#50C0AD', 'orange', '#F15A48'],
    },
    icon: larva,
    content: (
      <div className="text-area">
        <h1>Larva Forecast</h1>
        <div>
          <p>
            Predicted number of larvae in a typical breeding site compared with
            the decadal averages.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: [0, 2, 1, 1],
    key: 'activity_forecast_panel',

    chartParameters: {
      mixedKeys: [
        {
          key: 'g2',
          levels: ['sim-ts', '2010-2019', 'colegg'],
        },
        {
          key: 'g1',
          levels: ['fcast-ts', 'ecmwf', 'colegg'],
        },

        {
          key: 'g3',
          levels: ['surv-ts', 'vabun'], // "v015"],
        },
        {
          key: 'g4',
          levels: ['surv-ts', 'aimsurv'],
        },
        {
          key: 'g5',
          levels: ['surv-ts', 'vbase'],
        },
      ],
      sliceInfo: {
        g2: {
          sliceLabels: { slice0: 'Decadal activity' },
          sliceColors: { slice0: '#1B3958' },
        },
        g1: {
          sliceLabels: {
            slice0: 'This year',
            slice1: 'Overlap',
            slice2: 'Forecast',
          },
          sliceColors: {
            slice0: '#50C0AD',
            slice1: 'orange',
            slice2: '#F15A48',
          },
        },

        g3: {
          sliceLabels: { slice0: 'VectAbundance' },
          sliceColors: { slice0: '#167997' },
        },
        g4: {
          sliceLabels: { slice0: 'AIMsurv' },
          sliceColors: { slice0: '#167997' },
        },
        g5: {
          sliceLabels: { slice0: 'VectorBase' },
          sliceColors: { slice0: '#167997' },
        },
      },

      orientation: { g3: 'right', g4: 'right', g5: 'right' },
      lineStyle: { g3: 'dots', g4: 'dots', g5: 'dots' },
      colors: ['#1B3958', '#1B3958', '#167997', '#167997', '#167997'],
      horizontalAxis: 'date',
      labels: [
        'Activity forecast',
        'Decadal activity',
        'VectAbundance',
        'AIMsurv',
        'VectorBase',
      ],
      sliceLabels: ['This year', 'Overlap', 'Forecast'],
      sliceColors: ['#50C0AD', 'orange', '#F15A48'],
    },
    icon: adult,
    content: (
      <div className="text-area">
        <h1>Activity Forecast</h1>
        <div>
          <p>
            Daily number of eggs laid by the Asian tiger mosquito as a proxy to
            biting activity.
          </p>
        </div>
      </div>
    ),
  },
  // SIMULATION   ACTIVITY
  {
    id: [0, 2, 1, 0],
    key: 'simulation_activity_graph_panel',
    simulation: true,
    chartParameters: {
      mixedKeys: [
        {
          key: 'g1',
          levels: ['fcast-ts', 'ecmwf', 'colegg'],
        },
        {
          key: 'g2',
          levels: ['ts', 'fcast-ts', 'ecmwf', 'colegg'],
        },
      ],

      horizontalAxis: 'date',
      sliceInfo: {
        g1: {
          sliceLabels: {
            slice0: 'This year (sim)',
            slice1: 'Overlap (sim) ',
            slice2: 'Forecast (sim)',
          },
          sliceColors: {
            slice0: '#1c2833',
            slice1: '#af7ac5',
            slice2: '#d98880',
          },
        },
        g2: {
          sliceLabels: {
            slice0: 'This year',
            slice1: 'Overlap',
            slice2: 'Forecast',
          },
          sliceColors: {
            slice0: '#50C0AD',
            slice1: 'orange',
            slice2: '#F15A48',
          },
        },
      },
    },
    content: (
      <div className="text-area">
        <h1>Activity Simulation Data </h1>
        <div>
          <p>Here we will display simulation graphics</p>{' '}
        </div>
      </div>
    ),
  },
  {
    decade: '2090-2100',
    key: 'activity_projections_panel',
    chartParameters: {
      chartType: 'rechart',
      mixedKeys: [
        {
          key: 'g3',
          levels: ['sim-ts', '2010-2019', 'colegg'],
        },
        {
          key: 'g4',
          levels: ['sim-ts', '1980-1989', 'colegg'],
        },
        {
          key: 'g1',
          levels: ['fcast-ts', 'nasa', 'ssp245', 'colegg'],
        },
        {
          key: 'g2',
          levels: ['fcast-ts', 'nasa', 'ssp585', 'colegg'],
        },
      ],
      sliceInfo: {
        g3: {
          sliceColors: { slice0: '#1B3958' },
          sliceLabels: { slice0: '2010-2020' },
        },
        g4: {
          sliceColors: { slice0: '#50C0AD' },
          sliceLabels: { slice0: '1980-1990' },
        },
        g1: {
          sliceColors: { slice0: 'orange' },
          sliceLabels: { slice0: 'SSP2-4.5' },
        },
        g2: {
          sliceColors: { slice0: '#F15A48' },
          sliceLabels: { slice0: 'SSP5-8.5' },
        },
      },
      plottedKeys: ['g1', 'g2', 'g3', 'g4'],
      colors: ['#1B3958', '#50C0AD', 'orange', '#F15A48'],
      sliceColors: ['#50C0AD', 'orange', '#F15A48'],
      horizontalAxis: 'date',
      lineSlice: [],
      labels: ['2010-2020', '1980-1990', 'SSP2-4.5', 'SSP5-8.5'],
    },
    icon: adult,
    content: (
      <div className="text-area">
        <h1>Activity Projections</h1>
        <div>
          <p>
            Daily number of eggs in 2010-2020, compared to the historical
            (1980-1990) and projected future (2090-2100) decadal averages. SSP
            2-4.5 and SSP 5-8.5 represent the optimistic and pessimistic
            scenarios, respectively.
          </p>
        </div>
      </div>
    ),
  },
  {
    key: 'outbreak_forecast',
    icon: virus,
    hasPanels: true,
  },
  {
    key: 'outbreak_forecast_panel',
    icon: virus,
    chartParameters: {
      xbrushStart: -6,
      xbrushEnd: 3,
      mixedKeys: [
        {
          key: 'g2',
          levels: ['sim-ts', '2010-2019', 'pouts'],
        },
        {
          key: 'g1',
          levels: ['fcast-ts', 'ecmwf', 'pouts'],
        },
      ],
      sliceInfo: {
        g2: {
          sliceLabels: { slice0: 'Decadal average' },
          sliceColors: { slice0: '#1B3958' },
        },
        g1: {
          sliceLabels: {
            slice0: 'This year',
            slice1: 'Overlap',
            slice2: 'Forecast',
          },
          sliceColors: {
            slice0: '#50C0AD',
            slice1: 'orange',
            slice2: '#F15A48',
          },
        },
      },

      horizontalAxis: 'date',
      labels: ['Risk forecast', 'Decadal average'],
    },
    content: (
      <div className="text-area">
        <h1>Outbreak Forecast</h1>
        <div>
          <p>
            The likeliness of an outbreak in response to an imported infectious
            case according to the{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://doi.org/10.1371/journal.pone.0174293"
            >
              Chikungunya model
            </a>
            .
          </p>
          <p>
            We introduce an infectious case in a population of 4000. Outbreak{' '}
            <strong>risk</strong> is the number of times (out of 100) when an
            autochthonous case is observed.
          </p>
        </div>
      </div>
    ),
  },
  // SIMULATION OUTBREAK
  {
    id: [0, 2, 2, 0],
    key: 'simulation_outbreak_graph_panel',
    simulation: true,
    chartParameters: {
      mixedKeys: [
        {
          key: 'g1',
          levels: ['fcast-ts', 'ecmwf', 'pouts'],
        },
        {
          key: 'g2',
          levels: ['ts', 'fcast-ts', 'ecmwf', 'pouts'],
        },
      ],

      horizontalAxis: 'date',
      sliceInfo: {
        g1: {
          sliceLabels: {
            slice0: 'This year (sim)',
            slice1: 'Overlap (sim) ',
            slice2: 'Forecast (sim)',
          },
          sliceColors: {
            slice0: '#1c2833',
            slice1: '#af7ac5',
            slice2: '#d98880',
          },
        },
        g2: {
          sliceLabels: {
            slice0: 'This year',
            slice1: 'Overlap',
            slice2: 'Forecast',
          },
          sliceColors: {
            slice0: '#50C0AD',
            slice1: 'orange',
            slice2: '#F15A48',
          },
        },
      },
    },
    content: (
      <div className="text-area">
        <h1>Outbreak Simulation Data </h1>
        <div>
          <p>Here we will display simulation graphics</p>{' '}
        </div>
      </div>
    ),
  },

  {
    id: [0, 2, 2, 1],
    decade: '2090-2100',
    key: 'outbreak_projections_panel',
    chartParameters: {
      chartType: 'rechart',
      initialSetting: 'fcast-ts',
      years: '2090-2100',
      mixedKeys: [
        {
          key: 'g1',
          levels: ['sim-ts', '2010-2019', 'pouts'],
        },
        {
          key: 'g2',
          levels: ['sim-ts', '1980-1989', 'pouts'],
        },
        {
          key: 'g3',
          levels: ['fcast-ts', 'nasa', 'ssp245', 'pouts'],
        },
        {
          key: 'g4',
          levels: ['fcast-ts', 'nasa', 'ssp585', 'pouts'],
        },
      ],
      sliceInfo: {
        g1: {
          sliceLabels: { slice0: '2010-2020' },
          sliceColors: { slice0: '#1B3958' },
        },
        g2: {
          sliceLabels: { slice0: '1980-1990' },
          sliceColors: { slice0: '#50C0AD' },
        },
        g3: {
          sliceLabels: { slice0: 'SSP2-4.5' },
          sliceColors: { slice0: 'orange' },
        },
        g4: {
          sliceLabels: { slice0: 'SSP5-8.5' },
          sliceColors: { slice0: '#F15A48' },
        },
      },
      horizontalAxis: 'date',
      labels: ['2010-2020', '1980-1990', 'SSP2-4.5', 'SSP5-8.5'],
    },
    content: (
      <div className="text-area">
        <h1>Outbreak Projections</h1>
        <div>
          <p>
            Average outbreak risk in 2010-2020, compared to the historical
            (1980-1990) and projected future (2090-2100) decadal averages. SSP
            2-4.5 and SSP 5-8.5 represent the optimistic and pessimistic
            scenarios, respectively.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: [0, 2, 3],
    key: 'impact_forecast',
    icon: impact,
    hasPanels: true,
  },
  {
    id: [0, 2, 3, 0],
    key: 'impact_forecast_panel',
    icon: impact,

    chartParameters: {
      xinit: { date0: 15, date1: 125 },
      mixedKeys: [
        {
          key: 'g2',
          levels: ['sim-ts', '2010-2019', 'iouts'],
        },
        {
          key: 'g1',
          levels: ['fcast-ts', 'ecmwf', 'iouts'],
        },
      ],
      sliceInfo: {
        g2: {
          sliceLabels: { slice0: 'Decadal average' },
          sliceColors: { slice0: '#1B3958' },
        },
        g1: {
          sliceLabels: {
            slice0: 'This year',
            slice1: 'Overlap',
            slice2: 'Forecast',
          },
          sliceColors: {
            slice0: '#50C0AD',
            slice1: 'orange',
            slice2: '#F15A48',
          },
        },
      },
      horizontalAxis: 'date',
      labels: ['Impact forecast', 'Decadal average'],
      sliceLabels: ['This year', 'Overlap', 'Forecast'],
      sliceColors: ['#50C0AD', 'orange', '#F15A48'],
    },
    content: (
      <div className="text-area">
        <h1>Impact Forecast</h1>
        <div>
          <p>
            The expected impact of an imported infectious case according to the{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://doi.org/10.1371/journal.pone.0174293"
            >
              Chikungunya model
            </a>
            .
          </p>
          <p>
            We introduce an infectious case in a population of 4000. The{' '}
            <strong>impact</strong> is the average number of autochthonous cases
            in 60 days.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: [0, 2, 1, 0],
    key: 'simulation_impact_graph_panel',
    simulation: true,
    chartParameters: {
      chartType: 'rechart',
      years: 'ecmwf',

      mixedKeys: [
        {
          key: 'g1',
          levels: ['fcast-ts', 'ecmwf', 'iouts'],
        },
        {
          key: 'g2',
          levels: ['ts', 'fcast-ts', 'ecmwf', 'iouts'],
        },
      ],

      horizontalAxis: 'date',
      sliceInfo: {
        g1: {
          sliceLabels: {
            slice0: 'This year (sim)',
            slice1: 'Overlap (sim) ',
            slice2: 'Forecast (sim)',
          },
          sliceColors: {
            slice0: '#1c2833',
            slice1: '#af7ac5',
            slice2: '#d98880',
          },
        },
        g2: {
          sliceLabels: {
            slice0: 'This year',
            slice1: 'Overlap',
            slice2: 'Forecast',
          },
          sliceColors: {
            slice0: '#50C0AD',
            slice1: 'orange',
            slice2: '#F15A48',
          },
        },
      },
    },
    content: (
      <div className="text-area">
        <h1>Impact Simulation Data </h1>
        <div>
          <p>Here we will display simulation graphics</p>{' '}
        </div>
      </div>
    ),
  },
  {
    id: [0, 2, 3, 1],
    decade: '2090-2100',
    key: 'impact_projections_panel',
    chartParameters: {
      chartType: 'rechart',
      initialSetting: 'fcast-ts',
      years: '2090-2100',
      mixedKeys: [
        {
          key: 'g1',
          levels: ['sim-ts', '2010-2019', 'iouts'],
        },
        {
          key: 'g2',
          levels: ['sim-ts', '1980-1989', 'iouts'],
        },
        {
          key: 'g3',
          levels: ['fcast-ts', 'nasa', 'ssp245', 'iouts'],
        },
        {
          key: 'g4',
          levels: ['fcast-ts', 'nasa', 'ssp585', 'iouts'],
        },
      ],

      sliceInfo: {
        g1: {
          sliceLabels: { slice0: '2010-2020' },
          sliceColors: { slice0: '#1B3958' },
        },
        g2: {
          sliceLabels: { slice0: '1980-1990' },
          sliceColors: { slice0: '#50C0AD' },
        },
        g3: {
          sliceLabels: { slice0: 'SSP2-4.5' },
          sliceColors: { slice0: 'orange' },
        },
        g4: {
          sliceLabels: { slice0: 'SSP5-8.5' },
          sliceColors: { slice0: '#F15A48' },
        },
      },
      labels: ['2010-2020', '1980-1990', 'SSP2-4.5', 'SSP5-8.5'],
      colors: ['#1B3958', '#50C0AD', 'orange', '#F15A48'],

      horizontalAxis: 'date',
    },
    icon: impact,
    content: (
      <div className="text-area">
        <h1>Impact Projections</h1>
        <div>
          <p>
            Average importation impact in 2010-2020, compared to the historical
            (1980-1990) and projected future (2090-2100) decadal averages. SSP
            2-4.5 and SSP 5-8.5 represent the optimistic and pessimistic
            scenarios, respectively.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: [2, 4],
    key: 'tile_selector',
    icon: suser,
    hasPanels: true,
  },
  {
    id: [0, 3, 0],
    key: 'tile_selector_panel',
    chartParameters: {},
    forgetOpen: true,
    icon: suser,
    content: <TileSelector tileIcons={tileIcons}></TileSelector>,
  },
  {
    id: [0, 4],
    key: 'vector_selector',
    icon: model,
    hasPanels: true,
  },
  {
    id: [0, 4, 0],
    key: 'vector_selector_panel',
    chartParameters: {},
    forgetOpen: true,

    icon: model,
    content: (
      <>
        <ChangeMapPanel></ChangeMapPanel>
        <OptionsPanel></OptionsPanel>
      </>
    ),
  },
  {
    id: [0, 6],
    key: 'settings_adjustment',
    icon: settingsIcon,
    hasPanels: true,
  },

  {
    key: 'settings_adjustment_panel',
    id: [0, 6, 0],
    chartParameters: {},
    forgetOpen: true,

    content: (
      <div className="text-area">
        <h1>Settings Panel </h1>

        <SettingsPanel />
        {/* <CoordinatePicker /> */}
      </div>
    ),
  },
  {
    id: [0, 5],
    key: 'simulation_adjustment',
    icon: seasonal,
    hasPanels: true,
  },

  {
    id: [0, 5],
    key: 'simulation_adjustment_panel',
    icon: seasonal,
    hasPanels: true,

    chartParameters: {},
    content: (
      <div className="text-area">
        <div>
          <AlboParams />
          {/* <CoordinatePicker /> */}
        </div>
      </div>
    ),
  },
];
