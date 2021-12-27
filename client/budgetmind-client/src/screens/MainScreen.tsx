import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import useLog from '../hooks/useLog'
import HomeScreen from './HomeScreen';
import LandingScreen from './LandingScreen';
import { authRedirect } from '../components/Auth';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allActions } from '../actions';
import { loadCookie } from '../components/Cookies';

function MainScreen() {
    const { authLog } = useLog()
    const dispatch = useDispatch()
    const { LoginAction, ValidateAction } = bindActionCreators(allActions, dispatch)


    let cookieloaded = loadCookie("token")
    useEffect(() => {
        ValidateAction(cookieloaded)
        return () => {

        }
    }, [cookieloaded])
    /*  if you dont connect or let the back on, the flow doesnt work*/
  
    return (
        <>
        {/* authLog == undefined ? null : */}
        {
                authLog == undefined ? <LandingScreen /> :
                authLog == true ? <HomeScreen />:<LandingScreen /> 
                    
            }
        </>
    )
}



export default MainScreen