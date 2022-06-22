import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Account from './pages/Account';
import Home from './pages/Home';
import User from './pages/User';

function App() {
  return (<Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/account' element={<Account/>}/>
      <Route path='/user' element={<User/>}/>
    </Routes>
  </Router>);
}

export default App;
