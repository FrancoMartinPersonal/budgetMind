import useLog from '../hooks/useLog';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { InterfaceAuth, InterfaceLogin } from '../constants/constants';
import { saveCookie, loadCookie } from './Cookies';

// interface AuthInterface {
  
//     navigateStr:string|undefined 
// }

//it is specified the routh once you validate de token


export function authRedirect({auth,info}:InterfaceAuth,navigate:any|undefined,route:any|undefined) {
   
        
    if (auth) {
           navigate(`/${route}`)
    } else if (info) {
        console.error('error in validation token :' + info)
           navigate(`/`)
    }
     
}
// export function loginCookieSaver(props: InterfaceLogin | undefined) {
//     //const info = {date,id,mail,username}
//     for (let name in props) {
//         saveCookie({ name, value: props[name], time: 30 })
//     }
// }
// export function loginCookieLoader() {
//     const info = ["date","id","mail","username"]
//     let log:{} = {} 
//     let name:string|null
//     for (name in info) {
//         name =loadCookie(name)
//          log = {name}
//     }
//     return 
// }