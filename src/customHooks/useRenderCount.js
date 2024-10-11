import { useEffect, useRef, useState } from "react";

function useRenderCount(text) {
	const renderCount = useRef(0);
	useEffect(() => {
		// renderCount.current += 1;
		renderCount.current = renderCount.current + 1;
		console.log(renderCount.current, ". render ", text);
	});
}

export default useRenderCount;
