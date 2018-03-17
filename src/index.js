import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'react-router-redux'
import { Router } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { store, persistor, history } from './store'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const target = document.querySelector('#root')

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <App />
        </Router>
      </PersistGate>
    </ConnectedRouter>
  </Provider>,
  target
)
registerServiceWorker()
