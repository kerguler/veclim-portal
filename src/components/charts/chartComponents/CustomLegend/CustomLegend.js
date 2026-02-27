import React, { useMemo } from 'react';
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
  portalTargetRef,
}) {
  const { chartParameters } = useDirectorFun(direction);

  const labelByDataKey = useMemo(() => {
    return Object.entries(chartParameters?.sliceInfo ?? {}).reduce(
      (acc, [gid, info]) => {
        Object.entries(info?.sliceLabels ?? {}).forEach(([sliceKey, label]) => {
          acc[`${gid}.${sliceKey}`] = label;
        });
        return acc;
      },
      {}
    );
  }, [chartParameters]);

  // unique by dataKey
  const items = useMemo(() => {
    return Array.from(new Map(payload.map((it) => [it.dataKey, it])).values());
  }, [payload]);

  // ✅ group by primary key (gid) => g1.slice0, g1.slice1 grouped together
  const grouped = useMemo(() => {
    const groups = new Map();

    for (const it of items) {
      const dk = String(it.dataKey ?? '').trim(); // ✅ trims hidden spaces
      const [gid, sliceKey] = dk.split('.');
      if (!gid || !sliceKey) continue;

      if (!groups.has(gid)) groups.set(gid, []);
      groups.get(gid).push({ ...it, dataKey: dk, gid, sliceKey });
    }

    // nice ordering: follow chartParameters.sliceInfo order if possible
    const ordered = [];
    const order = Object.keys(chartParameters?.sliceInfo ?? {});
    const used = new Set();

    const sortSlices = (arr) =>
      arr.slice().sort((a, b) => {
        const ai = Number(String(a.sliceKey).replace('slice', ''));
        const bi = Number(String(b.sliceKey).replace('slice', ''));
        return (
          (Number.isFinite(ai) ? ai : 999) - (Number.isFinite(bi) ? bi : 999)
        );
      });

    for (const gid of order) {
      if (groups.has(gid)) {
        ordered.push([gid, sortSlices(groups.get(gid))]);
        used.add(gid);
      }
    }
    // leftovers
    for (const [gid, arr] of groups.entries()) {
      if (!used.has(gid)) ordered.push([gid, sortSlices(arr)]);
    }

    return ordered; // array of [gid, entries]
  }, [items, chartParameters]);

  const legendUI = (
    <div className={`vl ${isOpen ? 'vl--open' : ''}`}>
      <button type="button" className="vl__toggle" onClick={onToggle}>
        <span className="vl__title">Legend</span>
        {/* show number of CHIPS after grouping */}
        <span className="vl__count">{grouped.length}</span>
        <span className="vl__caret">{isOpen ? '▴' : '▾'}</span>
      </button>

      {isOpen && (
        <div className="vl__body">
          {grouped.map(([gid, entries]) => {
            // --- single slice: keep your original chip exactly ---
            if (entries.length === 1) {
              const entry = entries[0];
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
                  <span
                    className="vl__dot"
                    style={{ background: entry.color }}
                  />
                  <span className="vl__label">{label}</span>
                </button>
              );
            }

            // --- multi-slice: one big oval with multiple colors ---
            const anyActive = entries.some((e) =>
              activeKeys.includes(e.dataKey)
            );

            // label: prefer gid.slice0 label, else first
            const label =
              labelByDataKey[`${gid}.slice0`] ??
              labelByDataKey[entries[0].dataKey] ??
              entries[0].value ??
              gid;

            // click any slice key; your handler toggles by gid anyway
            const clickKey = entries[0].dataKey;

            return (
              <button
                key={gid}
                type="button"
                className={`vl__chip vl__chip--combined ${
                  anyActive ? 'isActive' : 'isInactive'
                }`}
                onClick={() => legendButtonClick(entries[0].dataKey)}
              >
                {entries.map((e) => {
                  const label = labelByDataKey[e.dataKey] ?? e.value;

                  return (
                    <span key={e.dataKey} className="vl__mini">
                      <span
                        className="vl__dot"
                        style={{ background: e.color }}
                      />
                      <span className="vl__miniLabel">{label}</span>
                    </span>
                  );
                })}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  const target = portalTargetRef?.current;
  return target ? createPortal(legendUI, target) : legendUI;
}

// import React from 'react';
// import { createPortal } from 'react-dom';
// import useDirectorFun from 'customHooks/useDirectorFun';
// import './CustomLegend.css';

// export default function CustomLegend({
//   payload = [],
//   direction,
//   legendButtonClick,
//   activeKeys = [],
//   isOpen,
//   onToggle,

//   // ✅ add this
//   portalTargetRef,
// }) {
//   const { chartParameters } = useDirectorFun(direction);

//   const labelByDataKey = Object.entries(
//     chartParameters?.sliceInfo ?? {}
//   ).reduce((acc, [gid, info]) => {
//     Object.entries(info?.sliceLabels ?? {}).forEach(([sliceKey, label]) => {
//       acc[`${gid}.${sliceKey}`] = label;
//     });
//     return acc;
//   }, {});

//   const items = Array.from(
//     new Map(payload.map((it) => [it.dataKey, it])).values()
//   );

//   const legendUI = (
//     <div className={`vl ${isOpen ? 'vl--open' : ''}`}>
//       <button type="button" className="vl__toggle" onClick={onToggle}>
//         <span className="vl__title">Legend</span>
//         <span className="vl__count">{items.length}</span>
//         <span className="vl__caret">{isOpen ? '▴' : '▾'}</span>
//       </button>

//       {isOpen && (
//         <div className="vl__body">
//           {items.map((entry) => {
//             const active = activeKeys.includes(entry.dataKey);
//             const label = labelByDataKey[entry.dataKey] ?? entry.value;

//             return (
//               <button
//                 key={entry.dataKey}
//                 type="button"
//                 className={`vl__chip ${active ? 'isActive' : 'isInactive'}`}
//                 onClick={() => legendButtonClick(entry.dataKey)}
//                 title={String(label)}
//               >
//                 <span className="vl__dot" style={{ background: entry.color }} />
//                 <span className="vl__label">{label}</span>
//               </button>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );

//   // ✅ portal if host exists
//   const target = portalTargetRef?.current;
//   return target ? createPortal(legendUI, target) : legendUI;
// }
