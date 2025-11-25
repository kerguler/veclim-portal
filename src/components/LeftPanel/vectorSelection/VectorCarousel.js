// src/components/LeftPanel/vectorSelection/VectorCarousel.js
import React, { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { VECTORS, ALL_VECTORS, getVector } from 'vectors/registry';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';

import './VectorCarousel.css';

const VectorCarousel = ({ className = '', onChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentVectorId = useSelector(
    (state) => state.fetcher.fetcherStates.vectorName
  );

  // Order of vectors (deduped, but stable)
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

  const currentIndex = useMemo(() => {
    const idx = vectorOrder.indexOf(currentVectorId);
    return idx === -1 ? 0 : idx;
  }, [vectorOrder, currentVectorId]);

  const currentVector =
    getVector(vectorOrder[currentIndex]) || getVector(currentVectorId);

  const switchTo = (nextId) => {
    if (!nextId || nextId === currentVectorId) return;

    PackageMapServices.handleMapSwitch(dispatch, currentVectorId, nextId);

    const vec = getVector(nextId);
    const route = vec?.map?.routePath;
    if (route && route !== location.pathname) {
      navigate(route);
    }

    if (typeof onChange === 'function') {
      onChange(nextId, vec);
    }
  };

  const goRelative = (offset) => {
    if (!vectorOrder.length) return;
    const len = vectorOrder.length;
    const nextIndex = (currentIndex + offset + len) % len;
    const nextId = vectorOrder[nextIndex];
    switchTo(nextId);
  };

  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    // just store last position if you want, or ignore
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches[0].clientX;
    const delta = endX - touchStartX.current;
    const threshold = 40; // px

    if (delta > threshold) {
      // swipe right → previous
      goRelative(-1);
    } else if (delta < -threshold) {
      // swipe left → next
      goRelative(1);
    }

    touchStartX.current = null;
  };

  if (!vectorOrder.length) {
    return null;
  }

  return (
    <div
      className={`vector-carousel ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        className="vector-carousel__arrow vector-carousel__arrow--left"
        onClick={() => goRelative(-1)}
        aria-label="Previous vector"
      >
        &#8249;
      </button>

      <div className="vector-carousel__label">
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
          {currentIndex + 1} / {vectorOrder.length}
        </span>
      </div>

      <button
        type="button"
        className="vector-carousel__arrow vector-carousel__arrow--right"
        onClick={() => goRelative(1)}
        aria-label="Next vector"
      >
        &#8250;
      </button>
    </div>
  );
};

export default VectorCarousel;
