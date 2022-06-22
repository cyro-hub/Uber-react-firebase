import React, { useState } from 'react'
import {regions} from '../data';
import {utils,submit} from './utility';
// import './css/contact.scss'
import './css/register.scss'

function Contact() {
const [warning,setWarning]=useState('')
const [contact,setContact]=useState({
    name:'',
    region:regions[0],
    message:''
})

const handleSubmit=(e)=>{
e.preventDefault()

for(const key in contact){
    if(contact[key]===''){
    setWarning(`${key} is empty`)
    return
}

// if all the tests are completed run the submit function   
submit(contact)
}

}

  return (<section className='register max-width'>
      <h1>Contact-Us</h1>
      <form onSubmit={(e)=>handleSubmit(e,contact)}>
        {warning&&<p className='warning'>{warning}</p>}
        <input type="text" 
               name='name' 
               value={contact.name} 
               onChange={(e)=>utils(e,contact,setContact)}
               placeholder='Please Enter your name'
               autoComplete='off' />
        <select name="region" 
                onChange={(e)=>utils(e,contact,setContact)}
                autoComplete='off'>
            {
                regions.map((region,i)=><option value={region} key={i}>
                    {region}
                </option>)
            }
        </select>  
        <textarea name="message"
                  cols="30" 
                  rows="10"
                  value={contact.message}
                  onChange={(e)=>utils(e,contact,setContact)}
                  placeholder='message'
                  autoComplete='off'
                  >    
        </textarea>
        <div>
            <button type='submit' className='submit'>Submit</button> 
        </div>        
      </form>
  </section>)
}

export default Contact