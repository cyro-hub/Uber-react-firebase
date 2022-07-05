import * as types from '../action type'

const initialState = {
    comments:[],
    posts:[],
    drivers:[],
    users:[],
    user:{},
    userDetails:{},
    showComment:'',
    chatName:null,
    messages:[]
}

const user = (state=initialState,action)=>{
    switch(action.type){
        case types.isShowComment:
            return{
                ...state,
                showComment:action.payload
            }
        case types.setUser:
            return{
                ...state,
                user:action.payload
            }
        case types.setUserDetails:
            return{
                ...state,
                userDetails:action.payload
            }
        case types.getUsers:
            return{
                ...state,
                users:action.payload
            }
        case types.getPosts:
            return{
                ...state,
                posts:action.payload,
            }
        case types.setChatName:
            return{
                ...state,
                chatName:action.payload
            }
        case types.getMessagesOfChatName:
            return{
                ...state,
                messages:action.payload
            }
        default:
            return{
                ...state
            }
    }
}

export default user