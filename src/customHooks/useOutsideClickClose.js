import { useEffect } from "react";
function useOutsideClickClose(reference, closefun) {
	useEffect(() => {
		const handleClickOnDoc = (event) => {
			if (!reference.current) {
				return;
			}
			if (!reference.current.contains(event.target)) {
				closefun(false);
			}
		};
		// console.log("useOutsideClickClose.js");
		window.addEventListener("click", handleClickOnDoc, true);
		return () => {
			window.removeEventListener("click", handleClickOnDoc);
		};
	});
}

export default useOutsideClickClose;
