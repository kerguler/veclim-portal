import adultsandfly from 'assets/icons/map-page-right-menu/png/mosquito-3-32px.png';
import XLink from 'components/xlink';
const tileBase = process.env.REACT_APP_BASE_URL;

export const tileIcons = [
  {
    key: 'papatasi_V2609C_PRT_newegg',
    colkey: 'papatasi_V2609C_PRT_newegg',

    label: 'Sand fly activity',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2609C_PRT_newegg&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 11,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015)
          simulated by using the V2609C model. This work has been developed in
          the framework of the{' '}
          <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_V2609C_PRT_season_length',
    colkey: 'papatasi_V2609C_PRT_season_length',

    label: 'Sand fly season length (in weeks)',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2609C_PRT_season_length&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 12,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015)
          simulated by using the V2609C model. This work has been developed in
          the framework of the{' '}
          <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_V2609C_PRT_season_num',
    colkey: 'papatasi_V2609C_PRT_season_num',

    label: 'Sand fly season number of seasons (in weeks)',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2609C_PRT_season_num&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 13,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015)
          simulated by using the V2609C model. This work has been developed in
          the framework of the{' '}
          <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_EDENext_PRT_surv',
    colkey: 'papatasi_EDENext_PRT_surv',

    label: 'Sand fly activity',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_EDENext_PRT_surv&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 14,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015)
          simulated by using the V2609C model. This work has been developed in
          the framework of the{' '}
          <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_V2609C_CERRA_newegg',
    colkey: 'papatasi_V2609C_CERRA_newegg',

    label: 'Sand fly activity',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2609C_CERRA_newegg&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 21,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015)
          simulated by using the V2609C model. This work has been developed in
          the framework of the{' '}
          <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_EDENext_CERRA_surv',
    colkey: 'papatasi_EDENext_CERRA_surv',

    label: 'Sand fly activity',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_EDENext_CERRA_surv&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 22,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015)
          simulated by using the V2609C model. This work has been developed in
          the framework of the{' '}
          <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_V2609C',
    colkey: 'papatasi_V2609C',

    label: 'Sand fly activity',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2609C&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 31,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015)
          simulated by using the V2609C model. This work has been developed in
          the framework of the{' '}
          <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_V2609C_ssp585',
    colkey: 'papatasi_V2609C_ssp585',

    label: 'Sand fly activity',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2609C_ssp585&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 32,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015)
          simulated by using the V2609C model. This work has been developed in
          the framework of the{' '}
          <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
        </p>
      </>
    ),
  }
];
