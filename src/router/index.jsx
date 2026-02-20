import App from "../App";
import Home from "../pages/index";
import Products from "../pages/products";
import Carts from "../pages/Cart";
import AnimalTracking from "../pages/animal-tracking ";
import Login from "../pages/Login";
import Backstage from "../Backstage/Backstage";
import BackstageProducts from "../Backstage/BackstageProducts";
import BackstageCoupon from "../Backstage/BackstageCoupon";




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
            },
            {
                path:"animaltracking",
                element:<AnimalTracking/>
            },
            {
                path:"login",
                element:<Login/>
            }
        ]
    },
    {
        path:'backstage',
        element:<Backstage/>,
        children:[
            {
                path:'products',
                element:<BackstageProducts/>
            },
            {
                path:'coupon',
                element:<BackstageCoupon/>
            }
        ]


    }
    
]
 export default routes;