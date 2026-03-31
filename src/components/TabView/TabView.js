import React from 'react';
import './TabView.css';

export function TabView({
  siblings = [],
  activeKey,
  onChange,
  onPrev,
  onNext,
  canPrev,
  canNext,
  showArrows = true,
}) {
  const activeItem =
    siblings.find((item) => item.key === activeKey) ?? siblings[0] ?? null;

  return (
    <div className="tabView">
      <div className="tabView__topRow">
        <div className="tabView__tabs" role="tablist" aria-label="Panel tabs">
          {siblings.map((item) => {
            const isActive = item.key === activeKey;

            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`tabView__tab ${isActive ? 'is-active' : ''}`}
                onClick={() => onChange?.(item.key)}
              >
                {item.tabLabel ?? item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="tabView__content" role="tabpanel">
        {showArrows && (
          <div className="tabView__arrows">
            <button
              type="button"
              className="tabView__arrowBtn"
              onClick={onPrev}
              disabled={!canPrev}
              aria-label="Previous tab"
            >
              ‹
            </button>

            <button
              type="button"
              className="tabView__arrowBtn"
              onClick={onNext}
              disabled={!canNext}
              aria-label="Next tab"
            >
              ›
            </button>
          </div>
        )}

        {activeItem?.content}
      </div>
    </div>
  );
}
