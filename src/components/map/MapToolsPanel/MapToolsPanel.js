// components/map/MapToolsPanel/MapToolsPanel.js
import React from 'react';
import useDirectorFun from 'customHooks/useDirectorFun';
import './MapToolsPanel.css';
import { useFetchCoordinateDataQuery } from 'store';
import { useFetchTimeSeriesDataQuery } from 'store';

const MapToolsPanel = () => {
  const { mapPagePosition, mapVector, dateArray } = useDirectorFun('left');
  const { permalink } = useDirectorFun('left');

  // ---- helpers -----------------------------------------------------

  // ---- actions -----------------------------------------------------
  const downloadJson = (obj, filename = 'timeseries.json') => {
    const jsonString = JSON.stringify(obj, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleShareClick = async () => {
    if (!permalink) return;

    try {
      const absolute = window.location.origin + permalink;
      await navigator.clipboard.writeText(absolute);
    } catch (err) {
      window.prompt('Copy this link:', permalink);
    }
  };

  const { data, error, isFetching } = useFetchTimeSeriesDataQuery({
    position: JSON.stringify(mapPagePosition),
    vectorName: mapVector,
    dateArray: dateArray,
  });
  const handleDownload = () => {
    if (!data) return;

    const filename = `timeseries_${mapVector}_${Date.now()}.json`;
    downloadJson(data, filename);
  };

  return (
    <div className="map-tools-panel">
      <div className="map-tools-panel__title">Share &amp; Download</div>

      <div className="map-tools-panel__button" onClick={handleDownload}>
        Download TS data
      </div>

      <div className="map-tools-panel__button" onClick={handleShareClick}>
        Share link
      </div>
    </div>
  );
};

export default MapToolsPanel;
