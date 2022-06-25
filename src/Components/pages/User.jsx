import React, { useState ,useEffect} from 'react'
import {Link} from 'react-router-dom'
import * as userActions from '../../redux/actions/user'
import * as utils from '../utility/utility'
import '../utility/css/user.scss'
import {Post,PostUser,UserNames} from '../utility/UserUtility';
import { useSelector } from 'react-redux';
import {AiOutlineAppstoreAdd,AiOutlineHome} from 'react-icons/ai'
import {MdOutlineLogout} from 'react-icons/md'
import {BiRefresh} from 'react-icons/bi'

function User() {
const [search,setSearch]=useState('')
const [success,setSuccess]=useState('')
const area = useSelector(state=>state.app.area)
const user = useSelector(state=>state.user.user)
const posts = useSelector(state=>state.user.posts);
const users = useSelector(state=>state.user.users);

const handleRefresh=()=>{
    utils.handleLocation()
    userActions.getPostsForUsers(area?.city);
    userActions.getUsers(area?.city)
}

useEffect(()=>{
    utils.handleLocation()
    setSuccess('Click the refresh icon to see post')
},[])

useEffect(()=>{
    const timer = setInterval(()=>{
        userActions.getUsers(area?.city)
        utils.handleLocation()
        userActions.removePost()
    },600000)
return ()=>clearInterval(timer)
})

useEffect(()=>{
    const timer = setInterval(()=>{
        userActions.getPostsForUsers(area?.city)
    },60000)
return ()=>clearInterval(timer)
})

useEffect(()=>{
    const timer = setTimeout(()=>{
      setSuccess('');
    },4000)
  
    return()=>clearTimeout(timer)
  })
  return (<section className='user max_width'>
     {success&&<p className='info'>{success}</p>}
     <section className="user_head">
         <Link to='/post'><AiOutlineAppstoreAdd size={28}/></Link>
         <Link to=''>
             <BiRefresh size={28}
                        onClick={handleRefresh}/>
        </Link>
         <input type="text"
                name='search'
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder='search'
                autoComplete='off'/>
         <Link to='/'><AiOutlineHome size={28}/></Link>
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
                posts?.filter(post=>post.location.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((post,i)=><React.Fragment key={i}>
                    {
                        post.role==='user'&&<>{post.uid===user.uid?<PostUser post={post}/>:<Post post={post}/>}</>
                    }
                    {
                        post.role==='driver'&&<>{post.uid===user.uid?<PostUser post={post}/>:<Post post={post}/>}</>
                    }
                    </React.Fragment>)
            }
         </section>


        
     </section>
  </section>)
}

export default User