// src/components/LeftPanel/vectorSelection/VectorCarousel.js
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { VECTORS, ALL_VECTORS, getVector } from 'vectors/registry';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';

import VectorSearchModal from './VectorSearchModal';
import VectorSearchAccordion from './VectorSearchAccordion';

import './VectorCarousel.css';

const VECTOR_SELECTOR_VARIANT = 'accordion';
// const VECTOR_SELECTOR_VARIANT = 'modal';

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

    return ALL_VECTORS.filter((v) => {
      if (!v?.id || !VECTORS[v.id] || seen.has(v.id)) return false;
      seen.add(v.id);
      return true;
    }).map((v) => v.id);
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

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchText('');
  };

  const switchTo = (nextId) => {
    if (!nextId || nextId === currentVectorId) {
      closeSearch();
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

    onChange?.(nextId, vec);

    closeSearch();
  };

  const goRelative = (offset) => {
    if (!vectorOrder.length) return;

    const len = vectorOrder.length;
    const nextIndex = (currentIndex + offset + len) % len;
    switchTo(vectorOrder[nextIndex]);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current == null) return;

    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;

    if (delta > threshold) goRelative(-1);
    if (delta < -threshold) goRelative(1);

    touchStartX.current = null;
  };

  useEffect(() => {
    if (!isSearchOpen) return;

    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        closeSearch();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') closeSearch();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSearchOpen]);

  if (!vectorOrder.length) return null;

  const selectorProps = {
    groupedItems,
    searchText,
    setSearchText,
    currentVectorId,
    switchTo,
    closeSearch,
  };

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

      {isSearchOpen && VECTOR_SELECTOR_VARIANT === 'modal' && (
        <VectorSearchModal {...selectorProps} />
      )}

      {isSearchOpen && VECTOR_SELECTOR_VARIANT === 'accordion' && (
        <VectorSearchAccordion {...selectorProps} />
      )}
    </div>
  );
};

export default VectorCarousel;
