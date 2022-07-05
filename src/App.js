import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ProtectedRoute from './utility/ProtectedRoute'
import Account from './pages/Account/Account';
import Home from './pages/Home/Home';
import User from './pages/User/User';
import Post from './pages/Post/Post'
import Docs from './pages/Docs/Docs';
import Profile from './pages/Profile/Profile';
import Chat from './pages/Chat/Chat'
import { onAuthStateChanged } from "firebase/auth";
import * as fire from './firebase'
import * as utils from './utility/utility'
import * as userActions from './redux/actions/user'
import {collection, query, where, getDocs,doc,updateDoc} from 'firebase/firestore'

function App() {
onAuthStateChanged(fire.auth, (user) => {
  userActions.setUser(user)
  if (user) {
        (async ()=>{
          let references = collection(fire.db,'users')
          let arr = []
          const locations = await getDocs(query(references,where('uid','==',user?.uid)));
        
          locations.forEach((doc) => {
            arr.push({...doc.data(),id:doc.id});
          });
          userActions.setUserDetails(arr[0])
          utils.handleLocation()

          let newUser = {...arr[0],online:true}
          await updateDoc(doc(references,arr[0].id),newUser)
      })()
    }
});

  return (<Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/account' element={<Account/>}/>
      <Route path='/docs' element={<Docs/>}/>
      <Route element={<ProtectedRoute/>}>
        <Route path='/user' element={<User/>}/>
        <Route path='/post' element={<Post/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Route>
    </Routes>
  </Router>);
}

export default App;
