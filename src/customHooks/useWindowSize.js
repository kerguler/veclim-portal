import { useState, useEffect } from "react";
import { useRef } from "react";
const useWindowSize = () => {
	const [webApp, setWebApp] = useState(null);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 499) {
				setWebApp(true);
			} else {
				setWebApp(false);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return  {webApp} ;
};
export default useWindowSize;
