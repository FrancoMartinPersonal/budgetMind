import { ActionInterfaces } from '../interfaces/ActionsInterfaces';
import { Dispatch } from 'redux';
import { ActionType, InterfaceLogin, InterfaceValidate, InterfaceAuth } from '../constants/constants';
import { displayPartsToString } from 'typescript';
import { initialState } from '../reducer/reducer';


interface LoginActionInterface {
    password: string,
    mail: string,
    user: string
}
interface RegisterActionInterface {
    password: string,
    password2: string,
    mail: string,
    user: string
}

interface CreateActionInterface {
    concept: string,
    amount: number,
    date: Date,

}

interface AddAmountActionInterface {
    amount:number,
    id:string,
    date:any
}

export const LoginAction = (data: LoginActionInterface) => {
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
export const LogoutAction = () => {
    //this action clean the reducer 
    return (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.LOGOUT
        })
    }
}
export const ValidateAction = (token: string | undefined | null) => {
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

export const RegisterAction = (data: RegisterActionInterface) => {
    let stringified = JSON.stringify(data)
    console.log(stringified, 'data in RegisterAction')

    return (dispatch: Dispatch) => {
        fetch('http://localhost:3001/u/register', {
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
                console.log(resp, 'res of data RegisterAction')
                dispatch({
                    type: ActionType.REGISTER,
                    payload: resp
                })
            }).catch((e) => {
                console.error(e, 'error dispatch Register')
            })

    }
}


export const CheckListAction = (token: string | undefined | null) => {
    return (dispatch: Dispatch) => {
        fetch('http://localhost:3001/concept/check', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + token,

            }
        }).then((res) => {
            return res.json()
        }).then(res => {
            console.log(res)
            dispatch({
                type: ActionType.LIST,
                payload: res
            })
        })
    }
}
export const EraseSaveInfo = (TYPE:ActionType) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.ERASESAVEINFO,
            setType:TYPE,
            payload: {
                msg: undefined,
                err: undefined
            }
        }) 
    } 
}

export const CreateAction = (token: string | undefined | null, create: CreateActionInterface) => {
    console.log(JSON.stringify(create))

    //always remember send a "content type apl json in header to req body"
    return (dispatch: Dispatch) => {
        fetch('http://localhost:3001/concept/create', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(create)
        }).then((res) => {
            return res.json()
        }).then(res => {
            console.log(res)
            dispatch({
                type: ActionType.CREATE,
                payload: res
            })
        })
    }
}

export const DeleteAction = (token: string | null, id:string|null) => {
 
    return (dispatch: Dispatch) => {
        fetch('http://localhost:3001/concept/delete/'+id, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            
        }).then((res) => {
            return res.json()
        }).then(res => {
            console.log(res)
            dispatch({
                type: ActionType.DELETE,
                payload: res
            })
        })
    }
}

export const AddAmountAction = (token:string|null,props:AddAmountActionInterface) => {
    return (dispatch: Dispatch) => {
        fetch('http://localhost:3001/concept/addAmount', {
            method: 'POST',
            mode: 'cors',
            headers: {            
           'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',

            },
            body: JSON.stringify(props)
        }).then((res) => {
            return res.json()
        }).then(res => {
            console.log(res)
            dispatch({
                type: ActionType.ADDAMOUNT,
                payload: res
            })
        })
    
    }
}
export const DeleteAmountAction = (token:string|null,id:string|null) => {
    return (dispatch: Dispatch) => {
        fetch('http://localhost:3001/concept/deleteAmount/'+id, {
            method: 'DELETE',
            mode: 'cors',
            headers: {            
           'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',

            },
           
        }).then((res) => {
            return res.json()
        }).then(res => {
            console.log(res)
            dispatch({
                type: ActionType.DELETEAMOUNT,
                payload: res
            })
        })
    
    }
}

export const ShowConcept = (token:string|null,id:string) => {
    return (dispatch: Dispatch) => {
        fetch('http://localhost:3001/concept/show/'+id, {
            method: 'GET',
            mode: 'cors',
            headers: {            
           'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',

            },
          
        }).then((res) => {
            return res.json()
        }).then(res => {
            console.log(res)
            dispatch({
                type: ActionType.SHOWCONCEPT,
                payload: res
            })
        })
    
    }
}
