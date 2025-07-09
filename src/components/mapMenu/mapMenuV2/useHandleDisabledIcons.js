import useDirectorFun from 'customHooks/useDirectorFun';
import { useEffect } from 'react';

function useHandleDisabledIcons(setStyle, setImgStyle, panelChildren) {
  const { panelData, mapPagePosition, openItems } = useDirectorFun('left');

  useEffect(() => {
    panelChildren.forEach((panel) => {
      let myPanel = panelData.filter((panelData) => panelData.key === panel.key)[0];
      if (mapPagePosition.lat === null) {
        if (
          (myPanel && myPanel.chartParameters && Object.keys(myPanel.chartParameters).length > 0) ||
          myPanel.positionDependent
        ) {
          setStyle({
            backgroundColor: 'var(--neutral-color1)',
            pointerEvents: 'none',
            cursor: 'not-allowed',
          });
          setImgStyle({
            color: 'grey',
            //width: "20px",
            // height: "20px",
          });
        } else {
          setStyle({ color: 'white', pointerEvents: 'all' });
          setImgStyle({
            color: 'grey',
            // width: webApp ? "20px" : "2px",
            // height: webApp ? "20px" : "32px",
          });
        }
      } else {
        setStyle({ color: 'white', pointerEvents: 'all' });
        setImgStyle({
          color: 'grey',
          // width: webApp ? "20px" : "32px",
          // height: webApp ? "20px" : "32px",
        });
      }
    });
  }, [mapPagePosition.lat, openItems]);
}
export default useHandleDisabledIcons;
