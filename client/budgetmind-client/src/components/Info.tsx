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

export function loadInfo(name: string | undefined) {

    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {

        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
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
export function saveInfo({ name, value, time = 30 }: SaveInfoInterface) {
    if (value && name) {
        var d = new Date()
        d.setTime(d.getTime() + time * 24 * 60 * 60 * 1000)
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${d.toUTCString()};`
        return loadInfo(name)
        //ValidateAction(myToken!)
        // if (auth) {
        //     navigate('/home')
        // } else {
        //     console.log(auth, 'error auth')
        //     console.error("error validation token")
        // }


    }
}
