import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setCsrfToken } from 'store/slices/loginSlice';
import { getCookie } from 'store/apis/utils';
// 👇 use the lazy hook RTKQ generates for your endpoint
import { useLazyFetchCsrfQuery } from 'store';

export default function useCsrf() {
  const dispatch = useDispatch();
  const [trigger, { data, isFetching, isSuccess }] = useLazyFetchCsrfQuery();

  // cookie might be unreadable cross-origin; this is just a hint
  const hasCookie = useMemo(() => !!getCookie('csrftoken'), []);

  // call this whenever you need to ensure a fresh CSRF cookie
  const refresh = useCallback(async () => {
    const res = await trigger().unwrap();
    if (res?.csrftoken) dispatch(setCsrfToken(res.csrftoken));
    return res;
  }, [trigger, dispatch]);

  // if the server sent a token in JSON, persist it to redux
  useEffect(() => {
    if (data?.csrftoken) dispatch(setCsrfToken(data.csrftoken));
  }, [data, dispatch]);

  return {
    ready: hasCookie || isSuccess || isFetching,
    refresh, // always safe to call now
  };
}
