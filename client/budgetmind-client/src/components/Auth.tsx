import useLog from '../hooks/useLog';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { InterfaceAuth } from '../constants/constants';

// interface AuthInterface {
  
//     navigateStr:string|undefined 
// }

//it is specified the routh once you validate de token

interface localAuth {
    navigate: any
    navigateStr:any,
    
}

export function auth({auth,info}:InterfaceAuth,navigate:any|undefined,route:any|undefined) {
   
        
    if (auth) {
           navigate(`/${route}`)
    } else if (info) {
        console.error('error in validation token :' + info)
           navigate(`/`)
    }
     
}