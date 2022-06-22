import React from 'react'
import {useSelector} from 'react-redux';
import Login from '../utility/Login';
import Register from '../utility/Register'

function Account() {
const signUpSwitcher = useSelector(state=>state.app.signUpSwitcher)
  return (<>
  {
    signUpSwitcher?<Login/>:<Register/>
  }
  </>)
}

export default Account