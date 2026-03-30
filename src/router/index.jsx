

import App from "../App";
import Backstage from "../pages/Backstage/Backstage";
import BackstageCoupon from "../pages/Backstage/BackstageCoupon";
import BackstageOrder from "../pages/Backstage/BackstageOrder";
import BackstageProducts from "../pages/Backstage/BackstageProducts";
import OrderAnalysis from "../pages/Backstage/OrderAnalysis";
import About from "../pages/About";
import AnimalTracking from "../pages/animal-tracking"; 
import Carts from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Events from "../pages/Events";
import Home from "../pages/index";
import Login from "../pages/Login";
import MemberCenter from "../pages/MemberCenter";
import Milestone from "../pages/Milestone";
import ProductDetail from "../pages/ProductDetail";
import Products from "../pages/Products";
import CheckoutSuccess from "../pages/Success";
import NotFound from "../pages/NotFound ";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "milestone",
        element: <Milestone />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "product/:id",
        element: <ProductDetail />
      },
      {
        path: "carts",
        element: <Carts />
      },
      {
        path: "checkout",
        element: <Checkout />
      },
      {
        path: "checkout-success/:orderId",
        element: <CheckoutSuccess />
      },
      {
        path: "animaltracking",
        element: <AnimalTracking />
      },
      {
        path: "membercenter",
        element: <MemberCenter />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "events",
        element: <Events />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  },
  {
    path: "backstage",
    element: <Backstage />,
    children: [
      {
        path: "products",
        element: <BackstageProducts />
      },
      {
        path: "coupon",
        element: <BackstageCoupon />
      },
      {
        path: "order",
        element: <BackstageOrder />
      },
      {
        path: "analysis",
        element: <OrderAnalysis />
      }
    ]
  },
  {
  path: "*",
  element: <NotFound />,
  }
];

export default routes;