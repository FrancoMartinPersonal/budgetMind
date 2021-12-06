import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import NavScreen from './screens/NavScreen'
import LandingScreen from './screens/LandingScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <BrowserRouter>

      <NavScreen />
      <Routes>
     
        <Route path="/" element={<LandingScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        
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

