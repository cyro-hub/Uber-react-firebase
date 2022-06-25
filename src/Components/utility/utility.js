import * as appActions from '../../redux/actions/app'

export const utils = (e,change,setChange)=>{
    setChange({...change,[e.target.name]:e.target.value})
}

export const handleLocation=async()=>{
    if(navigator.geolocation){
      await navigator.geolocation.getCurrentPosition((position=>{
        fetch(`https://ipinfo.io/?token=fb52c2afdbef7d`)
        .then((res)=>res.json())
        .then(data=>
        {
          let mapLocation = {lat:position.coords.latitude,lon:position.coords.longitude}
          appActions.userCurrentLocation(data,mapLocation);
        })
      }))
    }
}