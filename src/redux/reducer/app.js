import * as types from '../action type'

const initialState = {
    signUpSwitcher:true,
    isPostModal:false,
    isPosting:false,
    area:null,
    mapLocation:null,
    contacts:[]
}

const app = (state=initialState,action)=>{
    switch(action.type){
        case types.getContacts:
            return{
                ...state,
                contacts:action.payload
            }
        case types.userCurrentLocation:
            return{
                ...state,
                area:action.payload.area,
                mapLocation:action.payload.mapLocation 
            }
        case types.isPosting:
            return{
                ...state,
                isPosting:!state.isPosting
            }
        case types.isSignup:
            return{
                ...state,
                signUpSwitcher:!state.signUpSwitcher
            }
        case types.isPostModal:
            return{
                ...state,
                isPostModal:!state.isPostModal
            }
        default:
            return{
                ...state
            }
    }
}

export default app