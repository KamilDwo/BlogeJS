import React from 'react'
import ReactDOM from 'react-dom'
import StoredApp from './App'
import * as serviceWorker from './serviceWorker'
import store from './store/store'
import { Provider } from 'react-redux'

ReactDOM.render(<Provider store={store}><StoredApp/></Provider>, document.getElementById('root'))
serviceWorker.unregister()
