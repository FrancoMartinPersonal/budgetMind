import { ActionType, InterfaceAuth, InterfaceLogin, InterfaceValidate } from '../constants/constants';

// interface Login {
//     type:ActionType.LOGIN,
//     payload:InterfaceLogin
// }


interface Validate {
    type:ActionType.VALIDATE,
    payload:InterfaceValidate
    
}
interface Auth {
    type:ActionType.AUTH,
    payload:InterfaceAuth
}
interface Register {
     type:ActionType.REGISTER,
     payload:InterfaceAuth
}

export type ActionInterfaces = Validate | Auth | Register