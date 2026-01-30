import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserPosition } from 'store';
import { useCookies } from 'react-cookie';
import { setLocationRequested, setGlobalPosition } from 'store';

export function parseDate(dstr) {
  // Trim whitespace just in case
  dstr = dstr.trim();

  // --- Case 1: ISO week format: YYYY-ww ---
  // Example: 2025-07 (year 2025, ISO week 7)
  if (/^\d{4}-\d{2}$/.test(dstr)) {
    const [year, week] = dstr.split('-').map(Number);

    // ISO rule: Week 1 is the week with the first Thursday in January.
    const date = new Date(Date.UTC(year, 0, 4)); // Jan 4 is always in week 1
    const firstThursday = date.getUTCDay() || 7; // Convert Sunday (0) to 7

    // Move to Monday of Week 1
    date.setUTCDate(date.getUTCDate() - (firstThursday - 1) + (week - 1) * 7);

    return date;
  }

  // --- Case 2: YYYY-MM-DD ---
  if (/^\d{4}-\d{2}-\d{2}$/.test(dstr)) {
    const [year, month, day] = dstr.split('-').map(Number);
    return new Date(year, month - 1, day); // month is zero-indexed
  }

  // --- Case 3: DD-MM-YYYY ---
  if (/^\d{2}-\d{2}-\d{4}$/.test(dstr)) {
    const [day, month, year] = dstr.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  // --- Fallback: Let JS try ---
  return new Date(dstr);
}

export function dateToString(today, sep = '') {
  let d_raw = today.getDate();
  let m_raw = today.getMonth() + 1;
  let y = today.getFullYear();

  var d, m;

  if (d_raw < 10) {
    d = '0' + d_raw.toString();
  } else {
    d = d_raw.toString();
  }
  if (m_raw < 10) {
    m = '0' + m_raw.toString();
  } else {
    m = m_raw.toString();
  }

  return y.toString() + sep + m.toString() + sep + d.toString();
}

export function getCurrentDate(sep = '') {
  let today = new Date();
  return dateToString(today, sep);
}

export function getDateRange(sep = ':') {
  //let today = new Date(new Date().getFullYear(), 0, 1);
  //let tomorrow = new Date(new Date().getFullYear(), 11, 31);
  let today = new Date(2025, 12, 1);
  let tomorrow = new Date(2026, 6, 31);
  return dateToString(today, '-') + sep + dateToString(tomorrow, '-');
}

export function useUserLocation() {
  const [cookies] = useCookies(['cookieConsent']);
  const locationRequested = useSelector(
    (state) => state.location.locationRequested
  );
  const dispatch = useDispatch();

  const handleLocationFound = useCallback(
    (position) => {
      const { latitude, longitude } = position.coords;
      const updatedPosition = { lat: latitude, lng: longitude };
      // dispatch(setUserPosition(updatedPosition));
      dispatch(setGlobalPosition(updatedPosition));
    },
    [dispatch]
  );

  const handleLocationError = (error) => {
    dispatch(setGlobalPosition({ lat: 35.1966527, lng: 33.3217152 }));
    // console.log(error);
  };

  const handleRequestLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      handleLocationFound,
      handleLocationError
    );
  }, [handleLocationFound]);
  // useEffect(() => {
  //   cookies.cookieConsent && setConsentGiven(true);
  // });

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'denied' && locationRequested) {
        // window.confirm("Location Permission is required for this action");
        dispatch(setGlobalPosition({ lat: 35.1966527, lng: 33.3217152 }));
        dispatch(setUserPosition({ lat: 35.1966527, lng: 33.3217152 }));
        dispatch(setLocationRequested(false));
      }
    });

    if (navigator.geolocation && locationRequested) {
      handleRequestLocation();
    } else {
      // window.prompt("we couldnt get your location");
    }
  }, [
    handleRequestLocation,
    locationRequested,
    dispatch,
    cookies.cookieConsent,
  ]);

  return;
}
export function getCookie(name) {
  return (
    document.cookie
      .split('; ')
      .find((row) => row.startsWith(name + '='))
      ?.split('=')[1] || ''
  );
}
