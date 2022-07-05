import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import About from './components/About'
import Nav from './components/Nav'
import Services from './components/Services'
import WhatPeopleSayAboutUs from './components/What People Say About Us'
import Footer from './components/Footer'
import Contact, { DisplayContact } from './components/Contact'
import * as appActions from '../../redux/actions/app'
// import { useSelector } from 'react-redux'

function Home() {
// const contacts = useSelector(state=>state.app.contacts)
useEffect(()=>{
  appActions.getContacts()
},[])

  return (<>
  <section className='welcome'>
  </section>
  <section className='welcome_cover'>
    <Nav/>
    <div className='welcome_details'>
      <h1>Your Imagination Is<br/> Your Only Limit</h1>
      <p>
        We always try to make our users Happy. We provide all kind of facilities.<br/>
        Your Satisfaction is our main priority
      </p>
      <Link to='/user' className='navigate_to_user'>Get Started</Link>
    </div>
  </section>
  <About/>
  <Services/>
  <WhatPeopleSayAboutUs/>
  <Contact/>
  <Footer/>
  </>)
}

export default Home