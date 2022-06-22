import React from 'react'
import { Link } from 'react-router-dom'
import About from '../utility/About'
import Nav from '../utility/Nav'
import Services from '../utility/Services'
import WhatPeopleSayAboutUs from '../utility/What People Say About Us'
import Footer from '../utility/Footer'
import Contact from '../utility/Contact'

function Home() {
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
      <Link to='/user'>Get Started</Link>
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