import { useDispatch } from "react-redux";
import { setShowVectorAbundance } from "store";
import { useSelector } from "react-redux";
import { setTileOpacity } from "store";
import { setShowMapLabels } from "store";

import mapIcon from "assets/icons/map-page-right-menu/png/007-map-32px.png";
import transIcon from "assets/icons/map-page-right-menu/png/016-brightness-32px.png";

function OptionsPanel() {
    const showMapLabels = useSelector(
        (state) => state.fetcher.fetcherStates.map.optionsPanel.showMapLabels
    );
    const showVectorAbundance = useSelector(
        (state) => state.fetcher.fetcherStates.map.optionsPanel.showVectorAbundance
    );
    const tileOpacity = useSelector(
        (state) => state.fetcher.fetcherStates.map.optionsPanel.tileOpacity
    );
    const dispatch = useDispatch();
    const handleShowVectorAbundance =(e)=>{
        // console.log("Show Vector Abundance: ", e.target.checked);
        dispatch(setShowVectorAbundance(e.target.checked));

    }
    const handleChangeOpacity = (e) => {
        const opacityValue = tileOpacity < 1 ? 1.0 : 0.5;
        // console.log("Tile Opacity: ", opacityValue);
     dispatch(setTileOpacity(opacityValue));
    }

    const handleShowLabels = (e) => {
        const showLabels = showMapLabels ? false : true;
        // console.log("Show Labels: ", showLabels);
       dispatch(setShowMapLabels(showLabels));
    }

    const opactive = tileOpacity < 1 ? "panel-content icons-area  active" : "panel-content icons-area  inactive";
    const labactive = showMapLabels ? "panel-content icons-area  active" : "panel-content icons-area  inactive";

    return (<>
    <div className="text-area">
        <h1>Map Options</h1>
			<div className="map-descriptions-wrapper">
                <div className="description-row">
                    <div 
                    className={opactive}
                    onClick={handleChangeOpacity}
                    >
    			    	<img alt="opacity-icon" src={transIcon}></img>
                    </div>
                    <div><p>Transparent tiles</p></div>
                </div>
                <div className="description-row">
                    <div 
                    className={labactive}
                    onClick={handleShowLabels}
                    >
    			    	<img style={{borderRadius:"0px"}} alt="map-icon" src={mapIcon}></img>
                    </div>
                    <div><p>OpenStreetMap with labels</p></div>
                </div>
             </div>
            </div>
        </>);
}

export default OptionsPanel;