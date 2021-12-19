import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { authRedirect } from '../components/Auth';
import useLog from '../hooks/useLog';
import { ButtonSend, ErrorMessage, FormSend, LoginDiv, LoginInput, LoginMainText, LoginTag, LoginTagInputDiv, MainDiv, RegisterText, RegisterDiv, RegisterLink } from '../themes/styledConstants';
import { useNavigate } from 'react-router-dom';
import { loadCookie } from '../components/Cookies';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allActions } from '../actions';


function RegisterScreen() {
    const { tokenLog, tokenMsgLog, authLog, authInfoLog, authILoginLog } = useLog()
    const navigate = useNavigate()
    let tokenLoaded = loadCookie('token')
    const dispatch = useDispatch()
    const { ValidateAction } = bindActionCreators(allActions, dispatch)
    const [state, setState] = useState({
        user: "",
        mail: "",
        password: "",
        password2: ""

    })
    const [err, setErr] = useState<string|undefined>()

    
    useEffect(() => {
        ValidateAction(tokenLoaded)
        console.log(tokenLoaded)
        return () => {

        }
    }, [])
    useEffect(() => {
        if (authLog) {
            alert("you're already login, log out to register")
            navigate("/")
        }
        console.log(authLog)
    }, [authLog])

    const onSendError = ( ) => {
        let errors 
        if (!state.mail.includes('@') ){
             errors = 'the mail must contain @ '
        }else if (state.user.length>19 && state.user.length<4){
            errors = 'the username must be between 4 and 19 characters'
            console.log(state.user.length)
        }
        else if (state.password !== state.password2){
            errors= 'the password must be the same'
        }else if (state.password.length<4 && state.password.length>30){
            errors = 'the password must be between 6 and 30 characters'
        }


        setErr(errors)
    }


    const onChangeInputs = (e: any) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
            //its save automaticaclly based in its name
        })

    }
    const OnFormSend = (e:any) => {
        e.preventDefault()
        onSendError()
        if(!err){
        // heres the reducer to send to back
        }

    }
    console.log(state)
    return (
        <MainDivRegister>
            <LoginDiv>
                <LoginMainText>
                    register
                </LoginMainText>
                <FormSend onSubmit={e => OnFormSend(e)}>
                    <LoginTagInputDiv>
                        <LoginTag htmlFor='user'>
                            user
                        </LoginTag>
                        <LoginInput type='text' name='user'  onChange={(e) => onChangeInputs(e)}
                        value={state.user}/>
                        <LoginTag htmlFor='email'>
                            email
                        </LoginTag>
                        <LoginInput type='text' name='mail'   onChange={(e) => onChangeInputs(e)}
                        value={state.mail}/>
                        <LoginTag htmlFor='password'>
                            password
                        </LoginTag>
                        <LoginInput type='password' name='password'   onChange={(e) => onChangeInputs(e)}
                        value={state.password}/>
                        <LoginTag htmlFor='password2'>
                            password again
                        </LoginTag>
                        <LoginInput type='password' name='password2'  onChange={(e) => onChangeInputs(e)}
                        value={state.password2} />
                    </LoginTagInputDiv>
                    <ErrorMessage>
                      {err}
                    </ErrorMessage>
                    <ButtonSend>register</ButtonSend>
                </FormSend>
                < RegisterDiv>

                    <RegisterText>
                        you are already registered?
                    </RegisterText>

                    <RegisterLink to='/'>
                        log in
                    </RegisterLink>
                </RegisterDiv>
            </LoginDiv>
        </MainDivRegister>
    )
}

const MainDivRegister = styled.div`
display:flex;
align-self:center;
justify-content:center;
`

export default RegisterScreen
