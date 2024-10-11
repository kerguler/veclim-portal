import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setDisplayedIcons } from "store";
import { useSelector } from "react-redux";
function useArrangePanels(panelData, handlePanel, displayedPanelID) {
	const dispatch = useDispatch();
	const mapVector = useSelector(
		(state) => state.fetcher.fetcherStates.mapVector
	);
	const directInit = useSelector(
		(state) => state.fetcher.fetcherStates.directInit
	);
	useEffect(() => {
		const arrangePanels = (panelData) => {
			const twinsNotDisplayed = panelData
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
			panelDataArranged = panelData.map((panel) => {
				if (
					"chartParameters" in panel &&
					Object.keys(panel.chartParameters).length > 0
				) {
					if (
						"twins" in panel.chartParameters &&
						panel.chartParameters.twins.length > 0
					) {
						let panelArray = panel.chartParameters.twins.map((twin) => {
							return twin.id;
						});
						return { id: panel.id, panelArray: [panel.id, ...panelArray] };
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
			dispatch(setDisplayedIcons(displayedPanels));
		};

		arrangePanels(panelData);
	}, [dispatch, panelData, mapVector, directInit]);

	const twinsNotDisplayed = panelData
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

	const icons = panelData.map((item) => {
		if (twinsNotDisplayed.includes(item.id)) {
			return <div key={item.id}></div>;
		}
		return (
			<div
				id={item.id}
				key={item.id}
				className={item.id !== displayedPanelID ? "icon" : "icon active"}
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
