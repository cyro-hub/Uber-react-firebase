import React,{useEffect,useRef} from 'react'
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import locationImage from '../../../images/location.jpg'

function Receiver({message}) {
const scrollRef = useRef();

useEffect(()=>{
  scrollRef.current?.scrollIntoView({behavior:'smooth'})
},[message])

  return (<div className='receiver' ref={scrollRef}>
      <Avatar src={message.senderImageURL}
              sx={{ width: 30, height: 30 }}
              className='left-down'/>
      <div className='msg_content'>
          <div className="msg">
            <p className='left'>{message.senderName}</p>
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
                message.file&&<img src={message.file} alt={message.message} style={{width:'170px',height:'90px'}}/>
            }
          </div>
          <p className='right'>{moment(message.messageTime.toDate()).fromNow()}</p>
       </div>
  </div>)
}

export default Receiver