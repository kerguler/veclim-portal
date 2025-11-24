import React from 'react';
import { tileIcons } from './tileIcons';
import { panelData } from './panelData';
import { ALB_MENU } from './menu';
import { tileIconRowHeadings } from './tileIconsRowHeadings';
import tileIconMoz from 'assets/icons/map-page-right-menu/png/adult-32px.png';
import { methodsPage } from './methodsPage';
import { indicators } from './indicators';
import { timeseries } from './timeSeries';

const moduleObj = {
  id: 'albopictus',
  meta: {
    icon: tileIconMoz,
    description: (
      <p>
        The model of the Asian tiger mosquito (<i>Ae. albopictus</i>) and
        disease (CHIKV/DENV/ZIKV) transmission
      </p>
    ),
    // default route for this vector
    route: '/MapPage',
    // if you still rely on `session`
    session: 'albopictus',
    methods: {
      route: '/Methods/albopictus',
      label: 'Tiger Mosquito',
    },
  },
  methodsPage,
  tileIcons,
  panelData,
  menu: ALB_MENU,
  tileIconRowHeadings,
  indicators,
  timeseries,
  map: {
    defaultBounds: 'world',
    switchBounds: 'cyprus',
    defaultCenter: { lat: 0, lng: 0 },
    defaultZoom: 1,
    switchCenter: { lat: 35.1, lng: 33.33 },
    switchZoom: 8,
  },
  transition(
    fromId,
    {
      currentCenter,
      currentZoom,
      defaultBoundsKey,
      defaultCenter,
      defaultZoom,
      getVectorConfig,
    }
  ) {
    // Only special-case papatasi -> albopictus
    if (fromId !== 'papatasi') {
      return { keepView: true }; // use default switchBounds/switchCenter/switchZoom
    }

    return null;
  },
  sampling: {
    round(lat, lng) {
      const latR = Math.round(lat / 0.25) * 0.25;
      const lngR = Math.round(lng / 0.25) * 0.25;
      return { lat: latR, lng: lngR, res: [0.125, 0.125] };
    },
  },

  defaults: {
    tileArray: ['colegg'],
    firstPanelKey: 'location_info_panel',
  },
};

export default moduleObj;
