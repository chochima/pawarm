import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
//import App from './App.jsx'
import App from './pages/index.jsx'
import './style/all.scss'
import 'bootstrap'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
