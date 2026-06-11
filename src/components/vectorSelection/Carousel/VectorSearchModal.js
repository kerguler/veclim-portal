import React from 'react';

const VectorSearchModal = ({
  groupedItems,
  searchText,
  setSearchText,
  currentVectorId,
  switchTo,
  closeSearch,
}) => {
  return (
    <div className="vector-search-backdrop" onMouseDown={closeSearch}>
      <div
        className="vector-search-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="vector-search-modal__header">
          <input
            className="vector-search-modal__input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search vectors..."
            autoFocus
          />

          <button
            type="button"
            className="vector-search-modal__close"
            onClick={closeSearch}
            aria-label="Close vector search"
          >
            ×
          </button>
        </div>

        <VectorGroupedList
          groupedItems={groupedItems}
          currentVectorId={currentVectorId}
          switchTo={switchTo}
          baseClass="vector-search-modal"
        />
      </div>
    </div>
  );
};

const VectorGroupedList = ({
  groupedItems,
  currentVectorId,
  switchTo,
  baseClass,
}) => {
  return (
    <div className={`${baseClass}__list`}>
      {Object.keys(groupedItems).length === 0 && (
        <div className={`${baseClass}__empty`}>No matching vectors</div>
      )}

      {Object.entries(groupedItems).map(([groupName, items]) => (
        <div className={`${baseClass}__group`} key={groupName}>
          <div className={`${baseClass}__group-title`}>{groupName}</div>

          {items.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`${baseClass}__item ${
                item.id === currentVectorId ? `${baseClass}__item--active` : ''
              }`}
              onClick={() => switchTo(item.id)}
            >
              <span className={`${baseClass}__item-label`}>{item.label}</span>
              <span className={`${baseClass}__item-id`}>{item.id}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VectorSearchModal;
