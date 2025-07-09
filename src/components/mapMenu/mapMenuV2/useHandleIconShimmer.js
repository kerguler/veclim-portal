import { useEffect } from 'react';
import { setShimmered } from 'store';
function useHandleIconShimmer(shouldShimmer, shimmered, item, dispatch, direction, setShimmerOn) {
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
  }, [shouldShimmer, shimmered]);
  //   className = classNames(className, shimmerOn ? 'shimmer-on' : 'shimmer-off');
}

export default useHandleIconShimmer;
