import * as React from 'react';
import Box from '@mui/material/Box';
import { useAuth } from '../auth/hooks/useAuth';
import { AppModules } from '../common/enums/AppModules';
import {Link as RouterLink} from "react-router-dom";
import {Link} from "@mui/material";
import  { Navigate } from 'react-router-dom'
const HomePage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', 
      }}
    >
      {isLoggedIn ? (
          <Navigate to={AppModules.Main} replace={true}/>
          ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <RouterLink to={AppModules.Login} style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                backgroundColor: '#d2ebf2', 
                color: 'black',
                padding: '10px 20px',
                borderRadius: '4px',
                textAlign: 'center',
                width: '200px', 
              }}
            >
              Login
            </Box>
          </RouterLink>
          <RouterLink to={AppModules.Register} style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                backgroundColor: '#d2ebf2',
                color: 'black', 
                padding: '10px 20px',
                borderRadius: '4px',
                textAlign: 'center',
                width: '200px', 
              }}
            >
              Register
            </Box>
          </RouterLink>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;