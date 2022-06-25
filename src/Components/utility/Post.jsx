import React,{useState,useEffect} from 'react';
import Nav from './Nav'
import * as fire from '../../firebase'
import * as appActions from '../../redux/actions/app'
import * as userActions from '../../redux/actions/user'
import './css/register.scss'
import {useSelector} from 'react-redux';
import {BiRefresh} from 'react-icons/bi'
import SyncLoader from 'react-spinners/SyncLoader'
import {handleLocation} from './utility'

const ModalDiv = ()=>{
const isPosting = useSelector(state=>state.app.isPosting)
const area = useSelector(state=>state.app.area)
const mapLocation = useSelector(state=>state.app.mapLocation)
const userDetails = useSelector(state=>state.user.userDetails)
const [warning,setWarning]=useState('');
const [success,setSuccess]=useState('');
const [post,setPost]=useState({
  location:'',
  destination:'',
  description:'',
  price:'',
  mapLocation:'',
  comment:[],
  postTime:`${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`,
  status:false,
  uid:fire.auth.currentUser?.uid,
})

const handleChange=(e)=>{
  setPost({...post,[e.target.name]:e.target.value})
}

const handleRefresh=()=>{
  handleLocation()
  setPost({...post,country:area.country,
    city:area?.city,
    region:area?.region,
    timeZone:area?.timezone,
    ip:area?.ip,
    role:userDetails?.role,
    org:area?.org,
    mapLocation:mapLocation,})
}

const submitPost=(e)=>{
  e.preventDefault();

  for(const key in post){
    if(post[key]===''){
    setWarning(`${key} is empty`)
    return
  } 
}

appActions.isPosting()
userActions.addPost(post).then(()=>{
  setPost({...post,location:'',
  destination:'',
  description:'',
  price:'',})
  window.location.href='/user';
}).catch(error=>{
  setWarning(error.message)
})

}
  
useEffect(()=>{
  const timer = setTimeout(()=>{
    setWarning('');
    setSuccess('')
  },4000)

  return()=>clearTimeout(timer)
})

  return<section className='register max_width'>
    <Nav/>
    <h1>Add Post</h1>
      <form>
      {success&&<p className='success'>{success}</p>}
      {warning&&<p className='warning'>{warning}</p>}
      <input type="text" 
             name='location' 
             value={post.location} 
             onChange={handleChange}
             placeholder='Location'
             autoComplete='off' />
      <input type="text" 
             name='destination' 
             value={post.destination} 
             onChange={handleChange}
             placeholder='Destination'
             autoComplete='off' />
      <input type="number" 
             name='price' 
             value={post.price} 
             onChange={handleChange}
             placeholder='Price'
             autoComplete='off' />
      <textarea name="description"
                cols="30" 
                rows="10"
                value={post.description}
                onChange={handleChange}
                placeholder='message'
                autoComplete='off'
                >    
      </textarea>
      <p className='info'>If mapLocation is empty click the refresh icon, If you have change your location</p>
      <div>
          <button className='submit' onClick={submitPost}>
            {
              isPosting?<SyncLoader color={`white`} 
              loading={true} 
              size={5} />:'Post'
            }
          </button>
          <BiRefresh size={25}
                     onClick={handleRefresh}/>
      </div>
      </form>
  </section>
}

export default ModalDiv