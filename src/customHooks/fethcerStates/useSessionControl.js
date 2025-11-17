import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import useDirectorFun from 'customHooks/useDirectorFun';
import { setMapVector, setVectorName, setDirectInitError } from 'store';

function useSessionControl(session) {
  const direction = 'left';
  const { vectorNames, mapVector } = useDirectorFun(direction);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!session) {
      // no session in URL → do nothing; mapVector/initial state will be used
      return;
    }

    // 1) validate session against known vector ids
    if (!vectorNames.includes(session)) {
      const e = new Error('No Session Found');
      e.type = 'SessionError';
      e.heading = `Session ${session} Not Found`;
      e.explanation = `Available sessions are: ${vectorNames.join(', ')}`;

      dispatch(
        setDirectInitError({
          direction,
          value: {
            isError: true,
            message: {
              heading: e.heading,
              explanation: e.explanation,
            },
            type: e.type,
          },
        })
      );
      return;
    }

    // 2) Apply the session:
    //    If the current map vector is different, ask PackageMapServices
    //    to do a full switch based on the vector's module config.
    if (mapVector !== session) {
      PackageMapServices.handleMapSwitch(dispatch, mapVector, session);
    } else {
      // Already on this vector (e.g. user changed query params manually),
      // just make sure names are correct.
      dispatch(setMapVector(session));
      dispatch(setVectorName(session));
    }
  }, [session, vectorNames, mapVector, dispatch]);
}

export default useSessionControl;
