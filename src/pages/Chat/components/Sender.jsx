import React,{useEffect,useRef} from 'react'
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import locationImage from '../../../images/location.jpg'

function Sender({message}) {
const scrollRef = useRef();

useEffect(()=>{
  scrollRef.current?.scrollIntoView({behavior:'smooth'})
},[message])

  return <div className='sender' ref={scrollRef}>
      <div className='msg_content'>
          <div className="msg">
          <p className='right'>{message.senderName}</p>
          {
              message.message&&<p>{message.message}</p>
          }
          {
              message.location&&<a href={`https://www.google.com/maps?q=${message.location.lat},${message.location.lon}`}
                                    target='blank'>
                                    <img src={locationImage} alt="location" style={{width:'170px',height:'90px'}}/>
                                </a>
          }
          {
              message.file&&<iframe src={message.file} height="110" width="170" scrolling="no" style={{overflow:"hidden"}} frameBorder="0" title={message.message}></iframe>
          }
          </div>
          <p className='left'>{moment(message.messageTime.toDate()).fromNow()}</p>
      </div>
      <Avatar src={message.senderImageURL}
              sx={{ width: 30, height: 30 }}
              className='right-down'/>
    </div>
}

export default Sender