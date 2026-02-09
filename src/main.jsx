import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'



import './style/all.scss'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProductCard from './components/Card';
import AppTest from './pages/index';
import ImgUpload from './components/ImgUpload';
import Longin from './pages/Longin';
import ImgLibrary from './components/ImgLibrary';





createRoot(document.getElementById('root')).render(
  <StrictMode>
    {
    //正確註釋的寫法 <ProductCard/>
    //
  }
    
    <AppTest/>
    <ImgUpload/>
    <ImgLibrary/>
    
  </StrictMode>,
)
