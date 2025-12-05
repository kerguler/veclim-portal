import adultsandfly1 from 'assets/icons/map-page-right-menu/png/mosquito-3-aprdec-32px.png';
const tileBase = process.env.REACT_APP_BASE_URL;

export const tileIconsSand = [
  {
    key: 'papatasi_V2511A',
    colkey: 'papatasi_V2511A',

    label: 'Ph. papatasi female abundance ratio',
    icon: adultsandfly1,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2511A&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 11,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015).
        </p>
      </>
    ),
  }
];
