import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { colors } from '../themes/Colors'
import { bindActionCreators, Dispatch } from 'redux';
import { allActions } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { InterfaceLogin } from '../constants/constants';
import { LoginAction } from '../actions/actions';
import { RootState } from '../store/store';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { useNavigate } from 'react-router-dom';
// import { locationsAreEqual } from 'history';
//1164579862


function LoginScreen() {
    const dispatch = useDispatch()
    const { LoginAction, ValidateAction } = bindActionCreators(allActions, dispatch)
    const navigate = useNavigate()
    const selectorState = useSelector((e: RootState) => e.Log)
    const token = selectorState.validate.token
    const auth = selectorState?.auth?.msg
    const [state, setState] = useState({
        mailoruser: "",
        password: ""

    })
    useEffect(() => {
            let myToken = localStorage?.getItem("Token")
            if(myToken){
                console.log(myToken)
                ValidateAction(myToken!)
                    if (auth === "success") {
                        console.log('sucess??')
                        navigate('/home')
                    } else {
                        console.log(auth,'error auth')
                        console.error("error validation token")
                    }
            
            }
        return () => {

        }
        //it could be a didcomponentmount but auth works anywars because check if exists so it is trigerred and then change again but this time with auth token validated
    }, [auth])


    useEffect(() => {
        if (token) {
            localStorage.setItem('Token', token)
            let myToken = localStorage.getItem("Token")
            ValidateAction(myToken!)
                if (auth === "success") {
                    navigate('/home')
                } else {
                    console.log(auth,'error auth')
                    console.error("error validation token")
                }
            

        }
        return () => {

        }
    }, [token])


    const onChangeInputs = (e: any) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
            //its save automaticaclly based in its name
        })

    }

    const OnFormSend = (e: any) => {
        e.preventDefault()

        const { mailoruser, password } = state


        if (mailoruser.length > 1 && password.length > 1) {

            //console.log(state, "state before send or not")
            if (mailoruser.includes('@')) {
                LoginAction({
                    mail: "",
                    username: mailoruser,
                    password
                })
            } else {
                LoginAction({
                    mail: mailoruser,
                    username: "",
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
    console.log(selectorState)
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
                    {selectorState.validate.msg}
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
const LoginDiv = styled.div`
width: 350px;
height: max-content;
//border: 1px solid ${colors.secondary.main};
border-radius: 4px;
display: flex;
flex-direction: column;
background: #d3d3d3;
align-self: center;
//justify-content: space-around;
margin: 70px 0;
`
const LoginMainText = styled.h3`
text-align: center;
color: ${colors.secondary.main};
font-size:30px;
`
const LoginTagInputDiv = styled.div`
display:flex;
flex-direction: column;
padding:15px 50px;
margin:20px 0 ;
color:green;
`
const ButtonSend = styled.button`
outline: none;
background: ${_ => `linear-gradient(112deg, ${colors.secondary.main} 52%, ${colors.primary.main}  52%)`};
border: 2px solid  ${colors.secondary.main};
border-radius: 20px;
font-weight: 700;
display:flex;
justify-content: center;
align-items: center;
height:30px;
color:#ffffff;
margin:0px auto;
width: 100px;

  transition: all .2s ease-out;


  
&:hover {
     ${css`
   // transform: rotate(360deg);
   border-radius: 1px;

  `}; 
  
  }

`

const FormSend = styled.form`

`
const LoginTag = styled.label`
padding:5px;
text-align: center;

font-weight: 700;
`
const LoginInput = styled.input`
padding:10px ;
border:none;
font-weight: 700;
color:white;
text-rendering:geometricPrecision;
border-radius: 6px;
margin-bottom: 10px;
background:  ${colors.secondary.main};
&:focus {
outline-color: white;
}
`

const RegisterDiv = styled.div`
display: flex;
align-self: center;
flex-direction: row;
margin: 10px;
`
const RegisterText = styled.p`
font-weight: 600;
color:${colors.secondary.main};
margin:2px;
`
const RegisterLink = styled(Link)`
margin:2px;
text-decoration:none;
font-weight: 700;
color:${colors.primary.main};
transition: all .2s ease-out;

&:hover {
    color:#4792a8;
}
`
const ErrorMessage = styled.p`
color:#c05421;
text-align: center;
`


export default LoginScreen
