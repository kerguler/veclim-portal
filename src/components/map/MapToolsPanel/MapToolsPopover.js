// components/map/MapToolsPopover.js
import React, { useEffect, useRef } from 'react';
import MapToolsPanel from 'components/map/MapToolsPanel/MapToolsPanel';
import './MapToolsPopover.css';

const MapToolsPopover = ({ onClose, anchorPoint, ignoreRef }) => {
  const popRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => e.key === 'Escape' && onClose?.();

    const onMouseDown = (e) => {
      // click inside popover => do nothing
      if (popRef.current && popRef.current.contains(e.target)) return;

      // click on the icon that opened it => do nothing (so toggle logic can handle it)
      if (ignoreRef?.current && ignoreRef.current.contains(e.target)) return;

      onClose?.();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onMouseDown, true); // capture
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onMouseDown, true);
    };
  }, [onClose, ignoreRef]);

  const x = anchorPoint?.x ?? 60;
  const y = anchorPoint?.y ?? 60;

  return (
    <div
      ref={popRef}
      className="map-tools-popover"
      style={{
        left: x,
        top: y,
        '--origin-x': '10px',
        '--origin-y': '10px',
      }}
    >
      <MapToolsPanel />
    </div>
  );
};

export default MapToolsPopover;
