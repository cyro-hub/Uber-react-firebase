import './css/userutility.scss'
import {useState} from 'react'
import locationImage from '../../images/location.jpg'
import * as userActions from '../../redux/actions/user'
import {AiOutlineEdit} from 'react-icons/ai';
import {MdDoneAll,MdDone,MdOutlineComment,MdOutlineDeleteOutline} from 'react-icons/md';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import Comment from './Comment';

export const Post=({post})=>{
const showComment = useSelector(state=>state.user.showComment)
const {mapLocation,location,destination,description,postTime,status,comments,price,id} = post;
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
                    <td>{`${price} fcfa`}</td>
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
            <p>{postTime}</p>
            <div className='actions'>
                {status?<MdDoneAll size={20}/>:<MdDone size={20}/>}
                <MdOutlineComment size={20} 
                onClick={()=>userActions.isShowComment(post.id)}/>
                {showComment===post.id&&<Comment post={post}/>}
            </div>
        </div>)
}

export const PostUser=({post})=>{
const {mapLocation,location,destination,description,postTime,status,comments,price,id} = post;
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
                <td>{`${price} fcfa`}</td>
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
        <p>{postTime}</p>
        <div className='actions'>
            {status?<MdDoneAll size={20}
                               onClick={()=>userActions.status(post,area?.city)}/>:
                    <MdDone size={20}
                            onClick={()=>userActions.status(post,area?.city)}/>}
            <MdOutlineComment size={20} 
                              onClick={()=>userActions.isShowComment(post.id)}/>
                              {showComment===post.id&&<Comment post={post}/>}
            <MdOutlineDeleteOutline size={20}
                                    onClick={()=>userActions.removePostByUser(id,area?.city)}/>
        </div>
    </div>)
}

export const UserNames =({user}) =>{

return(<div className='user_name'>
    <Avatar alt="Selected image"
            src={user.imageURL}
            sx={{ width: 35, height: 35 }}/>
    <div className='name'>
        <h2>{user.name}</h2>
        <h4>{user.role}</h4>
    </div>
</div>)
}