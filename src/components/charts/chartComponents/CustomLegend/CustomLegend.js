import React from 'react';
import { createPortal } from 'react-dom';
import useDirectorFun from 'customHooks/useDirectorFun';
import './CustomLegend.css';

export default function CustomLegend({
  payload = [],
  direction,
  legendButtonClick,
  activeKeys = [],
  isOpen,
  onToggle,

  // ✅ add this
  portalTargetRef,
}) {
  const { chartParameters } = useDirectorFun(direction);

  const labelByDataKey = Object.entries(
    chartParameters?.sliceInfo ?? {}
  ).reduce((acc, [gid, info]) => {
    Object.entries(info?.sliceLabels ?? {}).forEach(([sliceKey, label]) => {
      acc[`${gid}.${sliceKey}`] = label;
    });
    return acc;
  }, {});

  const items = Array.from(
    new Map(payload.map((it) => [it.dataKey, it])).values()
  );

  const legendUI = (
    <div className={`vl ${isOpen ? 'vl--open' : ''}`}>
      <button type="button" className="vl__toggle" onClick={onToggle}>
        <span className="vl__title">Legend</span>
        <span className="vl__count">{items.length}</span>
        <span className="vl__caret">{isOpen ? '▴' : '▾'}</span>
      </button>

      {isOpen && (
        <div className="vl__body">
          {items.map((entry) => {
            const active = activeKeys.includes(entry.dataKey);
            const label = labelByDataKey[entry.dataKey] ?? entry.value;

            return (
              <button
                key={entry.dataKey}
                type="button"
                className={`vl__chip ${active ? 'isActive' : 'isInactive'}`}
                onClick={() => legendButtonClick(entry.dataKey)}
                title={String(label)}
              >
                <span className="vl__dot" style={{ background: entry.color }} />
                <span className="vl__label">{label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  // ✅ portal if host exists
  const target = portalTargetRef?.current;
  return target ? createPortal(legendUI, target) : legendUI;
}
