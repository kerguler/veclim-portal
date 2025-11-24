import { useEffect } from 'react';
import { setShimmered } from 'store';
import useDirectorFun from 'customHooks/useDirectorFun';
function useHandleIconShimmer(shouldShimmer, shimmered, item, dispatch, direction, setShimmerOn) {
  const { openItems } = useDirectorFun('left');

  useEffect(() => {
    if (Object.keys(openItems).length !== 0) {
      setShimmerOn(false);
    } else {
      setShimmerOn(true);
    }
  }, [openItems]);

  useEffect(() => {
    if (shouldShimmer && !shimmered[item.key]) {
      setShimmerOn(true);

      const timeout = setTimeout(() => {
        setShimmerOn(false);
        let key = item['key'];

        dispatch(
          setShimmered({
            direction,
            value: { ...shimmered, [key]: true },
          })
        );
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [shouldShimmer, shimmered, openItems]);
  //   className = classNames(className, shimmerOn ? 'shimmer-on' : 'shimmer-off');
}

export default useHandleIconShimmer;
