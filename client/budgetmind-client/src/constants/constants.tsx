export enum ActionType {
    LOGIN =  'login',
    VALIDATE = 'validate',
    AUTH = 'auth'
}

export interface InterfaceLogin {
    
        mail?:string,
        username?:string,
        password:string
    
}
export interface InterfaceAuth {
    
    auth?:string,
    msg?:string

}
export interface InterfaceValidate {
    token?:string;
    msg:string;
}