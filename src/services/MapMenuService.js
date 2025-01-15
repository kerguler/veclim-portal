class mapMenuService {
	static handlePanel(
		id,
		vectorName,
		panelOpenRef,
		dispatch,
		panelData,
		panel,
		setPanel,
		setPanelChart,
		directInit,
		panelOpen,
		setDisplayedPanelID,
		setPanelOpen,
		setChartParameters,
		panelInterfere
	) {
		let p = panelOpenRef.current;
		const defaultBehav = () => {
			dispatch(setDisplayedPanelID(p));

			if (panel === panelData[p].content) {
				if (id === -1) {
				} else {
					dispatch(setPanelOpen(false));

					setPanel(null);
					setPanelChart(null);
				}
			} else {
				setPanel(panelData[p].content);
				panelOpenRef.current = p;

				if (Object.keys(panelData[p].chartParameters).length) {
					dispatch(setChartParameters(panelData[p].chartParameters));

					setPanelChart(true);
				} else {
					setPanelChart(null);
				}
				if (!panelOpen) {
					dispatch(setPanelOpen(true));
				}
			}
		};

		if (id === -1) {
			// this means whereever we were, someone clicked the map
			if (vectorName === "albopictus") {
				if (p === 7 || p === 8) {
					// this means we are on albo and we are either channging tiles or changing vectors
					p = 3;
					defaultBehav();
				} else {
					// this means we were not on tile or
					//vector change and we should persist the panel

					defaultBehav();
				}
			} else if (vectorName === "papatasi") {
				if (p === 2 || p === 3) {
					// this means we are on papartasi and change tile or vecvtor
					p = 1;
					defaultBehav();
				} else {
					defaultBehav();
					//this means we are on a graph panel we should persist our panel
				}
			} else {
				// we have introduced a new vector
			}
		} else {
			p = id;
			defaultBehav();
		}

		// decıde which one to set it to possible within if statements before setting panelOpenRef
		// panelOpenRef rerender durumlarında en son acık galan panelı record eder..
	}

	static handlePanelV2(
		id,
		vectorName,
		panelOpenRef,
		dispatch,
		panelData,
		panel,
		setPanel,
		setPanelChart,
		directInit,
		panelOpen,
		setDisplayedPanelID,
		setPanelOpen,
		setChartParameters,
		panelInterfere
	) {
		let p = panelOpenRef.current;
		const defaultBehav = () => {
			dispatch(setDisplayedPanelID(p));

			if (panel === panelData[p].content) {
				if (id === -1) {
				} else {
					dispatch(setPanelOpen(false));

					setPanel(null);
					setPanelChart(null);
				}
			} else {
				setPanel(panelData[p].content);
				panelOpenRef.current = p;

				if (Object.keys(panelData[p].chartParameters).length) {
					dispatch(setChartParameters(panelData[p].chartParameters));

					setPanelChart(true);
				} else {
					setPanelChart(null);
				}
				if (!panelOpen) {
					dispatch(setPanelOpen(true));
				}
			}
		};

		if (id === -1) {
			// this means whereever we were, someone clicked the map
			if (vectorName === "albopictus") {
				if (p === 7 || p === 8) {
					// this means we are on albo and we are either channging tiles or changing vectors
					p = 3;
					defaultBehav();
				} else {
					// this means we were not on tile or
					//vector change and we should persist the panel

					defaultBehav();
				}
			} else if (vectorName === "papatasi") {
				if (p === 2 || p === 3) {
					// this means we are on papartasi and change tile or vecvtor
					p = 1;
					defaultBehav();
				} else {
					defaultBehav();
					//this means we are on a graph panel we should persist our panel
				}
			} else {
				// we have introduced a new vector
			}
		} else {
			p = id;
			defaultBehav();
		}

		// decıde which one to set it to possible within if statements before setting panelOpenRef
		// panelOpenRef rerender durumlarında en son acık galan panelı record eder..
	}
}
export default mapMenuService;
