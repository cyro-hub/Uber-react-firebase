import React, { useState, useEffect } from 'react'
import './chat.scss'
import '../User/user.scss'
import ChatOfUser from './components/Chat'
import { UserNames } from '../User/components/UserUtility'
import * as utils from '../../utility/utility'
import { Link } from 'react-router-dom'
import { AiOutlineAppstoreAdd, AiOutlineHome } from 'react-icons/ai'
import { BsFillChatSquareTextFill } from 'react-icons/bs'
import { MdOutlineLogout } from 'react-icons/md'
import Avatar from '@mui/material/Avatar'
import { useSelector } from 'react-redux'
import * as userActions from '../../redux/actions/user'

function Chat() {
  const [search, setSearch] = useState('')
  const chatName = useSelector((state) => state.user.chatName)
  const users = useSelector((state) => state.user.users)
  const userDetails = useSelector((state) => state.user.userDetails)

  const reLoad = () => {
    if (userDetails?.role === 'passenger') {
      userActions.getUserPosts(userDetails?.uid)
      utils.getDriversAroundYou()
    } else if (userDetails?.role === 'driver') {
      utils.getPostsAroundYou(userDetails.uid)
      utils.getUsersAroundYou()
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      reLoad(userDetails, chatName)
    }, 1000)

    return () => clearInterval(timer)
  })

  useEffect(() => {
    utils.handleLocation()
    reLoad()
  }, [])

  return (
    <section className="user max_width">
      <section className="user_head">
        <Link to="/post">
          <AiOutlineAppstoreAdd size={28} />
        </Link>
        <Link to="/">
          <AiOutlineHome size={28} />
        </Link>
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search"
          autoComplete="off"
        />
        <Link to={`/profile`}>
          <Avatar
            alt="Selected image"
            src={userDetails.imageURL}
            sx={{ width: 30, height: 30 }}
          />
        </Link>
        <Link to="" onClick={() => userActions.signout(userDetails)}>
          <MdOutlineLogout size={28} />
        </Link>
      </section>
      <section className="user_body">
        <section className="user_sidebar scroll">
          {users
            ?.filter((user) =>
              user.name
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase()),
            )
            .map((user, i) => (
              <UserNames user={user} key={i} />
            ))}
        </section>
        <section className="user_chats scroll">
          {chatName ? (
            <ChatOfUser/>
          ) : (
            <BsFillChatSquareTextFill className="chatIcon" size={50} />
          )}
        </section>
      </section>
    </section>
  )
}

export default Chat
