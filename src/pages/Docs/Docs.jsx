import { Link } from '@mui/material'
import React from 'react'
import './docs.scss'
import Nav from '../Home/components/Nav'

function Docs() {
  return (<>
  <Nav/>
  <div className='docs max_width'>
      <h1>Content</h1>
      <ul>
          <Link to='' onClick={() => window.location.assign("#about-home")}>Home page</Link>
          <Link to='' onClick={() => window.location.replace("#about-user")}>User page</Link>
          <Link to='' onClick={() => window.location.replace("#about-login")}>Login page</Link>
          <Link to='' onClick={() => window.location.replace("#about-post")}>Post page</Link>
          <Link to='' onClick={() => window.location.replace("#about-docs")}>Docs page</Link>
      </ul>
      <h1>Overview</h1>
      <p>This Application was built to ease travelling and even booking of travel trip around the country. This applies to registered drivers and the users in the app</p>
      <h2>Get Started</h2>
      <div id='about-home'>
        <h3>Home Page</h3>
        <p>The home page contains navigation bar, an inspirational qoute, an action button, about ,services, some questions from user, comment form and some useful linkd </p>
        <p>The navigation bar contains a logo whic when click takes you back to the home page. It also have a home button that does thesame thing as logo. We have the user button which take you to the user page, Docs button which takes you to the documentation of the site and lastly we have the user logo which takes you to the login page where you can create your account</p>
        <p>Next we have the inspirational qoute for our users to be inspired and then we have an action button which take you to the user page</p>
        <p>The about section talks about the owner of the web application and his image for those who don't know him</p>
        <p>The services section has all the things the things the application can do</p>
        <p>You can add a comment to the comment section for others to see. This applies to your experience using the applicaton</p>
        <p>Some useful links are available at the bottom of the page. This include links like my social media page and github link to this project</p>
      </div>
      <div id="about-user">
          <h3>User Page</h3>
          <p>This page contains a navigation bar, a drivers around you bar and post area.</p>
          <p>The navigation contains an add post icons, a refresh icon to refresh for new post,search bar to search post, a home icon to havigate bank home and a logout icon to to logout from the website</p>
          <p>The drivers around you bar let's you see driver at your surrounding</p>
          <p>The post area let's you see posts from others if you are a driver and your post if you are a normal user</p>
      </div>
      <div id="about-login">
          <h3>Login Page</h3>
          <p>The login page has thesame navigation like the home page and form. The form has input where the user fill in to get into the application. At the bottom of the page, you have the a botton and a text. the botton is to submit the form and the text is to change back and fort from the login and register page base on you having an account or not or you just which to create another account</p>
      </div>
      <div id="about-post">
          <h3>Post Page</h3>
          <p>The post page cpntains just a single form to make a post. Note that all input must be filled before submission otherwise you will have a warning message at the top of the form</p>
          <p>At the bottom of the page you have a refresh icon and a post button. The post button let's you create the post while the refresh button only helps you get you current position to the app</p>
      </div>
  </div></>)
}

export default Docs