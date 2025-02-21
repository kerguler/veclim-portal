import React, { createContext, useContext, useState } from "react";

const AlboDataContext = createContext();

export const AlboDataProvider = ({ children }) => {
	const [dataSim, setDataSim] = useState(null);
	const [isLoadingSim, setIsLoadingSim] = useState(false);
	const [errorSim, setErrorSim] = useState(null);
	const [simResult, setSimResult] = useState(null);
	return (
		<AlboDataContext.Provider
			value={{
				dataSim,
				setDataSim,
				isLoadingSim,
				setIsLoadingSim,
				errorSim,
				setErrorSim,
				simResult,
				setSimResult,
			}}
		>
			{children}
		</AlboDataContext.Provider>
	);
};

export const useAlboData = () => useContext(AlboDataContext);
