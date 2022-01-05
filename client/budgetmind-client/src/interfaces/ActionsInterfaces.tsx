import { ActionType, InterfaceAuth, InterfaceLogin, InterfaceValidate, InterfaceList, InterfaceCreate } from '../constants/constants';

// interface Login {
//     type:ActionType.LOGIN,
//     payload:InterfaceLogin
// }


interface Validate {
    type: ActionType.VALIDATE,
    payload: InterfaceValidate

}
interface Auth {
    type: ActionType.AUTH,
    payload: InterfaceAuth
}
interface Register {
    type: ActionType.REGISTER,
    payload: InterfaceValidate
}

interface List {
    type: ActionType.LIST,
    payload: InterfaceList
}

interface Create{
 type:ActionType.CREATE,
 payload:InterfaceCreate
}
interface AddAmount {
type:ActionType.LIST
payload:InterfaceList
}

interface showConcept {
type:ActionType.SHOWCONCEPT
payload:InterfaceList
}

export type ActionInterfaces = Validate | Auth | Register | List | Create | AddAmount | showConcept