import {createStore, applyMiddleware, combineReducers} from 'redux'
import reducer from '../reducer/reducer'; 
import thunk from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension';


// ...

export const rootReducer = reducer 

const reducers = combineReducers({
     Log: reducer
})

// const store = configureStore({
//     reducer:{
        
//     }
// })
export type RootState = ReturnType<typeof reducers>

export const  store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
    
)


//primero seteamos el store
//haciendo nuestro reducer(anda a ../reducer/index.js)
//var store = createStore(rootReducer, applyMiddleware(thunk))
//ahora tenemos que hacer nuestra primer action!
//vamos a actions