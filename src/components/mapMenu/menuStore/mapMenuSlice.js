import { createSlice } from '@reduxjs/toolkit';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';

const mapMenuSlice = createSlice({
  name: 'mapMenu',
  initialState: {
    right: {
      directInit: false,
      panelOpen: false,
      mapMenuOpen: false,
      displayedPanelID: 0,
      interferePanelStyle: {},
      displaySimulationPanel: null,
      shimmered: false,

      directMap: { lon: null, lat: null, display: -2 },
      directInitError: { isError: false, message: '', type: '' },
      panel: { panelInterfere: 0, panelTop: 0 },
      chart: {
        chartParameters: {},
        shimmer: null,
        dataArrived: false,
        dates: { first: null, last: null },
        plotReady: false,
        requestPlot: false,
        sliders: { slider1: { enabled: true, value: 50 } },
        brush: {
          brushRange: { startIndex: null, endIndex: null },
          brushDatay: { min: 0, max: 0 },
          brushData: { min: 0, max: 0 },
        },

        messenger: { message: null, id: null, isError: false },
      },
    },
    left: {
      panelLevel: { path: [0, 0], level: 0, key: 'menu_icon' },
      panel: { panelInterfere: 0, panelTop: 0 },
      shimmered: {},
      directInit: false,
      panelOpen: false,
      mapMenuOpen: false,
      interferePanelStyle: {},
      displaySimulationPanel: '',
      displayedPanelID: 0,
      directMap: { lon: null, lat: null, display: -2 },
      directInitError: { isError: false, message: '', type: '' },
      openItems: { menu_icon: true },
      chart: {
        chartParameters: {},
        shimmer: {},
        dataArrived: false,
        brush: {
          brushRange: { startIndex: null, endIndex: null },
          brushDatay: {
            left: { min: 0, max: 0 },
            right: { min: 0, max: 0 },
          },
          yaxisInfo: {},
          brushData: { min: 0, max: 0 },
        },
        sliders: { slider1: { enabled: true, value: 50 } },

        dates: { first: null, last: null },
        plotReady: false,
        messenger: { message: null, id: null, isError: false },
      },
    },
  },

  reducers: {
    setYaxisInfo(state, action) {
      const { direction, value } = action.payload;
      state[direction].chart.brush.yaxisInfo = value;
    },
    setBrushDatayLeft(state, action) {
      state.left.chart.brush.brushDatay.left = action.payload;
    },
    setBrushDatayRight(state, action) {
      state.left.chart.brush.brushDatay.right = action.payload;
    },

    setShimmered(state, action) {
      const { direction, value } = action.payload;
      state[direction].shimmered = value;
    },
    setDisplaySimulationPanel(state, action) {
      const { direction, value } = action.payload;
      state[direction].displaySimulationPanel = value;
    },
    setPanelTop(state, action) {
      const { direction, value } = action.payload;
      state[direction].panel.panelTop = value;
    },

    appendToPlottedKeysChartParameters(state, action) {
      const { direction, value } = action.payload;
      state[direction].chart.chartParameters.plottedKeys.push(value);
    },
    appendToLabelsChartParameters(state, action) {
      const { direction, value } = action.payload;
      state[direction].chart.chartParameters.labels = [
        ...state.fetcherStates.menu[direction].chart.chartParameters.labels,
        ...value,
      ];
    },
    appendToColorsChartParameters(state, action) {
      const { direction, value } = action.payload;

      state[direction].chart.chartParameters.colors = [
        ...state[direction].chart.chartParameters.colors,
        ...value,
      ];
    },
    spliceChartParametersForSlices(state, action) {
      const { direction, value } = action.payload;
      let loc = state[direction].chart.chartParameters.plottedKeys.indexOf(
        state[direction].chart.chartParameters.lineSlice[value]
      );
      state[direction].chart.chartParameters.plottedKeys.splice(loc, 1);
      state[direction].chart.chartParameters.labels.splice(loc, 1);
      state[direction].chart.chartParameters.colors.splice(loc, 1);
    },
    setChartParameters(state, action) {
      const { direction, value } = action.payload;
      state[direction].chart.chartParameters = value;
    },
    setPanelInterfere(state, action) {
      const { direction, value } = action.payload;
      state[direction || 'left'].panel.panelInterfere = value;
    },
    setBrushRange(state, action) {
      const { direction, value } = action.payload;
      state[direction].chart.brush.brushRange = value;
    },
    setBrushData(state, action) {
      const { direction, value } = action.payload;
      state[direction].chart.brush.brushData = value;
    },
    setBrushDatay(state, action) {
      const { direction, value } = action.payload;
      state[direction].chart.brush.brushDatay = value;
    },

    setInterferePanelStyle(state, action) {
      const { direction, value } = action.payload;
      state[direction].interferePanelStyle = value;
    },
    setOpenItems(state, action) {
      state.left.openItems = action.payload;
    },
    setPanelLevel(state, action) {
      state.left.panelLevel = action.payload;
    },

    setShimmer(state, action) {
      const { direction, value } = action.payload;
      state[direction].chart.shimmer = value;
    },

    setDataArrived(state, action) {
      const { direction, value } = action.payload;
      state[direction || 'left'].chart.dataArrived = value;
    },

    setMessenger(state, action) {
      const { direction, value } = action.payload;
      state[direction || 'left'].chart.messenger = value;
    },

    setSimSlider1Enabled(state, action) {
      const { direction, value } = action.payload;
      state[direction].chart.sliders.slider1.enabled = value;
    },

    setChartDates(state, action) {
      const { direction, value } = action.payload;
      state[direction].chart.dates = value;
    },

    setPlotReady(state, action) {
      const { direction, value } = action.payload;
      state[direction].chart.plotReady = value;
    },

    setAlboRequestPlot(state, action) {
      state.right.chart.requestPlot = action.payload;
    },
    setSimulationParameterSlider1(state, action) {
      const { direction, value } = action.payload;
      state[direction].chart.sliders.slider1.value = value;
    },

    setDirectMap(state, action) {
      const { direction, value } = action.payload;
      state[direction].directMap = value;
    },
    setDirectInit(state, action) {
      const { direction, value } = action.payload;
      state[direction].directInit = value;
    },
    setDirectInitError(state, action) {
      const { direction, value } = action.payload;
      state[direction].directInitError = value;
    },
    setPanelOpen(state, action) {
      const { direction, value } = action.payload;
      state[direction].panelOpen = value;
    },
    setMapMenuOpen(state, action) {
      const { direction, value } = action.payload;
      state[direction].mapMenuOpen = value;
    },
    setDisplayedPanelID(state, action) {
      const { direction, value } = action.payload;
      state[direction].displayedPanelID = value;
    },
  },
});

export const {
  setAlboRequestPlot,
  setBrushData,
  setBrushDatay,
  setBrushDatayLeft,
  setBrushDatayRight,
  setBrushRange,
  setChartDates,
  setChartParameters,
  setDataArrived,
  setDirectInit,
  setDirectInitError,
  setDirectMap,
  setDisplaySimulationPanel,
  setDisplayedPanelID,
  setInterferePanelStyle,
  setMapMenuOpen,
  setMessenger,
  setOpenItems,
  setPanelInterfere,
  setPanelLevel,
  setPanelOpen,
  setPlotReady,
  setShimmer,
  setPanelTop,
  setShimmered,
  setSimSlider1Enabled,
  setSimulationParameterSlider1,
  setYaxisInfo,
  appendToColorsChartParameters,
  appendToLabelsChartParameters,
  appendToPlottedKeysChartParameters,
  spliceChartParametersForSlices,
} = mapMenuSlice.actions;
export const mapMenuReducer = mapMenuSlice.reducer;
