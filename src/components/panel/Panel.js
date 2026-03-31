import './Panel.css';
import closeIcon from 'assets/icons/close-bold-svgrepo-com.svg';
import classNames from 'classnames';
import useDirectorFun from 'customHooks/useDirectorFun';
import { useDispatch } from 'react-redux';
import { setPanelOpen } from 'store';
import SwitcherArrows from './SwitcherArrows';
import { setTwinIndex } from 'store';
import PanelChildren from 'components/mapMenu/mapMenu/PanelChildren';
function Panel({ onClosed, children, className, direction, passedKey, tabs }) {
  const dispatch = useDispatch();
  const {
    panelOpen,
    interferePanelStyleRight: interferePanelStyle,
    panelData,
  } = useDirectorFun(direction);
  const handleClick = () => {
    onClosed();
    dispatch(setPanelOpen({ direction, value: !panelOpen }));
  };

  const outerClassNames = classNames('panel-container', className);
  const tabKeys = tabs.map((t) => t.key);
  const result = panelData.filter((item) => tabKeys.includes(item.key));
  console.log({ result });
  const handleHeadingClick = (key) => {
    let twinno = result.findIndex((item) => item.key === key);
    console.log({ twinno });

    dispatch(setTwinIndex({ direction, value: twinno }));
  };
  let displayedTabs = result.map((item) => {
    const isActive = item.key === passedKey?.key;

    return (
      <div
        key={item.key}
        className={classNames('tab-heading', { 'is-active': isActive })}
        onClick={() => {
          handleHeadingClick(item.key);
        }}
      >
        <h3>{item?.label}</h3>
      </div>
    );
  });

  return (
    <div className={outerClassNames} style={interferePanelStyle}>
      {/* <SwitcherArrows direction={direction} passedKey={passedKey} /> */}
	  <div className="panel-close-button" onClick={handleClick}>
          <img alt="close-button" src={closeIcon} />
        </div>
      <div className="tab-list"> {displayedTabs}</div>
      <div className="panel-inner-box">
        
        {children}
      </div>
    </div>
  );
}

export default Panel;
