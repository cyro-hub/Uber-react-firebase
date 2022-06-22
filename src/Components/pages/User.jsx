import React, { useState } from 'react'
import * as appActions from '../../redux/actions/app'
import Nav from '../utility/Nav'
import '../utility/css/user.scss'
import {Post,PostUser,UserNames} from '../utility/UserUtility';
import {posts,users} from '../data';
import Modal from '@mui/material/Modal';
import ModalDiv from '../utility/Post';
import { useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";

function User() {
const [search,setSearch]=useState('')
const open = useSelector(state=>state.app.isPostModal)
const isPosting = useSelector(state=>state.app.isPosting)

  return (<section className='user scroll max_width'>
      <Nav/>  
      <section>
          <article className='user_list scroll'>
            <p>Drivers 1 mile away</p>
            <div className='post scroll'>
                {
                    users.map((user,i)=><UserNames user={user} key={i}/>)
                }
            </div>
          </article>
          <article className='user_posts scroll'>
              <div className='head'>
                 <button onClick={appActions.isPostModal} className='submit'>Add post</button>
                  <input type="seaarch"
                         name='search'
                         value={search}
                         onChange={(e)=>setSearch(e.target.value)}
                         placeholder='Search' />          
                 <button className='cancel'>Logout</button> 
              </div>
              <div className="post scroll">
                  {
                      posts.map((post,i)=><PostUser post={post} key={i}/>)
                  }
              </div>
          </article>
          <article className='user_list scroll'>
             <p>Passengers 1 mile away</p>
             <div className="post scroll">
                 {
                     users.map((user,i)=><UserNames user={user} key={i}/>)
                 }
             </div>
          </article>
          {/* post modal for making post  */}
          <Modal
            open={open}
            onClose={()=>appActions.isPostModal()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div className='modal'>
                {
                    isPosting?<ClipLoader color={`rgb(31, 45, 84)`} loading={true} size={150} />:<ModalDiv/>
                }
            </div>
          </Modal>
      </section>
  </section>)
}

export default User