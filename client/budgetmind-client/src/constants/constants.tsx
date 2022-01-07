export enum ActionType {
    LOGIN =  'login',
    VALIDATE = 'validate',
    AUTH = 'auth',
    REGISTER = 'register',
    LIST = 'list',
    CREATE ='create',
    ADDAMOUNT = 'AddAmount',
    DELETEAMOUNT = 'DeleteAmount',
    SHOWCONCEPT= 'showConcept',
}

export interface InterfaceLogin {
    
        [mail:string]:string|undefined,
        username?:string| undefined,
        date:string| undefined,
        id:string| undefined
    
}


export interface InterfaceConcept {
    _id:     string;
    concept: string;
    date:    string;
    user:    string;
    amounts: any[];
    __v:     number;
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
export interface InterfaceCreate {
    msg:string | undefined,
    err:boolean | undefined;
}
export interface InterfaceValidate {
    token?:string| undefined;
    msg:string| undefined;
}