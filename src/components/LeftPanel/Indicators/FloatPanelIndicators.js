import iconTemp from 'assets/icons/C-thermometer-32px.png';
import iconPdens from 'assets/icons/humans-per-km-32px.png';
import iconRain from 'assets/icons/rain-32px.png';
import iconHum from 'assets/icons/101-humidity-32px.png';
import closePicB from 'assets/icons/flip-close.jpg';
import closePicW from 'assets/icons/flip-close-white.jpg';
import openPicB from 'assets/icons/flip-open.jpg';
import openPicW from 'assets/icons/flip-open-white.jpg';
import ChartLoadingSkeleton from 'components/skeleton/Skeleton';
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import useWindowSize from 'customHooks/useWindowSize';
import './FloatPanelIndicators.css';
import { useSelector } from 'react-redux';
import { useFetchCoordinateDataQuery } from 'store';
export function FloatPanelIndicators() {
	const position = useSelector((state) => {
		return state.fetcher.fetcherStates.map.globalPosition;
	});
	const { data, error, isFetching } = useFetchCoordinateDataQuery(
		JSON.stringify(position),
	);
	const [isFlipped, setFlip] = useState(false);
	const { webApp } = useWindowSize();
	const openPic = webApp ? openPicW : openPicB;
	const closePic = webApp ? closePicW : closePicB;
	const handleFlipOpen = (event) => {
		event.stopPropagation();
		setFlip(true);
	};
	const handleFlipClose = (event) => {
		event.stopPropagation();
		setFlip(false);
	};
	let content = (
		<div className='clim-data'>
			Ops! We do not have decadal averages of meteorological variables for
			this region.
		</div>
	);
	if (isFetching) {
		content = (
			<div className='clim-container'>
				<ChartLoadingSkeleton
					noBorder={true}
					times={4}
				></ChartLoadingSkeleton>
			</div>
		);
	} else if (error) {
		content = (
			<div className='error-message'>
				We are connecting to our servers. Please{' '}
				<a
					target='_blank'
					rel='noreferrer'
					href='mailto:k.erguler@cyi.ac.cy'
				>
					contact us
				</a>{' '}
				if nothing happens soon.
			</div>
		);
	}
	if (data && 'meteo-mean' in data && '2010-2019' in data['meteo-mean']) {
		content = (
			<>
				<img
					alt='flip-open'
					loading='lazy'
					className={isFlipped ? 'flip-open hidden' : 'flip-open'}
					src={openPic}
					onClick={handleFlipOpen}
				></img>
				<div>
					<div>
						<div className='clim-data'>
							<img
								loading='lazy'
								alt='Humans (per km^2)'
								src={iconPdens}
								className='clim-data icon'
							/>
							<p>
								{data['meteo-mean']['2010-2019'].pdens.toFixed(
									0,
								)}{' '}
								humans per km
								<sup>2</sup>
							</p>
						</div>

						<div className='clim-data'>
							<img
								loading='lazy'
								alt='Temperature (&deg;C)'
								src={iconTemp}
								className='clim-data icon'
							/>
							<p>
								{data['meteo-mean']['2010-2019'].atmin.toFixed(
									1,
								)}{' '}
								&deg;C -{' '}
								{data &&
									data['meteo-mean'][
										'2010-2019'
									].atmax.toFixed(1)}{' '}
								&deg;C
							</p>
						</div>

						<div className='clim-data'>
							<img
								loading='lazy'
								alt='Rainfall (mm)'
								src={iconRain}
								className='clim-data icon'
							/>
							<p>
								{data['meteo-mean']['2010-2019'].precp > 0
									? data['meteo-mean'][
											'2010-2019'
										].precp.toFixed(1)
									: '0.0'}{' '}
								mm
							</p>
						</div>

						<div className='clim-data'>
							<img
								loading='lazy'
								alt='Relatve humidity (%)'
								src={iconHum}
								className='clim-data icon'
							/>
							<p>
								{data['meteo-mean']['2010-2019'].rehum < 0
									? '0.0'
									: data['meteo-mean']['2010-2019'].rehum >
										  100.0
										? '100.0'
										: data['meteo-mean'][
												'2010-2019'
											].rehum.toFixed(1)}{' '}
								&#37;
							</p>
						</div>

						<p></p>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<ReactCardFlip isFlipped={isFlipped} flipDirection='vertical'>
				<div className='clim-container'>{content}</div>
				<div className='clim-container'>
					<div className='clim-info'>
						<img
							alt='flip-close'
							className='flip-close'
							src={closePic}
							onClick={handleFlipClose}
						></img>
						<h1>Decadal averages</h1>
						<p>
							These are average values of some environmental
							variables on this day. You are looking at the
							climate of your region.{' '}
							<strong>
								Try to see if it is warmer or colder than it has
								been in the last ten years!
							</strong>
						</p>
						<p>
							<strong>
								The meteorological averages are calculated from
								2010 to 2020 using the{' '}
								<a
									target='_blank'
									rel='noreferrer'
									href='https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels'
								>
									ERA5
								</a>{' '}
								dataset
							</strong>
							.
						</p>
						<p>
							The human population density is obtained from{' '}
							<a
								target='_blank'
								rel='noreferrer'
								href='https://sedac.ciesin.columbia.edu/data/set/gpw-v4-population-density-adjusted-to-2015-unwpp-country-totals-rev11'
							>
								SEDAC
							</a>{' '}
							(Gridded Population of the World, v4).
						</p>
					</div>
				</div>
			</ReactCardFlip>
		</>
	);
}
export default FloatPanelIndicators;
