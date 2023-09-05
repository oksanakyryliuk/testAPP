import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { muiDarkTheme } from './common/config/theme.ts';
import {AppModules} from "./common/enums/AppModules";
import LoginPage from './auth/login/Login';
import HomePage from './home/Home.tsx'
const router = createBrowserRouter(
  createRoutesFromElements(
      <>
          {/* <Route element={<PrivateRoutes />}>
              <Route path={AppModules.Home} element={<HomePage/>} />
          </Route> */}
            <Route path={AppModules.Home} element={<HomePage/>} />
          <Route path={AppModules.Login} element={<LoginPage/>} />
          {/* <Route path={AppModules.Register} element={<Register/>} /> */}
      </>,
  ),
);

function App() {
  return (
    <ThemeProvider theme={muiDarkTheme}>
        <CssBaseline />
    <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
