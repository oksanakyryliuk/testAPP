import * as React from 'react';
import Box from '@mui/material/Box';
import { useAuth } from '../auth/hooks/useAuth';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AppModules } from '../common/enums/AppModules';

const HomePage = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Box>
      {isLoggedIn ? (
        <Link component={RouterLink} to={AppModules.Home}>
          Dashboard
        </Link>
      ) : (
        <Link component={RouterLink} to={AppModules.Login}>
          Login
        </Link>
      )}
    </Box>
  );
};

export default HomePage;