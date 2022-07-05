import {useState,useEffect} from 'react';
import '../css/userutility.scss'
import locationImage from '../../../images/location.jpg'
import * as userActions from '../../../redux/actions/user'
import {MdDoneAll,MdDone,MdOutlineComment,MdOutlineDeleteOutline} from 'react-icons/md';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import Comment from './Comment';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import {BsFillCircleFill} from 'react-icons/bs'
import * as fire from '../../../firebase'
import {doc,onSnapshot} from 'firebase/firestore'

export const Post=({post})=>{
const showComment = useSelector(state=>state.user.showComment)
const {mapLocation,location,destination,description,postTime,status,price} = post;
const {lon,lat} = mapLocation;

        return(<div className='user_post'>
            <table>
                <thead>
                    <tr>
                    <th>Location</th>
                    <th>Destination</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{location}</td>
                    <td>{destination}</td>
                    <td>
                        <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'CFA '} />
                    </td>
                    </tr>
                </tbody>
            </table>
            <a href={`https://www.google.com/maps?q=${lat},${lon}`}
                  target='blank'>
                 <img src={locationImage} alt="location" style={{width:'200px',height:'130px'}}/>
            </a>
            <div>
                <h2>Description</h2>
                <p>{description}</p>
            </div>
            <p>{moment(postTime).fromNow()}</p>
            <div className='actions'>
                {status?<MdDoneAll size={20}/>:<MdDone size={20}/>}
                <MdOutlineComment size={20} 
                onClick={()=>userActions.isShowComment(post.id)}/>
            </div>
                {showComment===post.id&&<Comment post={post}/>}
        </div>)
}

export const PostUser=({post})=>{
const {mapLocation,location,destination,description,postTime,status,price} = post;
const {lon,lat} = mapLocation;
const area = useSelector(state=>state.app.area)
const showComment = useSelector(state=>state.user.showComment)

    return(<div className='user_post'>
        <table>
            <thead>
                <tr>
                <th>Location</th>
                <th>Destination</th>
                <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>{location}</td>
                <td>{destination}</td>
                <td>
                    <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'CFA '} />
                </td>
                </tr>
            </tbody>
        </table>
        <a href={`https://www.google.com/maps?q=${lat},${lon}`}
              target='blank'>
             <img src={locationImage} alt="location" style={{width:'200px',height:'130px'}}/>
        </a>
        <div>
            <h2>Description</h2>
            <p>{description}</p>
        </div>
        <p>{moment(postTime).fromNow()}</p>
        <div className='actions'>
            {status?<MdDoneAll size={20}
                               onClick={()=>userActions.status(post,area?.city)}/>:
                    <MdDone size={20}
                            onClick={()=>userActions.status(post,area?.city)}/>}
            <MdOutlineComment size={20} 
                              onClick={()=>userActions.isShowComment(post.id)}/>
            <MdOutlineDeleteOutline size={20}
                                    onClick={()=>userActions.removePostByUser(post)}/>
        </div>
        {showComment===post.id&&<Comment post={post}/>}
    </div>)
}

export const UserNames =({user}) =>{
const userDetails = useSelector(state=>state.user.userDetails)
const [lastMessageContent,setLastMessageContent]=useState(null)

useEffect(()=>{
const id = userDetails.uid>user.uid?`${userDetails.uid+user.uid}`:`${user.uid+userDetails.uid}`;

const unsubscribe = onSnapshot(doc(fire.db,'lastMessage',id),(doc)=>{
    if(typeof(doc.data())==='object'){
    setLastMessageContent({...doc.data(),id:doc.id})
    }
})

return ()=>unsubscribe()
},[])

return(<div className='user_name' onClick={()=>userActions.setChatName(user,userDetails,lastMessageContent)}>
    <Avatar alt="Selected image"
            src={user.imageURL}
            sx={{ width: 40, height: 40 }}/>
    <div className='name'>
        <h2>{user.name}</h2>
        {
            lastMessageContent===null?<h4>no-message</h4>:
            lastMessageContent?.senderUID===userDetails.uid?
            <h4>{`me. ${lastMessageContent?.message}`}</h4>:
            <h4>{`${lastMessageContent?.message}`}</h4>
        }
    </div>
    <span>
        {
        user.online?<BsFillCircleFill className='online' size={13}/>:<BsFillCircleFill className='offline' size={13}/>
        }
        {
            lastMessageContent?.senderUID!==userDetails.uid&&lastMessageContent?.unread&&<i>new</i>
        }
    </span>
</div>)
}