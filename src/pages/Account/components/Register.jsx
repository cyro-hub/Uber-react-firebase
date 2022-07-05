import React,{useEffect, useState} from 'react'
import * as appActions from '../../../redux/actions/app'
import * as userActions from '../../../redux/actions/user'
import Avatar from '@mui/material/Avatar';
import Nav from '../../Home/components/Nav'
import {regions} from '../../../data'
import {utils} from '../../../utility/utility'
import '../css/register.scss'
import {BiRefresh} from 'react-icons/bi'
import {AiOutlineUser} from 'react-icons/ai'
import {handleLocation} from '../../../utility/utility'
import {useSelector} from 'react-redux'
import geohash from "ngeohash";
import { useNavigate } from 'react-router-dom'

function Register() {
const area = useSelector(state=>state.app.area)
const mapLocation = useSelector(state=>state.app.mapLocation)
const [warning,setWarning]=useState('')
// const [success,setSuccess]=useState('')
const [image,setImage]=useState(null)
const [user,setUser] = useState({
  name:'',
  email:'',
  password:'',
  confirmPassword:'',
  location:regions[0],
  role:'passenger',
  imageURL:'url',
  city:''
})

const navigate = useNavigate();

const handleRefresh=()=>{
  handleLocation()
  setUser({...user,city:area?.city,
                    region:area?.region,
                    timeZone:area?.timezone,
                    ip:area?.ip,
                    geohash:geohash.encode(mapLocation?.lat, mapLocation?.lon),
                    org:area?.org,})
}

useEffect(()=>{
  handleRefresh() 
  setUser({...user,city:area?.city,
    region:area?.region,
    timeZone:area?.timezone,
    ip:area?.ip,
    geohash:geohash.encode(mapLocation?.lat, mapLocation?.lon),
    org:area?.org,})
},[])

const handleSubmit=(e)=>{
  e.preventDefault()
  
  for(const key in user){
      if(user[key]===''){
      setWarning(`${key} is empty`)
      return
  } 
}

  if(!passwordPattern.test(user.password)){
    setWarning('Password must contain atleast 8 letter or numbers')
    return;
  }
//setting the loader
appActions.isPosting();

// posting the user
userActions.signUpUser({...user,imageURL:image}).then(()=>{
    navigate('/user');
})
.catch((error)=>{
  appActions.isPosting()
  setWarning(error.message)
})

}

useEffect(()=>{
  const timer = setTimeout(()=>{
    setWarning('');
  },4000)

  return()=>clearTimeout(timer)
},[warning])

  return <section className='register max_width'>
    <Nav/>
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      {warning&&<p className='warning'>{warning}</p>}
      {/* {success&&<p className='success'>{success}</p>} */}
        <label htmlFor="image" className='submit contact'>
          {
            image?<Avatar alt="Selected image"
                          src={URL.createObjectURL(image)}
                          sx={{ width: 120, height: 120 }}/>:<div className='preImage'>
                            <AiOutlineUser size={40}/>
                          <p>Add profile image</p></div>
          }
          <input type="file"  
                 className='input' 
                 autoComplete="off" 
                 name='image' 
                 id='image' 
                 onChange={(e)=>{setImage(e.target.files[0])}} 
                 style={{display:'none'}} 
                 accept={'.jpeg,.png,.jpg,.gif'} />
        </label>
        <input type="text" 
               name='name' 
               value={user.name} 
               onChange={(e)=>utils(e,user,setUser)}
               placeholder='Name'
               autoComplete='off' />
        <input type="email" 
               name='email' 
               value={user.email} 
               onChange={(e)=>utils(e,user,setUser)}
               placeholder='Email'
               autoComplete='off' />
        <input type="password" 
               name='password' 
               value={user.password} 
               onChange={(e)=>utils(e,user,setUser)}
               placeholder='Password'
               autoComplete='off' />
        <input type="password" 
               name='confirmPassword' 
               value={user.confirmPassword} 
               onChange={(e)=>utils(e,user,setUser)}
               placeholder='Confirm your password'
               autoComplete='off' />
        <select name="location" 
                onChange={(e)=>utils(e,user,setUser)}
                autoComplete='off'>
            {
                regions.map((region,i)=><option value={region} key={i}>
                    {region}
                </option>)
            }
        </select>
        <select name='role'
                onChange={(e)=>utils(e,user,setUser)}>
                <option value='passenger'>Passenger</option>
                <option value='driver'>Driver</option>
        </select>
        <p className='info'>If city is empty click the refresh icon or If you have change your location</p>
        <div>
          <button type='submit' className='submit'>Register</button>
          <BiRefresh size={28}
                     onClick={handleRefresh}/>
          <button className='swap' onClick={appActions.isSignup}>Login</button>
        </div>
    </form>
  </section>
}

var passwordPattern = new RegExp('^[0-9A-Za-z]{8,}$');

export default Register
