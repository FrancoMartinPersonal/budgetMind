import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import useLog from '../hooks/useLog'
import HomeScreen from './HomeScreen';
import LandingScreen from './LandingScreen';
import { authRedirect } from '../components/Auth';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allActions } from '../actions';
import { loadCookie, saveCookie } from '../components/Cookies';

function MainScreen() {
    const { authLog, tokenLog } = useLog()
    const dispatch = useDispatch()
    const { LoginAction, ValidateAction } = bindActionCreators(allActions, dispatch)


  
    // useEffect(() => {
    //     ValidateAction(cookieloaded)
    //     return () => {

    //     }
    // }, [cookieloaded])
    useEffect(() => {
        let cookieloaded = loadCookie("token")
        console.log(cookieloaded, 'use eff cookloa')
        if (cookieloaded) ValidateAction(cookieloaded)
    }, [])
    useEffect(() => {
        let cookieloaded = loadCookie("token")
        if (!cookieloaded) {
        let tokenRes = saveCookie({ name: 'token', value: tokenLog, time: 30 })
        console.log(tokenRes)
        ValidateAction(tokenRes)
        }

        return () => {

        }
    }, [tokenLog])
    /*  if you dont connect or let the back on, the flow doesnt work*/

    return (
        <>
            {/* authLog == undefined ? null : */}
            {

                authLog == true ? <HomeScreen /> : <LandingScreen />

            }
        </>
    )
}



export default MainScreen