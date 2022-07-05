import React,{useState,useEffect} from 'react'
import {AiOutlineSend} from 'react-icons/ai'
import {ImAttachment} from 'react-icons/im'
import {GoLocation} from 'react-icons/go'
import * as utils from '../../../utility/utility'
import '../css/inputMessage.scss'
import { useSelector } from 'react-redux';
import * as userActions from '../../../redux/actions/user'

const Input=()=>{
const chatName = useSelector(state=>state.user.chatName)
const mapLocation = useSelector(state=>state.app.mapLocation)
const user = useSelector(state=>state.user.userDetails)
const [message,setMessage] = useState({
    message:'',
    file:null,
    location:'',
    unread:true,
})

useEffect(()=>{
setMessage({...message,senderUID:user.uid,
                senderName:user.name,
                senderImageURL:user.imageURL,
                receiverUID:chatName.uid,
                receiverName:chatName.name,
                receiverImageURL:chatName.imageURL,})
},[message.file,message.location,message.message])

const handleSubmit=()=>{
    if(message.message==='') return
    userActions.sendMessage(message).then(()=>{
        setMessage({...message,message:''})
    })
}

useEffect(()=>{
    if(message.file||message.location){
        userActions.sendMessage(message)
        .then(()=>{
            setMessage({...message,file:null,location:'',message:''})
        })
    }
},[message.file,message.location])

return(<section className="input">
    <label htmlFor='file'><ImAttachment size={25}/></label>
        <input type='file' 
               style={{display:'none'}} 
               id='file' 
               name='file'
               accept='image/*'
               onChange={(e)=>setMessage({...message,[e.target.name]:e.target.files[0]})}/>
        <GoLocation size={25}
                    onClick={()=>{
                        utils.handleLocation()
                        setMessage({...message,location:mapLocation})
                        }}/>
            <input type="text"
            name='message'
            value={message.message}
            onChange={(e)=>utils.utils(e,message,setMessage)}
            placeholder={`type a message to ${chatName.name}`}
            autoComplete='off'
            onKeyDown={(e)=>{
                if(e.keyCode===13){
                    handleSubmit()
                }
            }}/>
    <AiOutlineSend size={25}
                   onClick={handleSubmit}
                   className='send'/>
</section>)
}


export default Input