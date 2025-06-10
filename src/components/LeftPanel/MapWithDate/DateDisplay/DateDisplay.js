import { useSelector } from 'react-redux';
import { useFetchCoordinateDataQuery } from 'store';
import { useContext } from 'react';
import TextContext from 'context/appText';
import './DateDisplay.css';
const DateDisplay = () => {
	const position = useSelector((state) => {
		return state.fetcher.fetcherStates.map.globalPosition;
	});
	const { data } = useFetchCoordinateDataQuery(JSON.stringify(position));
	const { months } = useContext(TextContext);
	var today;
	if (data) {
		today = new Date(data.date.date0);
		today =
			(today.getDate() < 10 ? '0' : '') +
			today.getDate() +
			' ' +
			months[today.getMonth()];
	} else {
		today = '';
	}
	return <div className='date-picker-row'>{today}</div>;
};
export default DateDisplay;
