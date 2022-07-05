import React,{useState} from 'react'
import * as fire from '../../../firebase'
import {utils} from '../../../utility/utility'
import '../css/comment.scss'
import {IoMdSend} from 'react-icons/io'
import {AiOutlineFullscreenExit} from 'react-icons/ai'
import { useSelector } from 'react-redux'
import * as userActions from '../../../redux/actions/user'
import ClipLoader from "react-spinners/ClipLoader";

function Comment({post}) {
const [posting,setPosting] = useState(false)
const area = useSelector(state=>state.app.area)
///destructure post to a comment
const [commentData,setCommentData]=useState({
    name:'',
    comment:''
})

const handleSubmit=(e)=>{
e.preventDefault()
setCommentData({...commentData,name:fire.auth.currentUser.displayName,
                               city:area.city})

    for(const key in commentData){
        if(commentData[key]===''){
        return
        } 
    }
    const newComment = [...post.comment,commentData]
    setPosting(true)
    userActions.postComment(post,newComment).then(()=>{
        setPosting(false)
        setCommentData({...commentData,comment:''})
    })
}

  return (
    <div className='comment'>
        <form>
            <AiOutlineFullscreenExit size={20}
                                     onClick={userActions.isShowComment}/>
            <input type="text" 
                   name='comment'
                   value={commentData.comment}
                   onChange={(e)=>utils(e,commentData,setCommentData)}
                   placeholder='comment'
                   autoComplete='off'
                   onKeyDown={(e)=>{
                       if(e.keyCode===13){
                           handleSubmit(e)
                       }
                   }}
                    />
            {posting?<ClipLoader color={`rgb(31, 45, 84)`} 
                                 loading={true} 
                                 size={15}/>:
                                 <IoMdSend size={20}
                                           onClick={handleSubmit}/>}
        </form>
        <div className="display scroll">
            {
                post.comment?.map((com,i)=><div key={i} className='comment_display'>
                                        <h3>{com.name}</h3>
                                        <p>{com.comment}</p>
                                    </div>)
            }
        </div>
    </div>
  )
}

export default Comment