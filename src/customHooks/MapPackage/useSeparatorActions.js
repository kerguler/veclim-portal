import { useEffect } from 'react';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { useDispatch, useSelector } from 'react-redux';
import { setDividerPosition } from 'store';
import useDirectorFun from 'customHooks/useDirectorFun';
function useSeparatorActions(mapParRef) {
  const { mapVector, mapPagePosition, tileArray } = useDirectorFun('left');

  const dispatch = useDispatch();
  useEffect(() => {
    const handleMarkers = () => {
      PackageMapServices.markerHandler(mapParRef, 4, mapVector, dispatch, mapPagePosition);
    };
    const handleSepClick = (e) => {
      console.log('clicked on separator');

      handleMarkers();
      e.stopPropagation();
    };
    const handleDividerInput = (e) => {
      const sliderValue = e.target.value;
      dispatch(setDividerPosition(sliderValue));
    };
    const sliderElement = document.querySelector('.leaflet-sbs-range');

    // 2) Attach the event listener
    if (sliderElement) {
      // 'input' fires continuously while the user drags,
      // 'change' fires only after releasing the slider
      sliderElement.addEventListener('input', handleDividerInput);
    }

    let circularHandle = document.querySelector('.leaflet-sbs-range ');
    circularHandle && circularHandle.addEventListener('click', handleSepClick);
    return () => {
      circularHandle && circularHandle.removeEventListener('click', handleSepClick);
      circularHandle = null;
      if (sliderElement) {
        sliderElement.removeEventListener('input', handleDividerInput);
      }
    };
  });
}

export default useSeparatorActions;
