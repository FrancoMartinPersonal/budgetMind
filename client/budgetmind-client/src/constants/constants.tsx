export enum ActionType {
    LOGIN =  'login',
    VALIDATE = 'validate',
    AUTH = 'auth'
}

export interface InterfaceLogin {
    
        mail?:string,
        username?:string,
        date:string,
        id:string
    
}
export interface InterfaceAuth {
    
    auth:boolean,
    info:{
        name?:string,
        message?:string
    },
    login?:InterfaceLogin

}
export interface InterfaceValidate {
    token?:string;
    msg:string;
}