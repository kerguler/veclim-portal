import { useEffect, useRef } from 'react';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { useDispatch } from 'react-redux';
import { setDividerPosition } from 'store';
import useDirectorFun from 'customHooks/useDirectorFun';
function useSeparatorActions(mapParRef) {
  const { mapVector, mapPagePosition, tileArray } = useDirectorFun('left');

  const dispatch = useDispatch();
  const dragRef = useRef(false);
  useEffect(() => {
    const handleMarkers = () => {
      PackageMapServices.markerHandler(mapParRef, 4, mapVector, dispatch, mapPagePosition);
    };
    const handleSepClick = (e) => {

      handleMarkers();
      e.stopPropagation();
    };
    const handleDividerInput = (e) => {
      const sliderValue = e.target.value;
      dispatch(setDividerPosition(sliderValue));
    };
    const sliderElement = document.querySelector('.leaflet-sbs-range');

    // 2) Attach the event listener
    if (sliderElement) {
      // 'input' fires continuously while the user drags,
      // 'change' fires only after releasing the slider
      sliderElement.addEventListener('input', handleDividerInput);
    }

    let circularHandle = document.querySelector('.leaflet-sbs-range ');
    circularHandle && circularHandle.addEventListener('click', handleSepClick);
    return () => {
      circularHandle && circularHandle.removeEventListener('click', handleSepClick);
      circularHandle = null;
      if (sliderElement) {
        sliderElement.removeEventListener('input', handleDividerInput);
      }
    };
  });

  // The round handle sits at mid-height and can end up behind an open panel.
  // So: hovering the line brings the handle to the cursor's height, and the
  // line itself can be dragged from any point.
  useEffect(() => {
    const divider = document.querySelector('.leaflet-sbs-divider');
    const range = document.querySelector('.leaflet-sbs-range');
    const map = mapParRef.current?.map;
    const control = mapParRef.current?.sideBySide;
    if (!divider || !range || !map) return;

    const mapEl = map.getContainer();
    // ref, not a local: each move updates the store, re-renders and re-runs
    // this effect, and the drag has to survive that
    const drag = dragRef;

    // inverse of leaflet-side-by-side getPosition()
    const valueFromX = (clientX) => {
      const rect = mapEl.getBoundingClientRect();
      const opts = control?.options || {};
      const t = 2 * (opts.padding || 0) + (opts.thumbSize || 42);
      const x = clientX - rect.left;
      const v = (x - t / 2) / (rect.width - t);
      return Math.min(1, Math.max(0, v));
    };

    const moveHandleTo = (clientY) => {
      const rect = mapEl.getBoundingClientRect();
      const y = Math.min(rect.height - 25, Math.max(25, clientY - rect.top));
      range.style.top = `${y}px`;
    };

    const onHover = (e) => {
      if (!drag.current) moveHandleTo(e.clientY);
    };

    const onDown = (e) => {
      drag.current = true;
      divider.setPointerCapture?.(e.pointerId);
      map.dragging.disable();
      moveHandleTo(e.clientY);
      e.preventDefault();
      e.stopPropagation();
    };

    const applyX = (e) => {
      range.value = valueFromX(e.clientX);
      // same path as dragging the handle: updates the clip and the store
      range.dispatchEvent(new Event('input', { bubbles: true }));
      moveHandleTo(e.clientY);
    };

    const onMove = (e) => {
      if (drag.current) applyX(e);
    };

    const onUp = (e) => {
      if (!drag.current) return;
      applyX(e);
      drag.current = false;
      divider.releasePointerCapture?.(e.pointerId);
      map.dragging.enable();
      e.stopPropagation();
    };

    // releasing on the line must not count as a map click (marker / location panel)
    const swallowClick = (e) => e.stopPropagation();

    divider.addEventListener('pointerenter', onHover);
    divider.addEventListener('pointermove', onHover);
    divider.addEventListener('pointerdown', onDown);
    divider.addEventListener('pointermove', onMove);
    divider.addEventListener('pointerup', onUp);
    divider.addEventListener('pointercancel', onUp);
    divider.addEventListener('click', swallowClick);
    divider.addEventListener('mousedown', swallowClick);
    divider.addEventListener('mouseup', swallowClick);
    return () => {
      divider.removeEventListener('click', swallowClick);
      divider.removeEventListener('mousedown', swallowClick);
      divider.removeEventListener('mouseup', swallowClick);
      divider.removeEventListener('pointerenter', onHover);
      divider.removeEventListener('pointermove', onHover);
      divider.removeEventListener('pointerdown', onDown);
      divider.removeEventListener('pointermove', onMove);
      divider.removeEventListener('pointerup', onUp);
      divider.removeEventListener('pointercancel', onUp);
    };
  });
}

export default useSeparatorActions;
