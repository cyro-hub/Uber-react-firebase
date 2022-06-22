import * as types from '../action type'

const initialState = {
    comments:[]
}

const user = (state=initialState,action)=>{
    switch(action.type){
        default:
            return{
                ...state
            }
    }
}

export default user