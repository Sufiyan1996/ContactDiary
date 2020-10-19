import {SET_ALERT,REMOVER_ALERT} from '../types'

export default (state,action) => {
    switch(action.type){
        case SET_ALERT:
            return [...state,action.payload]
            case REMOVER_ALERT:
                return state.filter(alert => alert.id !== action.payload)
        default:
        return state
    }
}