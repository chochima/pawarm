import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'



import './style/all.scss'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';

import { RouterProvider ,createHashRouter} from 'react-router';
import routes from './router';


const router=createHashRouter(routes);


createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>
)
