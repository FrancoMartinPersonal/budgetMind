import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components'
import { colors } from '../themes/Colors'
import { bindActionCreators, Dispatch } from 'redux';
import { allActions } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { loadCookie, saveCookie, SaveInfoInterface } from '../components/Cookies';
//import Auth from '../components/Auth';
import { ValidateAction } from '../actions/actions';
import useLog from '../hooks/useLog';
import { authRedirect } from '../components/Auth';
import { InterfaceLogin } from '../constants/constants';
import { ButtonSend, ErrorMessage, FormSend, LoginDiv, LoginInput, LoginMainText, LoginTag, LoginTagInputDiv, RegisterDiv, RegisterLink, RegisterText } from '../themes/styledConstants';
//1164579862



function LoginScreen() {
    const dispatch = useDispatch()
    const { LoginAction, ValidateAction } = bindActionCreators(allActions, dispatch)
    const { tokenLog, tokenMsgLog, authLog, authInfoLog, authILoginLog } = useLog()
    const navigate = useNavigate()
    // const auth = useAuth()

    const [state, setState] = useState({
        mailoruser: "",
        password: ""

    })


    useEffect(() => {
        let tokenRes = saveCookie({ name: 'token', value: tokenLog, time: 30 })
        console.log(tokenRes)
        ValidateAction(tokenRes)

        return () => {

        }
    }, [tokenLog])

    const onChangeInputs = (e: any) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
            //its save automaticaclly based in its name
        })

    }

    const OnFormSend = (e: any) => {
        e.preventDefault()

        const { mailoruser, password } = state;


        if (mailoruser.length > 1 && password.length > 1) {

            //console.log(state, "state before send or not")
            if (mailoruser.includes('@')) {
                LoginAction({
                    mail: mailoruser,
                    user: "",
                    password
                })
            } else {
                LoginAction({
                    mail: "",
                    user: mailoruser,
                    password
                })
            }

            console.log(state)
            setState({
                mailoruser: "",
                password: ""
            })
        } else {
            console.log('theres no enough info')
        }

    }

    console.log(state)

    return (
        <LoginDiv>
            <LoginMainText>
                login
            </LoginMainText>
            <FormSend onSubmit={e => OnFormSend(e)}>
                <LoginTagInputDiv>
                    <LoginTag htmlFor="mailoruser">
                        username, mail
                    </LoginTag>
                    <LoginInput type='text' name='mailoruser' value={state.mailoruser}
                        onChange={(e) => onChangeInputs(e)} />

                    <LoginTag htmlFor="password">
                        password
                    </LoginTag>
                    <LoginInput type='password' name='password' value={state.password}
                        onChange={(e) => onChangeInputs(e)} />
                </LoginTagInputDiv>
                <ErrorMessage>
                    {tokenMsgLog}
                </ErrorMessage>
                <ButtonSend>log in</ButtonSend>
            </FormSend  >
            < RegisterDiv>

                <RegisterText>
                    you are not registered?
                </RegisterText>

                <RegisterLink to='/register'>
                    register
                </RegisterLink>
            </RegisterDiv>
        </LoginDiv>
    )
}



export default LoginScreen
