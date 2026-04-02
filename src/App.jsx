import { useEffect } from "react";
import { useDispatch } from "react-redux"; 
import { Outlet } from "react-router";
import { Toaster } from 'react-hot-toast';
import { createAsyncGetCart } from "./slice/cartSlice";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  const dispatch = useDispatch();

  // 核心邏輯：整個前台應用程式初始化時，只發送這一次請求
  useEffect(() => {
    dispatch(createAsyncGetCart());
  }, [dispatch]);

  return (
    <>
      <Toaster />
      
      <Header />
      
      <main className="min-vh-100">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default App;