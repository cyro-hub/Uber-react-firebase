import React from 'react'
import owner from '../../images/owner.png'
import './css/about.scss'

function About() {
  return (<section className="about max_width">
  <h1>About</h1>
  <div>
  <img src={owner} alt="owner"/>
  <p className='section-para'>
    <span>I'm Bongbuin Cyril Mentan a developer </span>
    We are a young an vibrant community spreading love while feeding the community with the best recipes in the country, We have being doing this for over 3 years and still growing and our customers like our services we welcome you to this site
  </p>
  </div>
</section>)
}

export default About