
import {
    ADD_CONTACT,
    GET_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACTS,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CLEAR_CONTACTS,
    CLEARALL_CONTACT
} from './types'

export default(state,action) => {
    switch(action.type){
        case GET_CONTACT:
            return{
                ...state,
                contacts:action.payload,
                loading:false
            }
        case ADD_CONTACT : 
        return{
            ...state,
            contacts : [...state.contacts,action.payload] , 
            loading:false
        }
        case UPDATE_CONTACTS:
            return{
                ...state,
                contacts : state.contacts.map(contact => contact._id === action.payload._id 
                    ? action.payload
                    : contact
                ),
                loading:false
            }
        case DELETE_CONTACT : 
        return {
            ...state,
            contacts : state.contacts.filter(contact => contact._id !== action.payload ),
            loading:false
        }
        case CLEAR_FILTER:{
            return{
                ...state,
                filter:null,
            }

        }
        case SET_CURRENT:
            return{
                ...state,
                current:action.payload
            }
            case CLEAR_CURRENT:
                return{
                    ...state,
                    current:null
                }
                case FILTER_CONTACTS:
                    return{
                        ...state,
                        filter: state.contacts.filter(contact => {
                            const regex = new RegExp(`${action.payload}`,'gi');
                            return contact.name.match(regex) || contact.email.match(regex)
                        }),
                        loading:false
                    }
                    case CLEAR_CONTACTS:
                        return{
                            ...state,
                            error:action.payload,
                            loading:false
                        }
                        case CLEARALL_CONTACT:
                            return{
                                ...state,
                                contacts:null,
                                current:null,
                                filter:null,
                                error:null,
                                loading:false
                            }

        default:
            return state
    }
}