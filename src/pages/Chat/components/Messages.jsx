import React,{useEffect,useRef} from 'react'
import '../css/messages.scss'
import {useSelector} from 'react-redux'
import Sender from './Sender'
import Receiver from './Receiver'

function Messages() {
const messages = useSelector(state=>state.user.messages)
const userDetails = useSelector(state=>state.user.userDetails)

return (<div className='messages'>
{
  messages?.map((message,i)=><React.Fragment key={message.id}>
    {
      userDetails.uid===message.senderUID?<Sender message={message}/>:<Receiver message={message}/>
    }
  </React.Fragment>)
}
</div>)
}

export default Messages