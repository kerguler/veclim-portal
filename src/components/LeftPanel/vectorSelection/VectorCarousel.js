// src/components/LeftPanel/vectorSelection/VectorCarousel.js
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { VECTORS, ALL_VECTORS, getVector } from 'vectors/registry';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';

import './VectorCarousel.css';

const VectorCarousel = ({ className = '', onChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef(null);
  const touchStartX = useRef(null);

  const currentVectorId = useSelector(
    (state) => state.fetcher.fetcherStates.vectorName
  );

  const vectorOrder = useMemo(() => {
    const seen = new Set();
    const ids = [];

    ALL_VECTORS.forEach((v) => {
      if (v?.id && VECTORS[v.id] && !seen.has(v.id)) {
        seen.add(v.id);
        ids.push(v.id);
      }
    });

    return ids;
  }, []);

  const vectorItems = useMemo(() => {
    return vectorOrder
      .map((id) => getVector(id))
      .filter(Boolean)
      .map((vec) => ({
        id: vec.id,
        label: vec.shortLabel || vec.label || vec.id,
        fullLabel: vec.label || vec.shortLabel || vec.id,
        group:
          vec.meta?.group || vec.meta?.category || vec.meta?.type || 'Vectors',
        vector: vec,
      }));
  }, [vectorOrder]);

  const currentIndex = useMemo(() => {
    const idx = vectorOrder.indexOf(currentVectorId);
    return idx === -1 ? 0 : idx;
  }, [vectorOrder, currentVectorId]);

  const currentVector =
    getVector(vectorOrder[currentIndex]) || getVector(currentVectorId);

  const filteredItems = useMemo(() => {
    const q = searchText.trim().toLowerCase();

    if (!q) return vectorItems;

    return vectorItems.filter((item) => {
      return (
        item.id.toLowerCase().includes(q) ||
        item.label.toLowerCase().includes(q) ||
        item.fullLabel.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
      );
    });
  }, [searchText, vectorItems]);

  const groupedItems = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    }, {});
  }, [filteredItems]);

  const switchTo = (nextId) => {
    if (!nextId || nextId === currentVectorId) {
      setIsSearchOpen(false);
      return;
    }

    PackageMapServices.setActiveVector(dispatch, nextId);

    const vec = getVector(nextId);
    const currentFullPath = `${location.pathname}${location.search}`;

    let route;

    if (location.pathname.startsWith('/Methods')) {
      route = vec?.meta?.methods?.route || `/Methods/${nextId}`;
    } else if (location.pathname.startsWith('/MapPage')) {
      route = vec?.meta?.route || `/MapPage?session=${nextId}`;
    }

    if (route && route !== currentFullPath) {
      navigate(route);
    }

    if (typeof onChange === 'function') {
      onChange(nextId, vec);
    }

    setIsSearchOpen(false);
    setSearchText('');
  };

  const goRelative = (offset) => {
    if (!vectorOrder.length) return;

    const len = vectorOrder.length;
    const nextIndex = (currentIndex + offset + len) % len;
    const nextId = vectorOrder[nextIndex];

    switchTo(nextId);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current == null) return;

    const endX = e.changedTouches[0].clientX;
    const delta = endX - touchStartX.current;
    const threshold = 40;

    if (delta > threshold) {
      goRelative(-1);
    } else if (delta < -threshold) {
      goRelative(1);
    }

    touchStartX.current = null;
  };

  useEffect(() => {
    if (!isSearchOpen) return;

    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSearchOpen]);

  if (!vectorOrder.length) return null;

  return (
    <div
      className={`vector-carousel ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      ref={searchRef}
    >
      <button
        type="button"
        className="vector-carousel__arrow vector-carousel__arrow--left"
        onClick={() => goRelative(-1)}
        aria-label="Previous vector"
      >
        &#8249;
      </button>

      <button
        type="button"
        className="vector-carousel__label"
        onClick={() => setIsSearchOpen((prev) => !prev)}
        aria-label="Open vector search"
      >
        <span
          className="vector-carousel__name"
          title={
            currentVector?.shortLabel ||
            currentVector?.label ||
            currentVector?.id ||
            ''
          }
        >
          {currentVector?.shortLabel ||
            currentVector?.label ||
            currentVector?.id ||
            'Unknown'}
        </span>

        <span className="vector-carousel__index">
          {currentIndex + 1} / {vectorOrder.length} · Search
        </span>
      </button>

      <button
        type="button"
        className="vector-carousel__arrow vector-carousel__arrow--right"
        onClick={() => goRelative(1)}
        aria-label="Next vector"
      >
        &#8250;
      </button>

      {isSearchOpen && (
        <div
          className="vector-search-backdrop"
          onMouseDown={() => setIsSearchOpen(false)}
        >
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
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close vector search"
              >
                ×
              </button>
            </div>

            <div className="vector-search-modal__list">
              {Object.keys(groupedItems).length === 0 && (
                <div className="vector-search-modal__empty">
                  No matching vectors
                </div>
              )}

              {Object.entries(groupedItems).map(([groupName, items]) => (
                <div className="vector-search-modal__group" key={groupName}>
                  <div className="vector-search-modal__group-title">
                    {groupName}
                  </div>

                  {items.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      className={`vector-search-modal__item ${
                        item.id === currentVectorId
                          ? 'vector-search-modal__item--active'
                          : ''
                      }`}
                      onClick={() => switchTo(item.id)}
                    >
                      <span className="vector-search-modal__item-label">
                        {item.label}
                      </span>
                      <span className="vector-search-modal__item-id">
                        {item.id}
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VectorCarousel;
