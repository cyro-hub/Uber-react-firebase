import React,{useState,useEffect} from 'react'
import "./profile.scss"
import "../User/user.scss"
import { UserNames } from '../User/components/UserUtility'
import * as utils from '../../utility/utility'
import {Link} from 'react-router-dom'
import {AiOutlineAppstoreAdd,AiOutlineHome} from 'react-icons/ai'
import Moment from 'react-moment';
import {MdOutlineLogout} from 'react-icons/md'
import {BsFillChatDotsFill} from 'react-icons/bs'
import Avatar from '@mui/material/Avatar';
import MaterialTable from '@material-table/core';
import { useSelector } from 'react-redux';
import * as userActions from '../../redux/actions/user'


function Profile() {
const [search,setSearch]=useState('')
const posts = useSelector(state=>state.user.posts)
const users = useSelector(state=>state.user.users);
const user = useSelector(state=>state.user.user);
const userDetails = useSelector(state=>state.user.userDetails)

const reLoad = ()=>{
    if(userDetails?.role === 'passenger'){
        userActions.getUserPosts(userDetails?.uid);
        utils.getDriversAroundYou();
    }else if(userDetails?.role === 'driver'){
        userActions.getUserPosts(userDetails?.uid);
        utils.getUsersAroundYou()
    }
}

useEffect(()=>{
    const timer = setInterval(()=>{
        reLoad()
    },5000)

    return ()=> clearInterval(timer);
})

useEffect(()=>{
    reLoad()
},[])

const columns=[
    { title: 'Date', field: 'postTime' ,
      render: rowData => <Moment format="D MMM YYYY" withTitle>{rowData.postTime}</Moment> },
    { title: 'Location', field: 'location' },
    { title: 'Destination', field: 'destination'},
    { title: 'Price', 
      field: 'price',
      type:'currency',
      currencySetting:{currencyCode:'CFA',minimumFractionDigits:0}}
]

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
         <Link to={`/chat`}>
                <BsFillChatDotsFill size={28}/>
         </Link>
         <Link to='' onClick={()=>userActions.signout(userDetails)}><MdOutlineLogout size={28}/></Link>
     </section>
     <section className="user_body">
         <section className="user_sidebar scroll">
            {
                users?.filter(user=>user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((user,i)=><React.Fragment key={user.uid}>
                            <UserNames user={user}/>
                          </React.Fragment >)
            }
         </section>
         <section className="users_profile">
             <section className="profile_info">
                <Avatar alt="Selected image"
                        src={userDetails.imageURL}
                        sx={{ width: 200, height: 200 }}
                                />
                 <div className="profile_details">
                     <h3>{userDetails.name}</h3>
                     <h3>{user.email}</h3>
                     <p>{userDetails.city}</p>
                     <p>{userDetails.timeZone}</p>
                     <p>{userDetails.role}</p>
                 </div>
             </section>
             <h2>Your post Details</h2>
             <div className="profile_post user_posts">
             <MaterialTable
                style={{backgroundColor: 'rgb(31, 45, 84)',
                        color: '#FFF',
                        minWidth:'100%',
                        position:'relative'}}
                columns={columns}
                data={posts}
                editable={{
                    onRowDelete:(oldData)=>new Promise((resolve,reject)=>{
                        userActions.removePostByUser(oldData).then(()=>{
                            resolve();
                        }).catch((error)=>{
                            reject()
                        })
                    })
                }}
                options={{ 
                    actionsColumnIndex:-1,
                    headerStyle: {
                        backgroundColor: 'rgb(31, 45, 84)',
                        color: '#FFF',
                        position:'sticky'
                      },
                    pageSizeOptions:[3,5,10]
                }}
                title=''
                />
             </div>
         </section>
     </section>
  </section>)
}

export default Profile