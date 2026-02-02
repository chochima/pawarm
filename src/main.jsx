import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'



import './style/all.scss'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';


import Label from './components/Label';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Label/>
  </StrictMode>,
)
