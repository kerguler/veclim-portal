// components/map/MapContextMenu.js
import React from 'react';
import './MapContextMenu.css'; // create / style as you like

const MapContextMenu = ({ x, y, permalink, onClose }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(permalink);
    } catch (err) {
      window.prompt('Copy this link:', permalink);
    }
    if (onClose) onClose();
  };

  const handleBackgroundClick = (e) => {
    // click outside closes, click inside menu does not bubble
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div className="map-context-overlay" onClick={handleBackgroundClick}>
      <div className="map-context-menu" style={{ top: y, left: x }}>
        <button
          type="button"
          className="map-context-menu__item"
          onClick={handleCopy}
        >
          Copy permalink
        </button>
      </div>
    </div>
  );
};

export default MapContextMenu;
