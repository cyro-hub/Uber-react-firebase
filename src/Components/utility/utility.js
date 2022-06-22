export const utils = (e,change,setChange)=>{
    console.log(change)
    setChange({...change,[e.target.name]:e.target.value})
}

export const submit=async(data)=>{
    
}

