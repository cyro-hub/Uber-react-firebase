import {store} from '../store'
import * as types from '../action type'

export const isSignup = ()=>{
    store.dispatch({type:types.isSignup})
}

export const showComments = (comment)=>{

}

export const isPostModal=()=>{
    store.dispatch({type:types.isPostModal})
}

export const isPosting =()=>{
    store.dispatch({type:types.isPosting})
}