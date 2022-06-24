import React from 'react'
import {useSelector} from 'react-redux';
import Login from '../utility/Login';
import Register from '../utility/Register'
import ClipLoader from "react-spinners/ClipLoader";

function Account() {
const signUpSwitcher = useSelector(state=>state.app.signUpSwitcher)
const isPosting = useSelector(state=>state.app.isPosting)
  return (<>
  {
    isPosting?<div className='is_posting'>
      <ClipLoader color={`white`} 
                  loading={true} 
                  size={150} />
              </div>:signUpSwitcher?<Login/>:<Register/>
  }
  </>)
}

export default Account