// hooks/useCsrf.js
import { useEffect } from "react";
import { useFetchCsrfQuery } from "store";
import { useDispatch } from "react-redux";
import { setCsrfToken } from "store/slices/loginSlice";
import { getCookie } from "store/apis/utils";

export default function useCsrf() {
  // If you’re truly cross-origin, this will usually be false (can’t read cookie).
  const hasCookie = !!getCookie("csrftoken");
  const { data, isFetching, isSuccess, refetch } = useFetchCsrfQuery(
    undefined,
    { skip: hasCookie } // hit /csrf/ only if no cookie visible
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.csrftoken) dispatch(setCsrfToken(data.csrftoken));
  }, [data, dispatch]);

  return { ready: hasCookie || isSuccess || isFetching, refresh: refetch };
}


// import { useDispatch } from "react-redux";
// import { useEffect,useState } from "react";
// import { setCsrfToken } from "store"; // Adjust this import path as necessary
// import { useFetchCsrfQuery } from "store"; // Ensure this is correctly imported
// import { getCookie } from "store/apis/utils";


// export default function useCsrf() {
//   const API_BASE = process.env.REACT_APP_DEV_URL; // <-- unify with baseQuery
//   const [ready, setReady] = useState(() => !!getCookie("csrftoken"));

//   useEffect(() => {
//     let cancelled = false;

//     async function prime() {
//       // if cookie already exists, we're done
//       if (getCookie("csrftoken")) {
//         if (!cancelled) setReady(true);
//         return;
//       }
//       try {
//         await fetch(`${API_BASE}/csrf/`, { credentials: "include" });
//       } catch {
//         // ignore — cookie might still exist or be set later
//       } finally {
//         if (!cancelled) setReady(!!getCookie("csrftoken"));
//       }
//     }

//     prime();

//     // optional: after login Django rotates csrftoken; re-check on focus
//     const recheck = () => setReady(!!getCookie("csrftoken"));
//     window.addEventListener("focus", recheck);
//     document.addEventListener("visibilitychange", recheck);

//     return () => {
//       cancelled = true;
//       window.removeEventListener("focus", recheck);
//       document.removeEventListener("visibilitychange", recheck);
//     };
//   }, [API_BASE]);

//   return ready; // you can ignore this for GETs and just call the hook for side-effect
// }

