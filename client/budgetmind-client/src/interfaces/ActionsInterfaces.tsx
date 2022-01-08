import { ActionType, InterfaceAuth, InterfaceLogin, InterfaceValidate, InterfaceList, InterfaceCreate, InterfaceConcept, InterfaceDelete } from '../constants/constants';
import { StateInterface } from '../reducer/reducer';

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
interface EraseSaveInfo {
    type:ActionType.ERASESAVEINFO,
    setType:ActionType.CREATE|ActionType.DELETE
    payload:InterfaceCreate|InterfaceDelete
}
interface AddAmount {
type:ActionType.ADDAMOUNT
payload:InterfaceConcept
}

interface showConcept {
type:ActionType.SHOWCONCEPT
payload:InterfaceConcept
}
interface deleteAmount {
    type:ActionType.DELETEAMOUNT
    payload:InterfaceConcept
}

interface Delete {
    type:ActionType.DELETE
    payload:InterfaceDelete
}
interface Logout {
    type:ActionType.LOGOUT
}

export type ActionInterfaces = Validate | Auth | Register | Logout
 | List | Create | AddAmount | showConcept | deleteAmount | EraseSaveInfo | Delete