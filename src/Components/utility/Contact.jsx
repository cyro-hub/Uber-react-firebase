import React, { useState } from 'react'
import {regions} from '../data';
import {utils} from './utility';
import * as appActions from '../../redux/actions/app'
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
}

appActions.addContact(contact).then(()=>{
    setContact({
        name:'',
        region:regions[0],
        message:''
    })
})
}

  return (<section className='register max-width'>
      <h1>Comment</h1>
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
                  placeholder='Please enter your comment'
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

export const DisplayContact=({contact})=>{

return(<div className='display_contact max_width'>
    <h3>{contact.name}</h3>
    <p>{contact.message}</p>
    <p className='italic'>{contact.region}</p>
</div>)
}