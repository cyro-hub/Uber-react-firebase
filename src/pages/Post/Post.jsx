import React,{useState,useEffect} from 'react';
import Nav from '../Home/components/Nav';
import * as fire from '../../firebase';
import * as appActions from '../../redux/actions/app';
import * as userActions from '../../redux/actions/user';
import '../Account/css/register.scss';
import {useSelector} from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';
import BeatLoader from 'react-spinners/BeatLoader';
import {handleLocation} from '../../utility/utility';
import geohash from "ngeohash";
import {BiRefresh} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';

const ModalDiv = ()=>{
const isPosting = useSelector(state=>state.app.isPosting)
const area = useSelector(state=>state.app.area)
const mapLocation = useSelector(state=>state.app.mapLocation)
const userDetails = useSelector(state=>state.user.userDetails)
const [warning,setWarning]=useState('');
const [success,setSuccess]=useState('');
const [isLoading,setIsLoading]=useState(false)
const [post,setPost]=useState({
  location:'',
  destination:'',
  description:'',
  price:'',
  mapLocation:'',
  comment:[],
  postTime:(new Date()).toUTCString(),
  status:false,
  uid:fire.auth.currentUser?.uid,
})

const navigate = useNavigate();

const handleChange=(e)=>{
  setPost({...post,[e.target.name]:e.target.value})
}

const handleRefresh = async()=>{
  setIsLoading(true)
  await handleLocation()
  if(area===null && mapLocation===null){
    setWarning('Was unable to get you location click refresh again')
    setIsLoading(false)
    return
  }
  setPost({...post,
    role:userDetails?.role,
    mapLocation:mapLocation,
    geohash:geohash.encode(mapLocation?.lat, mapLocation?.lon),
    uid:fire.auth.currentUser?.uid})
    setWarning('')
  setSuccess(`You live in ${area?.city} ${area?.timezone}`)
  setIsLoading(false)
  return;
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

  appActions.isPosting()
  
  setSuccess('Successfully added a post')
  
  navigate('/user');
}).catch(error=>{
  setWarning(error.message)
  appActions.isPosting()
})

}
  
useEffect(()=>{
  const timer = setTimeout(()=>{
    setWarning('');
    setSuccess('')
  },4000)

  return()=>clearTimeout(timer)
})

useEffect(()=>{
  handleRefresh();
},[])

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
          {isLoading?<BeatLoader color={`green`} 
              loading={true} 
              size={15}/>:<BiRefresh size={25}
              onClick={handleRefresh}/>}
      </div>
      </form>
  </section>
}

export default ModalDiv