import { createStore } from 'redux'
import userDataReducer from './User'

const store = createStore(userDataReducer)

export default store