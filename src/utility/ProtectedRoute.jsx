import { useSelector } from 'react-redux';
import {Outlet,Navigate} from 'react-router-dom';

function ProtectedRoute() {
const user = useSelector(state=>state.user.user)
  return<>{user?<Outlet/>:<Navigate to='/account' replace={true} />}</>
}

export default ProtectedRoute