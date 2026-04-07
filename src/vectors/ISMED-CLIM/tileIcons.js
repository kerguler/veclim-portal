import adultsandfly from 'assets/icons/map-page-right-menu/png/mosquito-3-32px.png';
import XLink from 'components/xlink';
const tileBase = process.env.REACT_APP_BASE_URL;

export const tileIcons = [
  {
    key: 'papatasi_V2511A_PRT_surv',
    colkey: 'papatasi_V2511A_PRT_surv',

    label: 'Sand fly activity',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2511A_PRT_surv&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 11,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015)
          simulated by using the V2511A model. This work has been developed in
          the framework of the{' '}
          <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_V2511A_PRT_newegg',
    colkey: 'papatasi_V2511A_PRT_newegg',

    label: 'Sand fly activity',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2511A_PRT_newegg&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 11,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015)
          simulated by using the V2511A model. This work has been developed in
          the framework of the{' '}
          <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_V2511A_PRT_season_length',
    colkey: 'papatasi_V2511A_PRT_season_length',

    label: 'Sand fly season length (in weeks)',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2511A_PRT_season_length&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 11,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015)
          simulated by using the V2511A model. This work has been developed in
          the framework of the{' '}
          <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_V2511A_PRT_season_num',
    colkey: 'papatasi_V2511A_PRT_season_num',

    label: 'Sand fly season number of seasons (in weeks)',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2511A_PRT_season_num&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 11,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015)
          simulated by using the V2511A model. This work has been developed in
          the framework of the{' '}
          <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_V2511A_PRT_peak_num',
    colkey: 'papatasi_V2511A_PRT_peak_num',

    label: 'Sand fly season number of peaks (in weeks)',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2511A_PRT_peak_num&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 11,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015)
          simulated by using the V2511A model. This work has been developed in
          the framework of the{' '}
          <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_V2511A_PRT_season',
    colkey: 'papatasi_V2511A_PRT_season',

    label: 'Sand fly season start (in weeks)',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2511A_PRT_season&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 11,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015)
          simulated by using the V2511A model. This work has been developed in
          the framework of the{' '}
          <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_V2511A_PRT_peak',
    colkey: 'papatasi_V2511A_PRT_peak',

    label: 'Sand fly peak activity season start (in weeks)',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2511A_PRT_peak&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 11,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015)
          simulated by using the V2511A model. This work has been developed in
          the framework of the{' '}
          <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
        </p>
      </>
    ),
  },
];
