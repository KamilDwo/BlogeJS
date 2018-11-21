import userReducer from './User.reducer'
import pageReducer from './Page.reducer'
import {
  combineReducers
} from 'redux'

const rootReducer = combineReducers({
  user: userReducer,
  page: pageReducer
})

export default rootReducer