import './css/userutility.scss'
import locationImage from '../../images/location.jpg'
import * as userActions from '../../redux/actions/user'
import {AiOutlineEdit} from 'react-icons/ai';
import {MdDoneAll,MdDone,MdOutlineComment,MdOutlineDeleteOutline} from 'react-icons/md';
import Avatar from '@mui/material/Avatar';

export const Post=({post})=>{
const {mapLocation,location,destination,description,postTime,status,price} = post;
const {lon,lat} = mapLocation;

return(<div className='user_post'>
<a href={`https://www.google.com/maps?q=${lat},${lon}`}
      target='blank'>
        <img src={locationImage} alt="location" style={{width:'200px',height:'160px'}}/>
        </a>
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
        <div>
            <h2>Description</h2>
            <p>{description}</p>
        </div>
        <p>{postTime}</p>
        <div className='actions'>
            {status?<MdDoneAll size={20}/>:<MdDone size={20}/>}
            <MdOutlineDeleteOutline size={20}/>
        </div>
</div>)
}

export const PostUser=({post})=>{
const {mapLocation,location,destination,description,postTime,status,comments,price} = post;
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
             <img src={locationImage} alt="location" style={{width:'200px',height:'160px'}}/>
        </a>
        <div>
            <h2>Description</h2>
            <p>{description}</p>
        </div>
        <p>{postTime}</p>
        <div className='actions'>
            <AiOutlineEdit size={20}/>
            {status?<MdDoneAll size={20}/>:<MdDone size={20}/>}
            <MdOutlineComment size={20} 
            onClick={()=>userActions.showComments(comments)}/>
            <MdOutlineDeleteOutline size={20}/>
        </div>
    </div>)
}

export const UserNames =({user}) =>{

return(<div className='user_name'>
    <Avatar alt="Selected image"
            src={user.imageURL}
            sx={{ width: 35, height: 35 }}/>
    <h2>{user.name}</h2>
</div>)
}