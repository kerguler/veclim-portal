import { useDispatch } from "react-redux";
import { setShowVectorAbundance } from "store";
import { useSelector } from "react-redux";
import { setTileOpacity } from "store";
import { setShowMapLabels } from "store";
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
        console.log("Show Vector Abundance: ", e.target.checked);
        dispatch(setShowVectorAbundance(e.target.checked));

    }
    const handleChangeOpacity = (e) => {
        const opacityValue = e.target.value;
        console.log("Tile Opacity: ", opacityValue);
     dispatch(setTileOpacity(opacityValue));
    }

    const handleShowLabels = (e) => {
        const showLabels = e.target.checked;
        console.log("Show Labels: ", showLabels);
       dispatch(setShowMapLabels(showLabels));
    }
    return <div><h1>Map Options</h1>
			<div className="map-descriptions-wrapper">
				<div className="description-row">
                    <p>Show VectAbundance</p>
                     <input type="checkbox" name="showVectAbundance" id="showVectAbundance" onChange={handleShowVectorAbundance} checked={showVectorAbundance}/>
                </div>
                <div className="description-row">
                    <p>Tile Opacity</p>
                    <input type="range" name="tileOpacity" id="tileOpacity" min="0" max="1" step="0.1" value={tileOpacity} onChange={handleChangeOpacity} />
                </div>
                <div className="description-row">
				<p>Show Labels</p>  <input type="checkbox" name="showLabels" id="showLabels" onChange={handleShowLabels} value={showMapLabels}/>
                </div>
			</div></div>;
}

export default OptionsPanel;