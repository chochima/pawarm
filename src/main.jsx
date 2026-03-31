import React from 'react'
import ReactDOM from 'react-dom/client'
// 🚩 1. 引入 createHashRouter
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

import routes from './router/index' 
import 'bootstrap-icons/font/bootstrap-icons.css';

// 🚩 2. 使用 createHashRouter 來建立實體
const router = createHashRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)