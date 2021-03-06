import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { authRedirect } from '../components/Auth';
import useLog from '../hooks/useLog';
import { ButtonSend, ErrorMessage, 
    FormSend, LoginDiv, LoginInput,
     LoginMainText, LoginTag, LoginTagInputDiv,
      RegisterText, RegisterDiv, RegisterLink } from '../themes/styledConstants';
import { useNavigate } from 'react-router-dom';
import { loadCookie, saveCookie } from '../components/Cookies';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allActions } from '../actions';
import { onSendErrorRegister } from '../components/ErrorManager';


function RegisterScreen() {
    const { tokenLog, tokenMsgLog, authLog, authInfoLog, authILoginLog } = useLog()
    const navigate = useNavigate()
   
    const dispatch = useDispatch()
    const { ValidateAction,RegisterAction } = bindActionCreators(allActions, dispatch)
    const [state, setState] = useState({
        user: "",
        mail: "",
        password: "",
        password2: ""

    })
    const [err, setErr] = useState<string|undefined>()

    
    useEffect(() => {
        let tokenLoaded = loadCookie('token')
        ValidateAction(tokenLoaded)
       
        return () => {

        }
    }, [])
    useEffect(() => {
        if (authLog) {
            alert("you're already login, log out if you want to register")
            navigate("/")
        }
      
    }, [authLog])
    useEffect(() => {
        let tokenRes = saveCookie({ name: 'token', value: tokenLog, time: 30 })
      
        ValidateAction(tokenRes)
        if(tokenMsgLog){
            setErr(tokenMsgLog)
        }
    }, [tokenLog])
    useEffect(() => {
        if(tokenMsgLog){
            setErr(tokenMsgLog)
        }
    }, [tokenMsgLog])

    


    const onChangeInputs = (e: any) => {
        setErr(undefined)
        setState({
            ...state,
            [e.target.name]: e.target.value
            //its save automaticaclly based in its name
        })

    }
    const OnFormSend = (e:any) => {
        e.preventDefault()
        onSendErrorRegister(state,setErr)
        if(!err){
            console.log(err)
        // heres the reducer to send to back
            RegisterAction({
                user:state.user,
                mail:state.mail,
                password:state.password,
                password2:state.password2
            })
        }

    }
    
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
