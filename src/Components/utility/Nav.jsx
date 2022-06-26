import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import {BiUserCircle} from 'react-icons/bi'

function Nav() {
const [size,setSize]=useState(window.innerWidth);

const sizeChecker =()=>{
    setSize(window.innerWidth);
}

useEffect(()=>{
    window.addEventListener('resize',sizeChecker)
    return ()=>{
        window.removeEventListener('resize',sizeChecker)
    }
})    
  return (
    <nav className='nav max_width'>
        {
        size>500&&<Link to='/'><img src={logo} style={{width:'80px'}} alt="logo"/></Link>
        }
        <div className='nav_links'>
            <div>
                <Link to='/'>Home</Link>
                <Link to='/user'>User</Link>
                {
                    size>400&&
                    <Link to='/docs'>Docs</Link>
                    
                }
                {
                    size<500&&<Link to='/account'>Login</Link>
                    
                }
            </div>
        </div>
        {
        size>500&&
        <Link to='/account'><BiUserCircle size={30}/></Link>
        }
    </nav>
  )
}


export default Nav


