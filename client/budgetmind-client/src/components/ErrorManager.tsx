import React from 'react';



interface onSendErrorRegisterInterface {
 mail:string,
 user:string,
 password:string,
 password2:string,
}
//it receives a state of Register as first param and setError as second param 
export const onSendErrorRegister = (state:onSendErrorRegisterInterface,setErr:React.Dispatch<React.SetStateAction<string | undefined>> ) => {
    let errors 
    if(state.user.length <1 || state.mail.length <1 || state.password.length <1 || state.password2.length <1){
        errors = 'fields are missing'
    }
    if (state.user.length>19 || state.user.length<4){
        errors = 'the username must be between 4 and 19 characters'
        console.log(state.user.length)
    }
    if(state.mail.length<8){
        errors = 'insert a valid mail'
    }
    if (!state.mail.includes('@') ){
        errors = 'the mail must contain @ '
    } 
     if (state.password !== state.password2){
        errors= 'the password must be the same'
    } if (state.password.length<4 || state.password.length>30){
        errors = 'the password must be between 6 and 30 characters'
    }


    setErr(errors)
}