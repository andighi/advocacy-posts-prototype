import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './libraries/haiilo/registerElements.ts'
import './libraries/haiilo/registerIcons.ts'
import store from './store/store.ts'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
