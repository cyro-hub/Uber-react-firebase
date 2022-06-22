import { createStore,combineReducers } from "redux"
import app from '../redux/reducer/app'
import user from '../redux/reducer/user'



const reducer = combineReducers({
app:app,
user:user,
})

export const store = createStore(reducer)