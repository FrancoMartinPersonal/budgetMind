import { ActionInterfaces } from '../interfaces/ActionsInterfaces';
import { Dispatch } from 'redux';
import { ActionType, InterfaceLogin, InterfaceValidate, InterfaceAuth } from '../constants/constants';


interface LoginActionInterface {
    password: string,
    mail: string,
    username: string
}

export const LoginAction = (data:LoginActionInterface) => {
    let stringified = JSON.stringify(data)
    console.log(stringified, 'data in LoginAction')

    return (dispatch: Dispatch) => {
        fetch('http://localhost:3001/u/login', {
            method: 'POST',
            body: stringified,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => {

            return resp.json()
        })
            .then(resp => {
                console.log(resp, 'res of data LoginAction')
                dispatch({
                    type: ActionType.VALIDATE,
                    payload: resp
                })
            }).catch((e) => {
                console.error(e, 'error dispatch Login')
            })

    }
}

export const ValidateAction = (token: string) => {
    console.log(token, 'token in ValidateAction')
    return (dispatch: Dispatch) => {
        fetch('http://localhost:3001/u/validate', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Authorization': 'Bearer ' + token,

            },


        }).then((resp) => {
            console.log(resp, 'res of token ValidateAction')
            return resp.json()
        })
            .then(res => {

                console.log(res, 'res of token ValidateAction after json')

                dispatch({
                    type: ActionType.AUTH,
                    payload: res
                })
            }).catch((e) => {
                console.error(e, 'error dispatch Validate')
            })
    }

}
