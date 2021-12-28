export enum ActionType {
    LOGIN =  'login',
    VALIDATE = 'validate',
    AUTH = 'auth',
    REGISTER = 'register',
    LIST = 'list'
}

export interface InterfaceLogin {
    
        [mail:string]:string|undefined,
        username?:string| undefined,
        date:string| undefined,
        id:string| undefined
    
}


export interface InterfaceConcept {
    _id:     string| undefined;
    concept: string| undefined;
    amount:  number| undefined;
    date:    string| undefined;
    user:    string| undefined;
    __v:     number| undefined;
}

export interface InterfaceList {
    _id:      string;
    user:     string;
    mail:     string;
    date:     string;
    password: string;
    concepts: InterfaceConcept[];
    __v:      number;

}
export interface InterfaceAuth {
    
    auth:boolean|undefined,
    info:{
        name?:string| undefined,
        message?:string| undefined
    },
    login?:InterfaceLogin| undefined

}
export interface InterfaceRegister {
    
}
export interface InterfaceValidate {
    token?:string| undefined;
    msg:string| undefined;
}