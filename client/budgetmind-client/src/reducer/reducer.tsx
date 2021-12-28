import { ActionType, InterfaceLogin, InterfaceValidate, InterfaceAuth, InterfaceConcept } from '../constants/constants';
import { ActionInterfaces } from '../interfaces/ActionsInterfaces';

const initialState = {


    validate: {
        token: '',
        msg: ''

    },
    auth: {
        info: {},
        auth: undefined,
        login: {
            date: '',
            mail: '',
            id: '',
            user: ''
        }
    },
    list:[],



}


interface StateInterface {


    list: any
    validate: InterfaceValidate;
    auth: InterfaceAuth;


}





export default function reducer(state: StateInterface = initialState, action: ActionInterfaces) {
    switch (action.type) {
        case ActionType.VALIDATE:
            return {
                ...state,
                validate: action.payload
            }
        case ActionType.AUTH:

            return {
                ...state,
                auth: action.payload
            }
        case ActionType.REGISTER:
            return {
                ...state,
                validate: action.payload
            }
        case ActionType.LIST:
            return {
                ...state,
                list: action.payload
            }
        default: return state
    }

}