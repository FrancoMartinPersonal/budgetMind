import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import NavScreen from './screens/NavScreen'
import LandingScreen from './screens/LandingScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { loadCookie } from './components/Cookies';
import { ValidateAction } from './actions/actions';
import { authRedirect } from './components/Auth';
import useLog from './hooks/useLog';
import { useNavigate } from 'react-router';
import MainScreen from './screens/MainScreen';



function App() {
  return (
    <BrowserRouter>

      <NavScreen />
      <Routes>

        <Route path="/" element={<MainScreen />} />
    
        <Route path="/register" element={<RegisterScreen />} />

      </Routes>
    </BrowserRouter>
  )
}

const Div = styled.div`
width:100%;
height:100%;
background-color: #232;
`

export default App

