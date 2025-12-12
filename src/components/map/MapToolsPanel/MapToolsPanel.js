// components/map/MapToolsPanel/MapToolsPanel.js
import React from 'react';
import useDirectorFun from 'customHooks/useDirectorFun';
import './MapToolsPanel.css';

const MapToolsPanel = () => {
  const {
    permalink,

  } = useDirectorFun('left');

  // ---- helpers -----------------------------------------------------

  // ---- actions -----------------------------------------------------

  const handleShareClick = async () => {
    if (!permalink) return;

    try {
      const absolute = window.location.origin + permalink;
      await navigator.clipboard.writeText(absolute);
    } catch (err) {
      window.prompt('Copy this link:', permalink);
    }
  };

  const handleDownload = () => {
  };

  return (
    <div className="map-tools-panel">
      <div className="map-tools-panel__title">Share &amp; Download</div>

      <div
        className="map-tools-panel__button"
        onClick={handleDownload}
      >
        Download image
      </div>

      <div
        className="map-tools-panel__button"
        onClick={handleShareClick}
      >
        Share link
      </div>
    </div>
  );
};

export default MapToolsPanel;
