import userReducer from './User.reducer'
import pageReducer from './Page.reducer'
import affixReducer from './Affix.reducer'
import {
  combineReducers
} from 'redux'

const rootReducer = combineReducers({
  user: userReducer,
  page: pageReducer,
  affix: affixReducer
})

export default rootReducer