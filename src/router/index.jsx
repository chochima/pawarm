import Home from "../pages/index";
import Products from "../pages/products";
import App from "../App";



const routes =[
    {
        path:'/',
        element:<App/>,
        children:[
            {
              path:'',
              element:<Home/>
            },
            {
                path:'products',
                element:<Products/>
            }
        ]
    },
    
]
 export default routes;