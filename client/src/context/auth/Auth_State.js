import React,{useReducer} from 'react'
import axios from 'axios'
import AuthContext from '../../context/auth/auth_Context'
import AuthReducer from '../../context/auth/auth_Reducer'
import SetAuthToken from '../../utils/setAuthToken'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS 
} from '../types'

const AuthState = props => {
    const initialState = {
        token : localStorage.getItem('token'),
        isAuthenticated : null,
        loading:true,
        error:null,
        user:null
    }

const [state,dispatch] = useReducer(AuthReducer,initialState);

// Load User
const LoadUser = async () => {
    // get token header
if(localStorage.token){
    SetAuthToken(localStorage.token);
}
    try {
        const config = {
            header:{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.get('/api/auth','',config);
        dispatch({type:USER_LOADED,payload:res.data})
    } catch (error) {
        alert(error.response.data)
    }
}

// Register User
const Register = async (formData) => {
    try {
        const config ={
            header:{
                'Content-Type':'application/json'
            }
        }
    
    const res = await axios.post('/api/users',formData,config);
    LoadUser();
    dispatch({type:REGISTER_SUCCESS,payload:res.data})
    } catch (error) {
        dispatch({type:REGISTER_FAIL,payload:error.response.data})
        error.response.data.map(alert => (
            alert(alert.msg)
        ))
    }

} 

// Login User
const Login = async (formData) =>{
    try {
        const config = {
            header : {
                'Content-Type' : 'application/json'
            }
        }

        const res = await axios.post('/api/auth',formData,config);
        dispatch(
            {type:LOGIN_SUCCESS,payload:res.data}
        )

        LoadUser();
    } catch (error) {
        dispatch(
            {type:LOGIN_FAIL,payload:error.response.data}
        )
        error.response.data.map(alert => (
            alert(alert.msg)
        ))
    }
} 

// Logout
const Logout = () => {
    dispatch({type:LOGOUT})
}

// Clear Errors
const ClearErrors = () => {
dispatch({type:CLEAR_ERRORS})
}

return (
    <AuthContext.Provider value={{
        token : state.token,
        isAuthenticated : state.isAuthenticated,
        loading : state.loading,
        user : state.user,
        error : state.error,
        Register,
        LoadUser,
        Login,
        Logout,
        ClearErrors
        }}>
        {props.children}
        </AuthContext.Provider>
)

}

export default AuthState
