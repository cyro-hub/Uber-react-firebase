import * as types from '../action type'

const initialState = {
    comments:[],
    posts:[],
    drivers:[],
    users:[],
    user:{},
    userDetails:'',
    showComment:''
}

const user = (state=initialState,action)=>{
    switch(action.type){
        case types.isShowComment:
            return{
                ...state,
                showComment:action.payload
            }
        case types.setUserRole:
            return{
                ...state,
                userDetails:action.payload
            }
        case types.setUser:
            return{
                ...state,
                user:action.payload
            }
        case types.getUsers:
            return{
                ...state,
                users:action.payload
            }
        case types.getPosts:
            return{
                ...state,
                posts:action.payload
            }
        default:
            return{
                ...state
            }
    }
}

export default user