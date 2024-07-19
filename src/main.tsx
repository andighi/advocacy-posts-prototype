import React from 'react'
import ReactDOM from 'react-dom/client'
import './libraries/haiilo/registerElements.ts'
import './libraries/haiilo/registerIcons.ts'
import store from './store/store.ts'
import { Provider } from 'react-redux'
import './assets/styles/App.scss'
import {
  RouterProvider,
} from "react-router-dom";
import router from './router/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router()} />
    </Provider>
  </React.StrictMode>,
)
