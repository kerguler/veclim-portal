import useDirectorFun from 'customHooks/useDirectorFun';
import { useFetchTimeSeriesDataQuery } from 'store';
import { useEffect, useRef } from 'react';
import ChartCalculatorService from 'components/charts/services/ChartCalculatorService';
import { useDispatch } from 'react-redux';
import RechartsPlot from '../RechartsPlot';
import useSetDefaultCoordinates from '../customPlotterHooks/useSetDefaultCoordinates';
import ErrorComponent from '../errorComponent/ErrorComponent';
import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';
import ChartLoadingSkeleton from 'components/skeleton/Skeleton';
import { useSelector } from 'react-redux';
import { setPlotReady } from 'store';
import { setBrushRange } from 'store';
import { setMessenger } from 'store';
import { useAlboData } from 'context/AlboDataContext';
function TsRequestV2({ direction }) {
	const dispatch = useDispatch();

	const rawData = useRef({
		rawDataToPlot: {},
		data: null,
		dataToPlot: null,
	});
	let r = rawData.current;
	// This side effect arrangtes the map centers to default values
	// in case the vectorName changes
	useSetDefaultCoordinates(direction);

	const {
		mapPagePosition,
		vectorName,
		dateArray,
		chartParameters,
		plotReady,

		messenger,
	} = useDirectorFun(direction);

	const { data, error, isFetching } = useFetchTimeSeriesDataQuery({
		position: JSON.stringify(mapPagePosition),
		vectorName,
		dateArray,
	});
	const {setDataSim}=useAlboData()
	useEffect(() => {
		plotReady && dispatch(setPlotReady({ direction, value: false }));
	}, [vectorName, dispatch, setPlotReady]);

	useEffect(() => {
		let r = rawData.current;
		// console.log("in TsRequest useEffect", {
		// 	data,
		// 	isFetching,
		// 	error,
		// });
		try {
			console.log('in TsRequest useEffect', {
				data,
				isFetching,
				error,
				chartParameters,
				mapPagePosition,
			});
			if (
				!isFetching &&
				data &&
				Object.keys(chartParameters).length > 0 &&
				mapPagePosition.lat
			) {
				const { errorMessage, isError } =
					ChartCalculatorService.checkDataForMixedKeys(
						chartParameters,
						data,
						dispatch,
						setPlotReady,
						mapPagePosition,
						direction,
					);
				if (isError) {
					console.log('shouldnt have come here');
					dispatch(
						setMessenger({
							direction,
							value: { id: 0, message: errorMessage },
						}),
					);
					throw new Error(errorMessage);
				}
				r.data = data;
				r.dataToPlot = {};
				r.rawDataToPlot = {};
				ChartCalculatorService.createDateArray(
					rawData,
					chartParameters,
				);
				ChartCalculatorService.handleMixedKeys(
					rawData,
					chartParameters,
				);
				ChartCalculatorService.handleSlices(rawData, chartParameters);
				dispatch(setPlotReady({ direction, value: true }));
				dispatch(
					setMessenger({
						direction,
						value: { id: null, message: null, isError: false },
					}),
				);
				dispatch(
					setBrushRange({
						direction,
						value: {
							startIndex: 0,
							endIndex: r.dataToPlot.length - 1,
						},
					}),
				);
			} else {
				console.log('no data or no chartparameters');
				dispatch(setPlotReady({ direction, value: false }));
				mapPagePosition.lat &&
					dispatch(
						setMessenger({
							direction,
							value: {
								...messenger,
								message:
									'Data is not available yet. Please click on the Map',
							},
						}),
					);
			}
		} catch (err) {
			console.log('in catch block', err);
			dispatch(
				setMessenger({
					direction,
					value: {
						...messenger,
						message: err.message,
					},
				}),
			);
		}
	}, [
		chartParameters,
		data,
		dispatch,
		error,
		isFetching,
		mapPagePosition.lat,
		setMessenger,
		setPlotReady,
	]);

	!chartParameters &&
		Object.keys(chartParameters).length === 0 &&
		dispatch(
			setMessenger({
				direction,
				value: {
					...messenger,
					message: 'chart parameters are not available',
				},
			}),
		);

	if (isFetching) {
		return (
			<ChartLoadingSkeleton times={4}>
				<p>Fetching Time Series Data</p>
			</ChartLoadingSkeleton>
		);
	}

	if (messenger.message) {
		return <ErrorComponent text={messenger.message}></ErrorComponent>;
	}

	if (r.dataToPlot) {
		return (
			plotReady && (
				<ErrorBoundary>
					<RechartsPlot
						direction='left'
						plotMat={r.dataToPlot}
					></RechartsPlot>
				</ErrorBoundary>
			)
		);
	} else {
		return (
			<ChartLoadingSkeleton times={4}>
				<p>trying yo figure things out</p>
			</ChartLoadingSkeleton>
		);
	}
}

export default TsRequestV2;
