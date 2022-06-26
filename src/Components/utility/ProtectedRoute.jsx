import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import {Outlet,Navigate} from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import * as fire from '../../firebase'
import * as userActions from '../../redux/actions/user'
import {collection, query, where, getDocs, addDoc,deleteDoc,doc,updateDoc} from 'firebase/firestore'

function ProtectedRoute() {
const user = useSelector(state=>state.user.user)

onAuthStateChanged(fire.auth, (user) => {
  userActions.setUser(user)
  if (user) {
        (async ()=>{
          let references = collection(fire.db,'users')
          let arr = []
          const locations = await getDocs(query(references,where('uid','==',user?.uid)));
        
          locations.forEach((doc) => {
            arr.push({...doc.data(),id:doc.id});
          });
          userActions.setUserDetails(arr[0]) 
      })()
    }
});

  return<>{user?<Outlet/>:<Navigate to='/account' replace={true} />}</>
}

export default ProtectedRoute