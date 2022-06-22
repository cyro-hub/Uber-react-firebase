import React,{useState,useEffect} from 'react';
import * as appActions from '../../redux/actions/app'
import {utils} from './utility'

const ModalDiv = ()=>{
const [post,setPost]=useState({
  mapLocation:'',
  location:'',
  destination:'',
  description:'',
  price:'',
  comment:[],
  postTime:`${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`,
  status:false
})

const submitPost=(e)=>{
  e.preventDefault();
  appActions.isPostModal();
}

useEffect(()=>{
  const handleLocation=async()=>{
    if(navigator.geolocation){
      return await navigator.geolocation.getCurrentPosition((position=>{
        setPost({...post,mapLocation:{lat:position.coords.latitude,lon:position.coords.longitude}})
      }))
    }
  }
  handleLocation()
},[post])

  return<>
      <input type="text" 
             name='location' 
             value={post.location} 
             onChange={(e)=>utils(e,post,setPost)}
             placeholder='Please Enter Location'
             autoComplete='off' />
      <input type="text" 
             name='destination' 
             value={post.destination} 
             onChange={(e)=>utils(e,post,setPost)}
             placeholder='Please Enter Destination'
             autoComplete='off' />
      <input type="number" 
             name='price' 
             value={post.price} 
             onChange={(e)=>utils(e,post,setPost)}
             placeholder='Please Enter price'
             autoComplete='off' />
      <textarea name="description"
                cols="30" 
                rows="10"
                value={post.description}
                onChange={(e)=>utils(e,post,setPost)}
                placeholder='message'
                autoComplete='off'
                >    
      </textarea>
      <div>
          <button className='submit' onClick={submitPost}>Post</button>
      </div>
  </>
}

export default ModalDiv