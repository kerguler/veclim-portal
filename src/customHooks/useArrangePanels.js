import { useDispatch } from "react-redux";
import { useEffect } from "react";
import useDirectorFun from "./useDirectorFun";
function useArrangePanels(handlePanel, direction) {
	const {
		panelDataDir,
		displayedPanelID,
		directInit,
		mapVector,
		setDisplayedIconsDir,
	} = useDirectorFun(direction);
	const dispatch = useDispatch();

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
			dispatch(setDisplayedIconsDir(displayedPanels));
		};

		arrangePanels(panelDataDir);
	}, [dispatch, panelDataDir, mapVector, directInit]);

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
