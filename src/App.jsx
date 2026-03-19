import { useEffect } from "react";
import { useSelector , useDispatch} from "react-redux";
import { NavLink ,Outlet} from "react-router"
import { Toaster } from 'react-hot-toast';
import { createAsyncGetCart } from "./slice/cartSlice";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  
  const carts= useSelector(state=>state.cart.carts)
  const cartCount = carts?.reduce((acc, cur) => acc + (cur.qty || 0), 0) || 0;
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(createAsyncGetCart())
  },[dispatch])
  return (
    <>
    <Toaster />
    <Header/>
      <Outlet/>
    <Footer/>
    </>
  )
    
}

export default App
