import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allActions } from '../actions';
import { loadCookie, removeCookie } from '../components/Cookies';
import useLog from '../hooks/useLog';
import { useNavigate } from 'react-router-dom';


function SessionScreen() {
    const dispatch = useDispatch()
    const { authILoginLog } = useLog()
    const { LogoutAction, ValidateAction } = bindActionCreators(allActions, dispatch)
    const [des, setDes] = useState<Boolean>(false)
    const navigate = useNavigate()
    let cookieloaded = loadCookie("token")
    useEffect(() => {
        ValidateAction(cookieloaded)
        return () => {

        }
    }, [cookieloaded])

    function OnClickDropDown() {
        if (des) {
            setDes(false)
        } else {
            setDes(true)
        }
    }
    function OnClickLogOut(){
        removeCookie("token")
        cookieloaded = null;
        LogoutAction()
        setDes(false)
        navigate('/')
        console.log(cookieloaded,'cookie logout')
    }


    return (
        <>
        {cookieloaded?
            <>
            <DisplayDiv onClick={OnClickDropDown}>
                <NameSessionH5>{authILoginLog?.user}</NameSessionH5>
                <Des>^</Des>
            </DisplayDiv>
          {des?<DropDowner>
            <LogOutP style={{textAlign:"center"}}
            onClick={OnClickLogOut}
            >logOut</LogOutP>
            </DropDowner>:null}
            </>:null }
        </>
    )
}

const NameSessionH5 = styled.h5`
color:white;
text-align:center;
margin:0 5px;
`

const Des = styled.p`
color:white;
font-size:10px;
text-align:center;

margin:5px 5px;
`

const DisplayDiv = styled.div`
border:1px solid black;
position:absolute;
right:25px;
top:5px;
display:flex;
padding:5px;
cursor:pointer;
flex-direction:row;
`
const DropDowner = styled.div`
position:absolute;
top:50px;
right:15px;
height:fit-content
display:flex;
justify-content:center;
align-items:center;
width:200px;
background-color:white;
border:1px solid black;
`
const LogOutP = styled.p `
text-align:center;
font-weight:700;
color:green;
cursor:pointer;
&:hover {
    color:#4f4;  
}

`


export default SessionScreen
