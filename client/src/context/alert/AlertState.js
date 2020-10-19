import React,{useReducer} from 'react'
import { v4 } from 'uuid';
import AlertReducer from '../alert/alertReducer'
import AlertContext from '../alert/alertContext'
import {SET_ALERT,REMOVER_ALERT} from '../types'

const AlertState = props => {
    const initialState= [];

    const[state,dispatch] = useReducer(AlertReducer,initialState);
    
    // Set Alert
    const setAlert = (msg,type,timeout=5000) => {
        const id = v4();
        dispatch({type:SET_ALERT,
        payload:{
            msg,type,id
        }
    })

    setTimeout(() => {
       dispatch({type:REMOVER_ALERT,payload:id}) 
    }, timeout);
    }

    return (
        <AlertContext.Provider value={{
            alerts:state,
            setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState