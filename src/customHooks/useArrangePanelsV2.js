import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import useDirectorFun from './useDirectorFun';

import { useState } from 'react';
import classNames from 'classnames';
function useArrangePanelsV2({ handlePanel, direction }) {
	const {
		panelDataDir,
		displayedPanelID,

		dataArrived,
	} = useDirectorFun(direction);
	const dispatch = useDispatch();

	let iconClassName = classNames('icon');
	const [shimmerIcon, setShimmerIcon] = useState(null);

	const shimmerLeft = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.chart.shimmer,
	);
	useEffect(() => {
		shimmerLeft?.shimmer && setShimmerIcon(shimmerLeft?.panel);
	}, [shimmerLeft]);

	const twinsNotDisplayed = null;

	const icons = panelDataDir.map((item) => {
		var iconClassName1;
		if (item.id === displayedPanelID) {
			iconClassName1 = classNames(iconClassName, 'active');
		} else {
			iconClassName1 = classNames(iconClassName, 'inactive');
		}
		if (item.id === shimmerIcon) {
			if (dataArrived) {
				iconClassName1 = classNames(iconClassName1, 'shimmer-on');
			} else {
			}
		}

		return (
			<div
				id={item.id}
				key={item.id}
				className={iconClassName1}
				onClick={() => {
					handlePanel(item.id);
				}}
			>
				<img alt='item icon' src={item.icon}></img>
			</div>
		);
	});
	return { icons };
}

export default useArrangePanelsV2;
