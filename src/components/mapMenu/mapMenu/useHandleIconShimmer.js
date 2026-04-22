import { useEffect } from 'react';
import { setShimmered } from 'store';
import useDirectorFun from 'customHooks/useDirectorFun';

function useHandleIconShimmer(
  shouldShimmer,
  shimmered,
  item,
  dispatch,
  direction,
  setShimmerOn
) {
  const { openItems } = useDirectorFun('left');
  const itemKey = item?.key;
  const isMenuClosed = Object.keys(openItems || {}).length === 0;
  const hasAlreadyShimmered = !!shimmered?.[itemKey];

  useEffect(() => {
    setShimmerOn((prev) => {
      const next = isMenuClosed;
      return prev === next ? prev : next;
    });
  }, [isMenuClosed, setShimmerOn]);

  useEffect(() => {
    if (!itemKey) return;
    if (!shouldShimmer) return;
    if (hasAlreadyShimmered) return;
    if (!isMenuClosed) return;

    setShimmerOn((prev) => (prev === true ? prev : true));

    const timeout = setTimeout(() => {
      setShimmerOn((prev) => (prev === false ? prev : false));

      dispatch(
        setShimmered({
          direction,
          value: {
            ...(shimmered || {}),
            [itemKey]: true,
          },
        })
      );
    }, 3000);

    return () => clearTimeout(timeout);
  }, [
    itemKey,
    shouldShimmer,
    hasAlreadyShimmered,
    isMenuClosed,
    shimmered,
    dispatch,
    direction,
    setShimmerOn,
  ]);
}

export default useHandleIconShimmer;
