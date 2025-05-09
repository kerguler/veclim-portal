import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCsrfToken } from 'store'; // Adjust this import path as necessary
import { useFetchCsrfQuery } from 'store'; // Ensure this is correctly imported

function useCsrf(checkToken) {
	const dispatch = useDispatch();
	const { data: csrfData, error: csrfError, refetch } = useFetchCsrfQuery();
	useEffect(() => {
		if (!checkToken) {
			refetch();
		}
	}, [refetch, checkToken]);

	useEffect(() => {
		if (checkToken) {
			const localToken = localStorage.getItem('csrfToken');
			if (localToken) {
				dispatch(setCsrfToken(localToken));
			}
		}
		// Refetch the CSRF token at app start or when needed to refresh

		// When a CSRF token is successfully fetched
		else if (csrfData && !csrfError) {
			const { csrfToken } = csrfData;
			// Update CSRF token in localStorage
			localStorage.setItem('csrfToken', csrfToken);
			// Dispatch action to update CSRF token in the global state
			dispatch(setCsrfToken(csrfToken));
		}
	}, [csrfData, csrfError, dispatch, checkToken]);

	// Optionally, expose a method to manually refresh the CSRF token
	const refreshCsrfToken = () => {
		refetch();
	};

	return { refreshCsrfToken };
}

export default useCsrf;
