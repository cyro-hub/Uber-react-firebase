import React from 'react'
import {BsFillBookmarkCheckFill,BsFillEyeFill} from 'react-icons/bs'
import {AiOutlineAppstoreAdd} from 'react-icons/ai'
import {GiWorld} from 'react-icons/gi'
import {MdOutlineSecurity} from 'react-icons/md'
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
        Icon:AiOutlineAppstoreAdd,
        header:'Add Travel Location',
        description:'Adding your present area is not and issue. Use this app an enjoy'
    },{
        Icon:BsFillEyeFill,
        header:'Viewing Others',
        description:'We allow our user to view other drivers or user in the same location'
    },{
        Icon:GiWorld,
        header:'World Wide',
        description:'We handle booking all over the world thank to your support'
    },{
        Icon:MdOutlineSecurity,
        header:'Security',
        description:'Security is the best in this app we use google you trust google you trust us'
    }
]

export default Services