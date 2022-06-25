import React,{useState,useEffect} from 'react'
import {utils} from '../utility/utility'
import * as appActions from '../../redux/actions/app'
import * as userActions from '../../redux/actions/user'
import Nav from './Nav'
import './css/register.scss'

function Login() {
const [warning,setWarning]=useState('')
const [success,setSuccess]=useState('')
const [user,setUser]=useState({
  email:'',
  password:''
})

const handleSubmit=(e)=>{
  e.preventDefault()
  
  for(const key in user){
      if(user[key]===''){
      setWarning(`${key} is empty`)
      return
    }
  }
  appActions.isPosting()
  userActions.signInUser(user)
  .then(()=>{
    appActions.isPosting()
    window.location.href='/user';
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
  return <section className='register max-width'>
    <Nav/>
    <h1>Login</h1>
    <form onSubmit={(e)=>handleSubmit(e)}>
      {warning&&<p className='warning'>{warning}</p>}
      {success&&<p className='success'>{success}</p>}
        <input type="email" 
               name='email' 
               value={user.phone} 
               onChange={(e)=>utils(e,user,setUser)}
               placeholder='Email'
               autoComplete='off' />
        <input type="password" 
               name='password' 
               value={user.password} 
               onChange={(e)=>utils(e,user,setUser)}
               placeholder='Password'
               autoComplete='off' />
        <div>
          <button type='submit' className='submit'>Login</button>
          <button className='swap' onClick={appActions.isSignup}>Register</button>
        </div>       
    </form>
  </section>
}

export default Login