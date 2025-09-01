import './alboParams.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SliderRow from './SliderRow';
import SimDataMessenger from './SimDataMessenger';
import LoginComponent from 'pages/LoginRegister/LoginComponent/LoginComponent';
import SimulationListCurrent from 'pages/ApiWelcomePage/SimulationList/SimulationListCurrent';

import { useLogoutMutation } from 'store';
import { setApiRegisterResponse, setPassword } from 'store';
import useCsrf from 'pages/LoginRegister/Services/useCsrf';

function AlboParams() {
  const dispatch = useDispatch();
  const { refresh } = useCsrf();

  const direction = 'left';
  const apiReg = useSelector((s) => s.login.apiRegisterResponse);
  const userID = apiReg?.userId;
  const userName = apiReg?.userName;

  const [showPanel, setShowPanel] = useState(false);
  const [logout, { isLoading: loggingOut }] = useLogoutMutation();

  useEffect(() => {
    setShowPanel(Boolean(userID));
  }, [userID]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();          // server clears session cookie
    } catch (e) {
      console.error('Logout failed (continuing cleanup):', e);
    }
    // local cleanup
    dispatch(setApiRegisterResponse({
      response: null, status: null, message: null, userName: null, userId: null,
    }));
    dispatch(setPassword(''));          // don’t keep password in Redux
    localStorage.removeItem('id');      // optional local storage cleanup
    await refresh();                    // get a fresh CSRF cookie after logout
  };

return showPanel ? (
    <div className="albo-params-container">
      <div className="albo-header">
        <span className="albo-user">
          {userName ? `Signed in as ${userName}` : 'Signed in'}
        </span>
        <button
          type="button"
          className="link-btn logout"
          onClick={handleLogout}
          disabled={loggingOut}
          aria-label="Log out"
        >
          {loggingOut ? 'Logging out…' : 'Log out'}
        </button>
      </div>

      <SliderRow direction={direction} />
      <SimDataMessenger direction={direction} />
      <SimulationListCurrent direction={direction} />
    </div>
  ) : (
    <div className="albo-params-container">
      <LoginComponent />
    </div>
  );
}

export default AlboParams;



// import './alboParams.css';
// import { useEffect, useState } from 'react';
// import SliderRow from './SliderRow';
// import SimDataMessenger from './SimDataMessenger';
// import LoginComponent from 'pages/LoginRegister/LoginComponent/LoginComponent';
// import { useSelector } from 'react-redux';
// import SimulationList from 'pages/ApiWelcomePage/SimulationList/SimulationList';
// import useCsrf from 'pages/LoginRegister/Services/useCsrf';
// import SimulationListCurrent from 'pages/ApiWelcomePage/SimulationList/SimulationListCurrent';
// function AlboParams() {
//   // useCsrf(false); // Initialize CSRF token for API requests
//   let direction = 'left';
//   const [showPanel, setShowPanel] = useState(false);
//   const userID = useSelector((state) => state.login.apiRegisterResponse.userId);

//   useEffect(() => {
//     if (userID) {
//       setShowPanel(true);
//     } 
//     // else {
//     //   console.log('No user ID found', userID);
//     // }
//   }, [userID]);

//   return showPanel ? (
//     <div className="albo-params-container">
//       <SliderRow direction={direction} />
//       <SimDataMessenger direction={direction} />
//       <SimulationListCurrent direction={direction} />
//     </div>
//   ) : (
//     <div className="albo-params-container">
//       <LoginComponent />
//     </div>
//   );
// }
// export default AlboParams;
