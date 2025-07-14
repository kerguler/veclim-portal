import { useEffect, useState } from "react";

function useColorBarResize(
	leftBarRef,
	rightBarRef,
	panelOpen,
	panelTop,
	times,setStyle
) {
	useEffect(() => {
		const handleResize = () => {
			let leftHeight, rightHeight;
			if (leftBarRef.current) {
				const { height } = leftBarRef.current.getBoundingClientRect();
				leftHeight = height;
			}

			if (rightBarRef.current) {
				const { height } = rightBarRef.current.getBoundingClientRect();
				rightHeight = height;
			}

			if (window.innerWidth <= 499) {
				if (panelOpen) {
					setStyle([
						{
							top: `${panelTop - leftHeight - 20}px`,
							bottom: "unset",
						},
						{
							top: `${panelTop - rightHeight - 20}px`,
							bottom: "unset",
						},
					]);
				} else {
					setStyle([
						{ bottom: "5%", top: "unset" },
						{ bottom: "5%", top: "unset" },
					]);
				}
			} else {
				setStyle([
					{ bottom: "1%", top: "unset" },
					{ bottom: "1%", top: "unset" },
				]);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [panelOpen, panelTop, times]);
}

export default useColorBarResize;
