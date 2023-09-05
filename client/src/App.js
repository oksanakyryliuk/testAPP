import React from 'react';
// import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { muiDarkTheme } from './common/config/theme.ts';
function App() {
  return (
    <ThemeProvider theme={muiDarkTheme}>
        <CssBaseline />
    <div className="App">
      
          REACT APP
    </div>

    </ThemeProvider>
  );
}

export default App;
