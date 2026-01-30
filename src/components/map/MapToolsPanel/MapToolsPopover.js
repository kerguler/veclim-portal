// components/map/MapToolsPopover.js
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import MapToolsPanel from 'components/map/MapToolsPanel/MapToolsPanel';
import './MapToolsPopover.css';

const MARGIN = 10;

const clamp = (v, min, max) => Math.max(min, Math.min(v, max));

const MapToolsPopover = ({ onClose, anchorPoint, ignoreRef }) => {
  const popRef = useRef(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const onKeyDown = (e) => e.key === 'Escape' && onClose?.();

    const onMouseDown = (e) => {
      if (popRef.current && popRef.current.contains(e.target)) return;
      if (ignoreRef?.current && ignoreRef.current.contains(e.target)) return;
      onClose?.();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onMouseDown, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onMouseDown, true);
    };
  }, [onClose, ignoreRef]);

  


  return (
    <div
      ref={popRef}
      className="map-tools-popover"
      // style={{ left: pos.left, top: pos.top }}
    >
      <MapToolsPanel />
    </div>
  );
};

export default MapToolsPopover;
