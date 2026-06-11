import React from 'react';
import './VectorSearchAccordion.css';

const VectorSearchAccordion = ({
  groupedItems,
  searchText,
  setSearchText,
  currentVectorId,
  switchTo,
  closeSearch,
}) => {
  const items = Object.values(groupedItems).flat();

  return (
    <div className="vector-search-accordion">
      <div className="vector-search-accordion__header">
        <input
          className="vector-search-accordion__input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search vectors..."
          autoFocus
        />

        <button
          type="button"
          className="vector-search-accordion__close"
          onClick={closeSearch}
          aria-label="Close vector search"
        >
          ×
        </button>
      </div>

      <div className="vector-search-accordion__list">
        {items.length === 0 && (
          <div className="vector-search-accordion__empty">
            No matching vectors
          </div>
        )}

        <div className="vector-search-accordion__items">
          {items.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`vector-search-accordion__item ${
                item.id === currentVectorId
                  ? 'vector-search-accordion__item--active'
                  : ''
              }`}
              onClick={() => switchTo(item.id)}
            >
              <span className="vector-search-accordion__item-label">
                {item.label}
              </span>

              <span className="vector-search-accordion__item-id">
                {item.id}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VectorSearchAccordion;
