import * as types from '../action type'
import {store} from '../store'
import * as appActions from './app'
import * as fire from '../../firebase'
import { ref, uploadBytes, getDownloadURL ,deleteObject } from "firebase/storage";
import {collection, query, where, addDoc,deleteDoc,doc,updateDoc,onSnapshot,orderBy,Timestamp,setDoc} from 'firebase/firestore'
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut,updateProfile,deleteUser } from "firebase/auth";
import {db} from '../../firebase'

export const signUpUser = async(user)=>{
let references = collection(db,'users')
const imageName = 'users/'+(new Date()).toUTCString();
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
                        displayName: newUser.name,
                        photoURL:newUser.imageURL,
                        role:newUser.role
                      }).then(()=>{
                        appActions.isPosting()
                        appActions.isPostModal()
                        window.location.href='/user'
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

export const signout =async(user)=>{
  await signOut(fire.auth).then(() => {
    let references = collection(fire.db, 'users')
    let newUser = { ...user, online: false }
    updateDoc(doc(references, user.id), newUser)
  }).catch((error) => {
    console.log(error)
  });
}

export const getUserPosts =async(uid)=>{
  onSnapshot(query(collection(fire.db, "posts"), where('uid','==',uid)), (querySnapshot)=>{
      let posts = []
      querySnapshot.forEach((doc) => {
        posts.push({...doc.data(),id:doc.id});
      });
      store.dispatch({type:types.getPosts,payload:posts})
      localStorage.setItem('posts',JSON.stringify(posts))
    })
}

export const addPost =async(post)=>{
  let references = collection(db,'posts')
  return await addDoc(references,post)
}

export const setUserDetails = (role)=>{
  store.dispatch({
    type:types.setUserDetails,
    payload:role
  })
}

export const removePostByUser = async(post) => {
  let references = collection(db,'posts')
  await deleteDoc(doc(references,post.id))
}

export const status =async(post,city)=>{
  let references = collection(db,'posts')
  let newPost = {...post,status:!post.status}
  await updateDoc(doc(references,post.id),newPost)
}

export const postComment = async(post,comment)=>{
  let references = collection(db,'posts')
  let newPost = {...post,comment:comment}
  return await updateDoc(doc(references,post.id),newPost)
}

export const isShowComment = (id)=>{
  store.dispatch({type:types.isShowComment,
                  payload:id})
}

export const setUser=(user)=>{
  store.dispatch({type:types.setUser,payload:user})
}

export const setChatName = async(chatName,userDetails,lastMessage)=>{

  const id = userDetails.uid>chatName.uid?`${userDetails.uid+chatName.uid}`:`${chatName.uid+userDetails.uid}`;

  store.dispatch({ type: types.setChatName, payload: chatName })
  onSnapshot(query(collection(fire.db, "messages",id,'chat'),orderBy('messageTime','asc')),
  (querySnapshot)=>{
   let messages = []
   querySnapshot.forEach((doc) => {
     messages.push({...doc.data(),id:doc.id});
   });
   store.dispatch({type:types.getMessagesOfChatName,payload:messages})
    })
  updateDoc(doc(collection(fire.db, 'lastMessage'), id), { ...lastMessage, unread: false })
}

export const sendMessage=async(message)=>{
const imageName = 'messages/'+(new Date()).toUTCString();
const imageRef = ref(fire.storage, imageName);
const {senderUID,receiverUID} = message;
const id = senderUID>receiverUID?`${senderUID+receiverUID}`:`${receiverUID+senderUID}`
let references = collection(db,'messages',id,'chat')

if(message.file){
  return await uploadBytes(imageRef, message.file)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              addDoc(references,{...message,file:url,
                messageTime:Timestamp.fromDate(new Date())})
                .then(()=>{
                  setDoc(doc(fire.db,
                    'lastMessage', id), {
                    ...message, file: url,
                    unread: true,
                    messageTime: Timestamp.fromDate(new Date())
                  })
                })
            }).catch((err)=>{
              const desertRef = ref(fire.storage, imageName);
                    deleteObject(desertRef)
            })
        })
}else{
  addDoc(references,{...message,messageTime:Timestamp.fromDate(new Date())})
    .then(() => {
      setDoc(doc(fire.db,
        'lastMessage', id), {
        ...message,
        unread: true,
        messageTime: Timestamp.fromDate(new Date())
      })
    })
}
}