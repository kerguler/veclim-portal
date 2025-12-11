import adultsandfly from 'assets/icons/map-page-right-menu/png/mosquito-3-32px.png';
import XLink from 'components/xlink';
const tileBase = process.env.REACT_APP_BASE_URL;

export const tileIconsSand = [
  {
    key: 'papatasi_V2511A',
    colkey: 'papatasi_V2511A',

    label: 'Ph. papatasi female abundance ratio',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2511A&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 11,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015) simulated by using the V2511A model. 
          This work has been developed in the framework of the <XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink> project.
        </p>
      </>
    ),
  }
];
