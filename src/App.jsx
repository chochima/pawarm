import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { Toaster } from 'react-hot-toast';
import { createAsyncGetCart } from "./slice/cartSlice";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  const dispatch = useDispatch();
  
  const carts = useSelector(state => state.cart.carts);
  
  const cartCount = carts?.reduce((acc, cur) => acc + (cur.qty || 0), 0) || 0;

  useEffect(() => {
    dispatch(createAsyncGetCart());
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <Header cartCount={cartCount} />
      
      <main className="min-vh-100">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default App;