import React from 'react'
import {BsFillBookmarkCheckFill} from 'react-icons/bs'
import './css/services.scss'

function Services() {

  return (<section id="services" className='max_width'>
      <h1>Services</h1>
      <article>
      {
          services.map((service,i)=><Card key={i} service={service}/>)
      }
      </article>
  </section>)
}

export const Card = ({service})=>{
const {Icon,header,description}=service;
    return(<div>
        <Icon size={30}/>
        <h2>{header}</h2>
        <p>{description}</p>
    </div>)
}

export const services=[
    {
        Icon:BsFillBookmarkCheckFill,
        header:'Booking',
        description:'We handle booking of travel trip and allow drivers to know your pickup position'
    },{
        Icon:BsFillBookmarkCheckFill,
        header:'Booking',
        description:'We handle booking of travel trip and allow drivers to know your pickup position'
    },{
        Icon:BsFillBookmarkCheckFill,
        header:'Booking',
        description:'We handle booking of travel trip and allow drivers to know your pickup position'
    },{
        Icon:BsFillBookmarkCheckFill,
        header:'Booking',
        description:'We handle booking of travel trip and allow drivers to know your pickup position'
    }
]

export default Services