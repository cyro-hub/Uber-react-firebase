import React from 'react'
import './css/footer.scss'
import {AiFillLinkedin,AiFillFacebook,AiOutlineGithub} from 'react-icons/ai'

function Footer() {
  return (<section className='footer max-width'>
    <a href="https://www.linkedin.com/in/bongbuin-cyril-7039b7231/" target='blank'><AiFillLinkedin size={30}/></a>
    <a href="https://www.facebook.com/cyril.mentan" target='blank'><AiFillFacebook size={30}/></a>
    <a href="https://github.com/cyro-hub/Uber-react-firebase" target='blank'><AiOutlineGithub size={30}/></a>
  </section>)
}

export default Footer