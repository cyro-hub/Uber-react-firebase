// import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import {Outlet,Navigate} from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import * as fire from '../../firebase'
import * as userActions from '../../redux/actions/user'
import {collection, query, where, getDocs, addDoc,deleteDoc,doc,updateDoc} from 'firebase/firestore'

function ProtectedRoute() {
const user = useSelector(state=>state.user.user)

onAuthStateChanged(fire.auth, (user) => {
  if (user) {
      userActions.setUser(user)
      if(user.uid){
        const getUserRole =async()=>{
          let references = collection(fire.db,'users')
          let arr = []
          const locations = await getDocs(references,where('uid','==',user?.uid));
        
          locations.forEach((doc) => {
            arr.push({...doc.data(),id:doc.id});
          });
          userActions.setUserRole(arr[0])
      }

      getUserRole()
      }
    } else {
      userActions.setUser(null)
    }
});

  return<>{user?<Outlet/>:<Navigate to='/account' replace={true} />}</>
}

export default ProtectedRoute