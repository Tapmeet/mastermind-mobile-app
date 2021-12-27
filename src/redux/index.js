import { combineReducers } from 'redux'
import cartItemsReducer from './Retail'
import eventReducer from './Event'
import userDataReducer from './User'
export default combineReducers({ cartItemsReducer, userDataReducer, eventReducer })