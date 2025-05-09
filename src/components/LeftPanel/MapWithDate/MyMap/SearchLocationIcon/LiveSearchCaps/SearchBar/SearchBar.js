import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { changeSearchTermLocation } from 'store';
function SearchBar({ showTheList, selectedTerm, onSubmit, border }) {
	const dispatch = useDispatch();
	const locationName = useSelector((state) => state.location.locationName);
	useEffect(() => {
		selectedTerm && dispatch(changeSearchTermLocation(''));
		showTheList(false);
	}, [selectedTerm]);

	const handleChange = (event) => {
		event.stopPropagation();
		dispatch(changeSearchTermLocation(event.target.value));
		showTheList(true);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(locationName);
		dispatch(changeSearchTermLocation(''));
		showTheList(false);
	};

	const handleInputClick = (event) => {
		event.stopPropagation();
		showTheList(true);
	};

	return (
		<div className={`form-container `}>
			<form onSubmit={handleSubmit}>
				<input
					placeholder='Search'
					type='text'
					onClick={handleInputClick}
					value={locationName}
					onChange={handleChange}
				></input>
			</form>
		</div>
	);
}

export default SearchBar;
