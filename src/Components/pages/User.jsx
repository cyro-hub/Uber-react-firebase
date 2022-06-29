import React, { useState ,useEffect} from 'react'
import {Link} from 'react-router-dom'
import * as userActions from '../../redux/actions/user'
import * as utils from '../utility/utility'
import '../utility/css/user.scss'
import {Post,PostUser,UserNames} from '../utility/UserUtility';
import { useSelector } from 'react-redux';
import {AiOutlineAppstoreAdd,AiOutlineHome} from 'react-icons/ai'
import {MdOutlineLogout} from 'react-icons/md'
import Avatar from '@mui/material/Avatar';

function User() {
const [search,setSearch]=useState('')
const posts = useSelector(state=>state.user.posts)
const users = useSelector(state=>state.user.users);
const userDetails = useSelector(state=>state.user.userDetails)

useEffect(()=>{
    utils.handleLocation()
},[])

const reLoad = ()=>{
    if(userDetails?.role === 'passenger'){
        userActions.getUserPosts(userDetails?.uid);
        utils.getDriversAroundYou();
    }else if(userDetails?.role === 'driver'){
        utils.getPostsAroundYou(userDetails.uid)
        utils.getUsersAroundYou()
    }
}

useEffect(()=>{
    const timer = setInterval(()=>{
        reLoad()
    },5000)

    return ()=> clearInterval(timer);
})

  return (<section className='user max_width'>
     <section className="user_head">
         <Link to='/post'><AiOutlineAppstoreAdd size={28}/></Link>
         <Link to='/'>
            <AiOutlineHome size={28}/>
         </Link>
         <input type="text"
                name='search'
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder='search'
                autoComplete='off'/>
         <Link to='/profile'><Avatar alt="Selected image"
                             src={userDetails.imageURL}
                             sx={{ width: 30, height: 30 }}
                            /></Link>
         <Link to='' onClick={userActions.signout}><MdOutlineLogout size={28}/></Link>
     </section>
     <section className="user_body">
         <section className="user_sidebar scroll">
            {
                users?.map((user,i)=><UserNames user={user} key={i}/>)
            }
         </section>
         <section className="user_posts scroll">
            {
                posts?.filter(post=>post.location.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((post,i)=><React.Fragment key={post.id}>
                    {
                        userDetails.role==='passenger'&&post.uid===userDetails.uid&&<PostUser post={post}/>
                    }
                    {
                        userDetails.role==='driver'&&<>{post.uid===userDetails.uid?<PostUser post={post}/>:<Post post={post}/>}</>
                    }
                    </React.Fragment>)
            }
         </section>


        
     </section>
  </section>)
}

export default User