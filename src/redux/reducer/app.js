import * as types from '../action type'

const initialState = {
    signUpSwitcher:false,
    isPostModal:false,
    isPosting:false
}

const app = (state=initialState,action)=>{
    switch(action.type){
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