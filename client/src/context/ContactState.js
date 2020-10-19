import React,{useReducer} from 'react'
import axios from 'axios' 
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACTS,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CLEAR_CONTACTS,
    GET_CONTACT,
    CLEARALL_CONTACT
} from './types'

const ContactState = props => {
    const initialState = {
        contacts:[],
        current:null,
        filter:null,
        error:null,
        loading:null
    };

    const [state,dispatch] = useReducer(ContactReducer,initialState);

    // GET_CONTACTS
    const GetContact = async () => {
        try { 
            const res = await axios.get('/api/contacts');
            dispatch({type:GET_CONTACT,payload:res.data});
        } catch (error) {
            dispatch({
                type:CLEAR_CONTACTS,
                payload:error.response.msg
            })
        }
    }

    // ADD CONTACT,
   const AddContact = async (formData) => {  
       try {
           const config = {
               header:{
                   'Content-Type' : 'application/json'
               }
           }
        const res = await axios.post('/api/contacts',formData,config);
        dispatch({type:ADD_CONTACT,payload:res.data});
       } catch (error) {
           console.log(error.response)
        //    dispatch({type:CLEAR_CONTACTS,payload:error.response.msg});
        //    alert(error.response.msg);
        }
   } 
    // DELETE CONTACT,

    const onDelete = async id => { 
        try { 
          await axios.delete(`/api/contacts/${id}`);
         dispatch({type:DELETE_CONTACT,payload:id});
        } catch (error) {
            console.log(error.response) 
         } 
    }

    // SET CURRENT CONTACT,

    const CurrenContact = contact => {
        dispatch({type:SET_CURRENT,payload:contact})
    }

    // CLEAR CURRENT CONTACT,

    const ClearContact = (contact) => {
        dispatch({type:CLEAR_CURRENT})
    }
  // CLEAR ALL CONTACT,

  const ClearAllContact = contact => {
    dispatch({type:CLEARALL_CONTACT})
}
    // UPDATE CONTACTS,
    const UpdateContact = async (formData) => {
        try {
            const config = {
                header:{
                    'Content-Type' : 'application/json'
                }
            }
         const res = await axios.put(`/api/contacts/${formData._id}`,formData,config);
         dispatch({type:UPDATE_CONTACTS,payload:res.data})
        } catch (error) {
            console.log(error.response)
         //    dispatch({type:CLEAR_CONTACTS,payload:error.response.msg});
         //    alert(error.response.msg);
         }
   
    }

    // FILTER CONTACTS,
     const FilterContacts = text => {
         dispatch({type:FILTER_CONTACTS,payload:text})
     }

    // CLEAR FILTER,
     const ClearFilterContacts = () => {
         dispatch({type:CLEAR_FILTER})
     }

    return (
        <ContactContext.Provider 
        value={{
            contacts:state.contacts,
            current:state.current,
            filter:state.filter,
            loading:state.loading,
            error:state.error,
            AddContact,
            onDelete,
            CurrenContact,
            ClearContact,
            UpdateContact,
            FilterContacts,
            ClearFilterContacts,
            GetContact,
            ClearAllContact
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}
export default ContactState;