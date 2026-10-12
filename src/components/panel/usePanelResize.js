import { useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import useDirectorFun from 'customHooks/useDirectorFun';

function usePanelResize({ panelRef, direction, setPanelTop }) {
  const dispatch = useDispatch();
  const { panelOpen } = useDirectorFun(direction);

  const lastTopRef = useRef(null);

  const measureAndStoreTop = useCallback(() => {
    const el = panelRef.current;
    if (!el) return;

    const top = el.getBoundingClientRect().top;

    // 🔥 critical: don't dispatch if unchanged
    if (lastTopRef.current === top) return;
    lastTopRef.current = top;

    dispatch(setPanelTop({ direction, value: top }));
  }, [dispatch, direction, setPanelTop, panelRef]);

  useEffect(() => {
    measureAndStoreTop();

    window.addEventListener('resize', measureAndStoreTop);
    // panel height changes (skeleton -> chart) move its top
    // next frame, avoids resize-observer loop
    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measureAndStoreTop);
    });
    if (panelRef.current) ro.observe(panelRef.current);
    return () => {
      window.removeEventListener('resize', measureAndStoreTop);
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [measureAndStoreTop, panelOpen]);
}

export default usePanelResize;
