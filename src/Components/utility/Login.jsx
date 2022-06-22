import React,{useState} from 'react'
import {utils,submit} from '../utility/utility'
import * as appActions from '../../redux/actions/app'
import Nav from './Nav'
import './css/register.scss'

function Login() {
const [warning,setWarning]=useState('')
const [user,setUser]=useState({
  phone:'',
  password:''
})

const handleSubmit=(e)=>{
  e.preventDefault()
  
  for(const key in user){
      if(user[key]===''){
      setWarning(`${key} is empty`)
      return
  }
  
  // if all the tests are completed run the submit function   
  submit(user)
  }
}

  return <section className='register max-width'>
    <Nav/>
    <h1>Sign-in</h1>
    <form onSubmit={(e)=>handleSubmit(e)}>
      {warning&&<p className='warning'>{warning}</p>}
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
        <div>
          <button type='submit' className='submit'>Signin</button>
          <button className='swap' onClick={appActions.isSignup}>Signup</button>
        </div>       
    </form>
  </section>
}

export default Login