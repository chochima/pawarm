import App from "../App";
import Home from "../pages/index";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Carts from "../pages/Cart";
import AnimalTracking from "../pages/animal-tracking ";
import Login from "../pages/Login";
import Backstage from "../Backstage/Backstage";
import BackstageProducts from "../Backstage/BackstageProducts";
import BackstageCoupon from "../Backstage/BackstageCoupon";
import BackstageOrder from "../Backstage/BackstageOrder";
import Checkout from "../pages/Checkout";
import CheckoutSuccess from "../pages/Success";




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
                path:'product/:id',
                element:<ProductDetail/>
            },
            {
                path:"carts",
                element:<Carts/>
            },
            {
                path:"checkout",
                element:<Checkout/>
            },
            {
                path:"checkout-success/:orderId",
                element:<CheckoutSuccess />
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
            },
            {
                path:'order',
                element:<BackstageOrder/>
            }
        ]


    }
    
]
    export default routes;