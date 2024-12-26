import useDirectorFun from "customHooks/useDirectorFun";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


function usePanelResize({panelRef,direction,setPanelTop}) {
    const dispatch = useDispatch();

    const {panelOpen}=useDirectorFun(direction);

      useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 499 && panelRef.current) {
                dispatch(setPanelTop(panelRef.current.getBoundingClientRect().top));
            } else {
                panelRef.current &&
                    dispatch(setPanelTop(panelRef.current.getBoundingClientRect().top));
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
  
        return () => window.removeEventListener("resize", handleResize);
    }, [panelOpen, dispatch]);
    useEffect(() => {
		if (panelRef.current) {
			dispatch(setPanelTop(panelRef.current.getBoundingClientRect().top));
		}
	});
  
  
}

export default usePanelResize;