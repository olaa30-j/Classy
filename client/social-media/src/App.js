import React from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'screens/homepage';
import LoginPage from 'screens/loginpage';
import ProfilePage from 'screens/profilepage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import { themeSettings } from 'theme';

const App = () => {
  const mode = useSelector((state) => state.mode);
  let theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuthSuccess = Boolean(useSelector((state) => state.token))


  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path='/home' element={isAuthSuccess ? <HomePage /> : <Navigate to="/" />} />
            <Route path='/profile/:userId' element={isAuthSuccess ? <ProfilePage /> : <Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App