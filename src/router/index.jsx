import App from "../App";
import Home from "../pages/index";
import Products from "../pages/products";
import Carts from "../pages/Cart";




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
            },
            {
                path:"carts",
                element:<Carts/>
            }
        ]
    },
    
]
 export default routes;