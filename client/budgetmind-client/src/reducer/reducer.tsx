import { ActionType, InterfaceLogin, InterfaceValidate, InterfaceAuth, InterfaceConcept, InterfaceCreate, InterfaceDelete } from '../constants/constants';
import { ActionInterfaces } from '../interfaces/ActionsInterfaces';


export const initialState = {


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
    list: [],
    create: {
        msg: undefined,
        err: undefined
    },
    delete: {
        msg: undefined,
        err: undefined
    },
    showConcept: {

    }



}


interface StateInterface {


    list: any;
    validate: InterfaceValidate;
    auth: InterfaceAuth;
    create: InterfaceCreate,
    delete: InterfaceDelete,
    showConcept: any;


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
        case ActionType.CREATE:
            return {
                ...state,
                create: action.payload
            }
        case ActionType.ADDAMOUNT:
            return {
                ...state,
                showConcept: action.payload
            }
        case ActionType.SHOWCONCEPT:
            return {
                ...state,
                showConcept: action.payload
            }
        case ActionType.DELETEAMOUNT:
            return {
                ...state,
                showConcept: action.payload
            }
        case ActionType.ERASESAVEINFO:
            return {
                ...state,
                [action.setType]: action.payload
            }
        case ActionType.DELETE:
            return {
                ...state,
                delete: action.payload
            }
        default: return state
    }

}