import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useDirectorFun from "./useDirectorFun";
import { set, setTwinIndex } from "store";
import { setShimmerLeft } from "store";
import { useState } from "react";
import classNames from "classnames";
function useArrangePanels(handlePanel, direction) {
	const {
		panelDataDir,
		displayedPanelID,
		directInit,
		mapVector,
		panelOpen,
		setDisplayedIconsDir,
		dataArrivedRight,
	} = useDirectorFun(direction);
	const dispatch = useDispatch();

	let iconClassName = classNames("icon");
	const [shimmerIcon, setShimmerIcon] = useState(null);

	const shimmerLeft = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.chart.shimmer
	);
	useEffect(() => {
		shimmerLeft?.shimmer && setShimmerIcon(shimmerLeft?.panel);
	}, [shimmerLeft]);
	useEffect(() => {
		const arrangePanels = (panelDataDir) => {
			const twinsNotDisplayed = panelDataDir
				.flatMap((item) => {
					const panelTwins = item.chartParameters.twins;

					if (panelTwins && panelTwins.length !== 0) {
						// look at the partner queue, and partner display

						const currentIds = panelTwins.map((twin) => {
							if (!twin.display) {
								return twin.id;
							} else {
								return null;
							}
						});
						return currentIds;
					} else {
						return null;
					}
				})
				.filter((item) => item !== null);

			let panelDataArranged = [];

			panelDataArranged = panelDataDir.map((panel) => {
				if (
					"chartParameters" in panel &&
					Object.keys(panel.chartParameters).length > 0
				) {
					if (
						"twins" in panel.chartParameters &&
						panel.chartParameters.twins.length > 0
					) {
						let panelArray = [panel.id];
						panel.chartParameters.twins.forEach((twin) => {
							if (twin.simulation) {
								if (dataArrivedRight) {
									console.log("simulation panel ADDED");
									panelArray.unshift(twin.id);
									dispatch(setShimmerLeft({ panel: panel.id, shimmer: true }));
								} else {
									dispatch(setTwinIndex(0));
								}
							} else {
								panelArray.push(twin.id);
							}
						});
						return { id: panel.id, panelArray: panelArray };
					} else {
						return { id: panel.id, panelArray: [panel.id] };
					}
				} else {
					return { id: panel.id, panelArray: [] };
				}
			});
			const displayedPanels = panelDataArranged.filter((item) => {
				if (!twinsNotDisplayed.includes(item.id)) {
					return item;
				}
			});
			dispatch(setDisplayedIconsDir(displayedPanels));
		};

		arrangePanels(panelDataDir);
	}, [
		dispatch,
		panelDataDir,
		mapVector,
		directInit,
		dataArrivedRight,
		setDisplayedIconsDir,
	]);

	const twinsNotDisplayed = panelDataDir
		.flatMap((item) => {
			const panelTwins = item.chartParameters.twins;

			if (panelTwins && panelTwins.length !== 0) {
				// look at the partner queue, and partner display

				const currentIds = panelTwins.map((twin) => {
					if (!twin.display) {
						return twin.id;
					} else {
						return null;
					}
				});
				return currentIds;
			} else {
				return null;
			}
		})
		.filter((item) => item !== null);
	const icons = panelDataDir.map((item) => {
		var iconClassName1;
		if (item.id === displayedPanelID) {
			iconClassName1 = classNames(iconClassName, "active");
		} else {
			iconClassName1 = classNames(iconClassName, "inactive");
		}
		if (item.id === shimmerIcon) {
			if (dataArrivedRight) {
				iconClassName1 = classNames(iconClassName1, "shimmer-on");
			} else {
			}
		}

		if (twinsNotDisplayed.includes(item.id)) {
			return <div key={item.id}></div>;
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
				<img alt="item icon" src={item.icon}></img>
			</div>
		);
	});
	return { icons };
}

export default useArrangePanels;
