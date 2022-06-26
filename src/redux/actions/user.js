import * as types from '../action type'
import {store} from '../store'
import * as appActions from './app'
import * as fire from '../../firebase'
import { ref, uploadBytes, getDownloadURL ,deleteObject } from "firebase/storage";
import {collection, query, where, getDocs, addDoc,deleteDoc,doc,updateDoc} from 'firebase/firestore'
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut,updateProfile,deleteUser } from "firebase/auth";
import {db} from '../../firebase'

export const signUpUser = async(user)=>{
let references = collection(db,'users')
const imageName = (new Date()).toUTCString();
const imageRef = ref(fire.storage, imageName);
return await uploadBytes(imageRef, user.imageURL)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            if(url){
                createUserWithEmailAndPassword(fire.auth,user.email,user.password)
                .then((userCredential)=>{
                    const newUser = {...user,imageURL:url,
                                             password:'',
                                             confirmPassword:'',
                                             uid:userCredential.user.uid,
                                             email:''}
                    addDoc(references,newUser).then(()=>{
                      updateProfile(fire.auth.currentUser, {
                        displayName: newUser.name, photoURL:newUser.imageURL
                      }).then(()=>{
                        appActions.isPosting()
                        appActions.isPostModal()
                        window.location.href='/user';
                      }).catch(error=>{
                        deleteUser(fire.auth.currentUser)})
                      
                    }).catch(error=>{
                      // deleting user if any errror 
                      deleteUser(fire.auth.currentUser)
                    })
                }).catch(error=>{
                  // deleting image if there is error loading
                  const desertRef = ref(fire.storage, imageName);
                  deleteObject(desertRef).then(() => {
                    appActions.isPosting()
                    appActions.isPostModal()
                    deleteUser(fire.auth.currentUser)
                  })
                })
            }
        }).catch((error)=>{
          // deleting image if there is error loading
          const desertRef = ref(fire.storage, imageName);
                  deleteObject(desertRef).then(() => {
                    appActions.isPosting()
                    appActions.isPostModal()
                    deleteUser(fire.auth.currentUser)
                  })
        })
      })
}

export const signInUser =async(user)=>{
  return await signInWithEmailAndPassword(fire.auth, user.email, user.password)
}

export const signout =async()=>{
  signOut(fire.auth).then(() => {
    console.log('successfully signout')
  }).catch((error) => {
    console.log(error)
  });
}

export const getPostsForUsers =async(city)=>{
  if(typeof(city)!=='string') return
  let references = collection(db,'posts')
  const q = query(references, where('city','==',city));
  let arr = []
  const locations = await getDocs(q);

  locations.forEach((doc) => {
    arr.push({...doc.data(),id:doc.id});
  });
  store.dispatch({
      type:types.getPosts,
      payload:arr
  })
}

export const addPost =async(post)=>{
  let references = collection(db,'posts')
  return await addDoc(references,post).then((posts)=>{
    appActions.isPosting()
    getPostsForUsers(post.city);
    getUsers(post.city);
  })
}

export const getUsers =async(city)=>{
  if(city==='undefined') return

  let references = collection(db,'users')
  const q = query(references, where('city','==',city),where('role','==','driver'));
  let arr = []
  const locations = await getDocs(q);

  locations.forEach((doc) => {
    arr.push({...doc.data(),id:doc.id});
  });

  store.dispatch({
      type:types.getUsers,
      payload:arr
  })
}

export const setUser = (user)=>{
  store.dispatch({
    type:types.setUser,
    payload:user
  })
}

export const setUserRole = (role)=>{
  store.dispatch({
    type:types.setUserRole,
    payload:role
  })
}

export const removePost = async() => {
  let references = collection(db,'posts')
  await deleteDoc(doc(references,where('status','==',true)))

}

export const removePostByUser = async(id,city) => {
  let references = collection(db,'posts')
  await deleteDoc(doc(references,id)).then(()=>{
    getPostsForUsers(city);
  })
}

export const status =async(post,city)=>{
  let references = collection(db,'posts')
  let newPost = {...post,status:!post.status}
  await updateDoc(doc(references,post.id),newPost).then(()=>{
    getPostsForUsers(city);
  })
}

export const postComment = async(post,comment)=>{
  let references = collection(db,'posts')
  let newPost = {...post,comment:comment}
  return await updateDoc(doc(references,post.id),newPost).then(()=>{
    getPostsForUsers(comment[comment.length-1].city);
  })
}

export const isShowComment = (id)=>{
  store.dispatch({type:types.isShowComment,
                  payload:id})
}