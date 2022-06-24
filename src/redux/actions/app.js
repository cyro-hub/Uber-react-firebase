import {store} from '../store'
import * as types from '../action type'
import {collection,getDocs, addDoc} from 'firebase/firestore'
import {db} from '../../firebase'

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

export const userCurrentLocation = (area,mapLocation)=>{
    store.dispatch({
        type:types.userCurrentLocation,
        payload:{
                    area:area,
                    mapLocation:mapLocation
                }
    })
}

export const addContact=async(contact)=>{
    let references = collection(db,'contacts')
    return await addDoc(references,contact).then(()=>{
      getContacts();
    })
}

export const getContacts=async()=>{
    let references = collection(db,'contacts')
    let arr = []
    const locations = await getDocs(references);
  
    locations.forEach((doc) => {
      arr.push({...doc.data(),id:doc.id});
    });
  
    store.dispatch({
        type:types.getContacts,
        payload:arr
    })
}