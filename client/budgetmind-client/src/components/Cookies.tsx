import { useNavigate } from "react-router"
import { ValidateAction } from "../actions/actions"


export interface SaveInfoInterface {
    name: string |undefined ;
    value: string | undefined ;
    time: number  | undefined;
}

/* save info:
saves the respective cookie and return it once it is save it
    load info:
    just return the info coockie name specified 
*/

export function loadCookie(name: string | undefined) {

    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
   //name1=jaun;max-age=30;name2=obito;max-age=32;
   //['name1=jaun','max-age=30','name2=obito','max-age=32']
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }else{
            console.error('that cookie doesnt exist')
        }

    }


    //its function is to proof an if it works, redirect to home but by the moment i let the code here
    // if (auth) {
    //ValidateAction(myToken!)

    //     navigate('/home')
    //     } else {
    //         console.log(auth, 'error auth')
    //         console.error("error validation token")
    //     }

    //}
    return null;
}
export function saveCookie({ name, value, time = 30 }: SaveInfoInterface) {
    if (value && name) {
        var d = new Date()
        d.setTime(d.getTime() + time * 24 * 60 * 60 * 1000)
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${d.toUTCString()};`
        return loadCookie(name)
        //ValidateAction(myToken!)
        // if (auth) {
        //     navigate('/home')
        // } else {
        //     console.log(auth, 'error auth')
        //     console.error("error validation token")
        // }


    }
}
export function removeCookie(name:string) {
    document.cookie = `${name}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
}