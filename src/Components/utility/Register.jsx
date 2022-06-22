import React,{useEffect, useState} from 'react'
import * as appActions from '../../redux/actions/app'
import Avatar from '@mui/material/Avatar';
import Nav from './Nav'
import {regions} from '../data'
import {utils,submit} from '../utility/utility'
import './css/register.scss'

function Register() {
const [warning,setWarning]=useState('')
const [image,setImage]=useState(null)
const [user,setUser] = useState({
  name:'',
  phone:'',
  password:'',
  confirmPassword:'',
  location:regions[0],
  role:'user',
  imageURL:''
})

const handleSubmit=(e)=>{
  e.preventDefault()
  
  for(const key in user){
      if(user[key]===''){
      setWarning(`${key} is empty`)
      return
  }

  if(!user.password.match(passwordPattern)){
    setWarning('Password must contain atleast 8 letter or numbers')
    return;
  }

  if(!user.tel.match(numberPattern)){
      setWarning('Phone number is incorrect')
      return;
  }

  for(const key in user){
      if(user[key]===''){
        setWarning(`${key} is empty`)
      }
  }
  
  // if all the tests are completed run the submit function   
  submit(user)
  }
}

useEffect(()=>{
  const timer = setTimeout(()=>{
    setWarning('');
  },4000)

  return()=>clearTimeout(timer)
})

  return <section className='register max_width'>
    <Nav/>
    <h1>Sign-up</h1>
    <form onSubmit={handleSubmit}>
      {warning&&<p className='warning'>{warning}</p>}
        <label htmlFor="image" className='submit contact'>
          {
            image?<Avatar alt="Selected image"
                          src={URL.createObjectURL(image)}
                          sx={{ width: 120, height: 120 }}/>:<>
                          <Avatar sx={{ width: 100, height: 110 }}/>
                          Select an image</>
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
               placeholder='Please Enter your name'
               autoComplete='off' />
        <input type="text" 
               name='phone' 
               value={user.phone} 
               onChange={(e)=>utils(e,user,setUser)}
               placeholder='Please Enter your phone number'
               autoComplete='off' />
        <input type="password" 
               name='password' 
               value={user.password} 
               onChange={(e)=>utils(e,user,setUser)}
               placeholder='Please Enter your password'
               autoComplete='off' />
        <input type="password" 
               name='confirmPassword' 
               value={user.confirmPassword} 
               onChange={(e)=>utils(e,user,setUser)}
               placeholder='Please Confirm your password'
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
                onChange={(e)=>utils(e,user,setUser)}
                autoComplete='off'>
                <option value='user'>User</option>
                <option value='driver'>Driver</option>
        </select>
        <div>
          <button type='submit' className='submit'>Signup</button>
          <button className='swap' onClick={appActions.isSignup}>Signin</button>
        </div>
    </form>
  </section>
}

var numberPattern = new RegExp("^((62)|(67)|(66)|(65))[0-9]{7}$");
var passwordPattern = new RegExp('^[0-9A-Za-z]{8,}$');

export default Register