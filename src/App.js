import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import 'styles/Theme1.css';
import 'styles/App.css';
import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';
import CookieHandler from './components/cookieConsent/CookieHandler';
import { useUserLocation } from './store/apis/utils';
import { PanelProvider } from 'context/panelsIconsV2';
import useIsStaff from 'customHooks/useIsStaff';
import SimulationCompletionWatcher from 'components/SimulationList/SimulationCompletionWatcher';
import {
  MethodsRouteGuard,
  MapRouteGuard,
} from 'components/routeGuards/VectorRouteGuard';
import RouteNotice from 'components/routeGuards/RouteNotice';
const GenericPage = lazy(() => import('pages/GenericPage/GenericPage'));
const NoPage = lazy(() => import('pages/NoPage'));
const MapPackageLandingV2 = lazy(() => import('pages/MapPackageLanding'));
const VectorMethodsPage = lazy(() => import('pages/VectorMethodsPage'));
function App() {
  useUserLocation();
  // fires the /me check once so its cached before draft gating needs it
  useIsStaff();
  return (
    <div className="app">
      <div className="page-container">
        <CookieHandler></CookieHandler>
        <SimulationCompletionWatcher />

        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<GenericPage />} />
              <Route path="/Project" element={<GenericPage />} />
              <Route path="/Policy" element={<GenericPage />} />
              {/* <Route
							path='/Methods/TigerMosquito'
							element={<GenericPage />}
						/>
						<Route
							path='/Methods/SandFly'
							element={<GenericPage />}
						/> */}
              <Route
                path="/Methods/:vecId"
                element={
                  <MethodsRouteGuard>
                    <VectorMethodsPage />
                  </MethodsRouteGuard>
                }
              />

              <Route path="/404" element={<NoPage />} />
              <Route
                path="/MapPage"
                element={
                  <MapRouteGuard>
                    <PanelProvider>
                      <MapPackageLandingV2 />
                    </PanelProvider>
                  </MapRouteGuard>
                }
              />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <RouteNotice />
      </div>
    </div>
  );
}

export default App;
