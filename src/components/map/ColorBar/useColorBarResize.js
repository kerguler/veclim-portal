import useDirectorFun from 'customHooks/useDirectorFun';
import { useLayoutEffect, useRef } from 'react';

export default function useColorBarResize(
  leftRef,
  rightRef,
  panelOpen,
  panelTop1,
  times,
  setStyle,
  ready
) {
  const { openItems,panelTop} = useDirectorFun('left');
  const secondaryMenuOpen = Object.prototype.hasOwnProperty.call(
    openItems,
    'secondary_menu_icon'
  );
  const firstPaintRef = useRef(true); // <-- NEW

  useLayoutEffect(() => {
    if (!ready || !leftRef?.current) return;

    const placeBars = () => {
      const vh = window.visualViewport?.height || window.innerHeight;
      const leftH = leftRef.current?.getBoundingClientRect().height || 0;
      const rightH = rightRef.current?.getBoundingClientRect().height || 0;
      console.log({
        innerWidth: window.innerWidth,
        panelOpen,
        panelTop,
        leftH,
        computed: panelTop - leftH - 20,
      });

      let topL, topR;
      if (window.innerWidth <= 499) {
        if (panelOpen) {
          topL = Math.max(0, panelTop - leftH - 20);
          topR = Math.max(0, panelTop - rightH - 20);
        } else {
          const bottomPx = (secondaryMenuOpen ? 0.075 : 0.05) * vh;
          topL = vh - bottomPx - leftH;
          topR = vh - bottomPx - rightH;
        }
      } else {
        const bottomPx = 0.01 * vh;
        topL = vh - bottomPx - leftH;
        topR = vh - bottomPx - rightH;
      }

      // setStyle([
      //   { transform: `translateY(${Math.round(topL)}px)` },
      //   { transform: `translateY(${Math.round(topR)}px)` },
      // ]);

      const styleL = { transform: `translateY(${Math.round(topL)}px)` };
      const styleR = { transform: `translateY(${Math.round(topR)}px)` };

      if (firstPaintRef.current) {
        // 1) set without animation
        setStyle([
          { ...styleL, transition: 'none' },
          { ...styleR, transition: 'none' },
        ]);

        // 2) next frame: remove the inline override so CSS transitions work later
        requestAnimationFrame(() => {
          firstPaintRef.current = false;
          setStyle([styleL, styleR]); // same transform, but no inline 'transition'
        });
      } else {
        setStyle([styleL, styleR]);
      }
    };
    // defer first measure until after paint
    const defer = () =>
      requestAnimationFrame(() => requestAnimationFrame(placeBars));
    defer();

    const ro = new ResizeObserver(placeBars);
    leftRef.current && ro.observe(leftRef.current);
    rightRef?.current && ro.observe(rightRef.current);

    const mo = new MutationObserver(defer);
    const moOpts = { childList: true, subtree: true, characterData: true };
    leftRef.current && mo.observe(leftRef.current, moOpts);
    rightRef?.current && mo.observe(rightRef.current, moOpts);

    window.addEventListener('resize', placeBars);

    return () => {
      window.removeEventListener('resize', placeBars);
      ro.disconnect();
      mo.disconnect();
    };
  }, [
    ready,
    panelOpen,
    panelTop,
    secondaryMenuOpen,
    times,
    leftRef,
    rightRef,
    setStyle,
  ]);
}
