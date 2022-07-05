import * as appActions from '../redux/actions/app'
import geohash from "ngeohash";
import * as fire from '../firebase'
import {collection, query, where, onSnapshot} from 'firebase/firestore'
import {store} from '../redux/store'
import * as types from '../redux/action type'

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
          // console.log(data)
        })
      }))
    }
}

export const getGeohashRange = (latitude,longitude) => {
  const distance = 10;

  const lat = 0.0144927536231884; // degrees latitude per mile
  const lon = 0.0181818181818182; // degrees longitude per mile

  const lowerLat = latitude - lat * distance;
  const lowerLon = longitude - lon * distance;

  const upperLat = latitude + lat * distance;
  const upperLon = longitude + lon * distance;

  const lower = geohash.encode(lowerLat, lowerLon);
  const upper = geohash.encode(upperLat, upperLon);

  return {
    lower,
    upper
  };
};

export const getPostsAroundYou = (uid)=>{
  if(navigator.geolocation){
    return navigator.geolocation.watchPosition((position)=>{

      const {longitude,latitude} = position.coords;
      const {lower,upper} = getGeohashRange(latitude,longitude)
      const q1 = query(collection(fire.db, "posts"),
                                 where("geohash", ">=", lower),
                                 where("geohash", "<=",upper),
                                 where('status','==',false))

      onSnapshot(q1, (querySnapshot)=>{
        let posts = []
        querySnapshot.forEach((doc) => {
          posts.push({...doc.data(),id:doc.id});
        });
        store.dispatch({type:types.getPosts,payload:posts})
        localStorage.setItem('posts',JSON.stringify(posts))
      })      
    },(error)=>{
      console.log(error.message)
    },{enableHighAccuracy:true})
  }
}

export const getDriversAroundYou=()=>{
  if(navigator.geolocation){
    return navigator.geolocation.watchPosition((position)=>{
      const {longitude,latitude} = position.coords;
      const {lower,upper} = getGeohashRange(latitude,longitude)

      const q2 = query(collection(fire.db, "users"),where('role','==','driver'),where("geohash", ">=", lower),where("geohash", "<=",upper))

      onSnapshot(q2, (querySnapshot)=>{
        let users = []
        querySnapshot.forEach((doc) => {
          users.push({...doc.data(),id:doc.id});
        });
        store.dispatch({type:types.getUsers,payload:users})
        localStorage.setItem('users',JSON.stringify(users))
      })      
    },(error)=>{
      console.log(error.message)
    },{enableHighAccuracy:true})
  }
}

export const getUsersAroundYou=()=>{
  if(navigator.geolocation){
    return navigator.geolocation.watchPosition((position)=>{
      const {longitude,latitude} = position.coords;
      const {lower,upper} = getGeohashRange(latitude,longitude)
    
      const q3 = query(collection(fire.db, "users"),where('role','==','passenger'),where("geohash", ">=", lower),where("geohash", "<=",upper))

      onSnapshot(q3, (querySnapshot)=>{
        let users = []
        querySnapshot.forEach((doc) => {
          users.push({...doc.data(),id:doc.id});
        });
        store.dispatch({type:types.getUsers,payload:users})
        localStorage.setItem('users',JSON.stringify(users))
      })  
    }),(error)=>{
      console.log(error.message)
    },{enableHighAccuracy:true}}
}