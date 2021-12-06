import { ActionInterfaces } from '../interfaces/ActionsInterfaces';
import { Dispatch } from 'redux';
import { ActionType, InterfaceLogin, InterfaceValidate, InterfaceAuth } from '../constants/constants';


export const LoginAction =  (data:InterfaceLogin) => {
    let stringified = JSON.stringify(data)
    console.log(stringified,'data in LoginAction')
    
    return (dispatch:Dispatch) => {
        fetch('http://localhost:3001/u/login',{
            method:'POST',
            body:stringified,
            mode:'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(resp => {
            console.log(resp,'res of data LoginAction')
            dispatch({
                type: ActionType.VALIDATE,
                payload:resp
            })
        }).catch((e) => {
            console.error(e, 'error dispatch')
        })
       
    }
}

export const ValidateAction = async (token:string) => {
    console.log(token,'token in LoginAction')
    const res =  await fetch('http://localhost:3001/u/login',{
        method:'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer '+token
        },
       
    })
    console.log(res,'res of token LoginAction')
    return (dispatch:Dispatch) => {
        dispatch({
            type: ActionType.AUTH,
            payload:res
        })
    }
}
