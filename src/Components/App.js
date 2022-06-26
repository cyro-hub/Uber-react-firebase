import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ProtectedRoute from '../Components/utility/ProtectedRoute'
import Account from './pages/Account';
import Home from './pages/Home';
import User from './pages/User';
import Post from './utility/Post'
import Comment from './utility/Comment'
import Docs from './pages/Docs';

function App() {
  return (<Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/account' element={<Account/>}/>
      <Route path='/docs' element={<Docs/>}/>
      <Route element={<ProtectedRoute/>}>
        <Route path='/user' element={<User/>}/>
        <Route path='/post' element={<Post/>}/>
      </Route>
      <Route path='/com' element={<Comment/>}/>
    </Routes>
  </Router>);
}

export default App;
