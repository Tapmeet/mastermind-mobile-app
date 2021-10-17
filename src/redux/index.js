import { combineReducers } from 'redux'
import cartItemsReducer from './Retail'
import userDataReducer from './User'
export default combineReducers({ cartItemsReducer, userDataReducer })