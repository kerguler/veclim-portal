export const indicators = {
  resolution: '0.25° x 0.25°',
  model: {
    label: 'Vector08c + CHIKV',
    url: 'https://pypi.org/project/albopictus/',
    description: null, // optional extra text
  },
  covariates: [
    {
      label: 'ERA5',
      url: 'https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels',
      note: 'historical',
    },
    {
      label: 'ECMWF-SEAS5',
      url: 'https://cds.climate.copernicus.eu/cdsapp#!/dataset/seasonal-original-single-levels',
      note: 'forecast',
    },
    {
      label: 'NEX-GDDP-CMIP6',
      url: 'https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6',
      note: 'future',
    },
  ],
  showForecastRange: true,
};
