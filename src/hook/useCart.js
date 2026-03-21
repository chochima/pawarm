import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import toast from 'react-hot-toast';
import { createAsyncGetCart } from "../slice/cartSlice";

const { VITE_PATH, VITE_URL } = import.meta.env;

export const useCart = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [cart, setCart] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [randomProducts, setRandomProducts] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('fav')) || []);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const isLogin = !!token;
  const toastConfig = {
  style: {
    background: '#333',
    color: '#fff',
    borderRadius: '10px',
  },
  duration: 2000, // 2秒後自動關閉
};

  const getCart = async () => {
    try {
      const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`);
      setCart(res.data.data);
    } catch (err) { console.error(err.response?.data); }
  };

  const getSixRandomProducts = async () => {
    try {
      const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`);
      const shuffled = [...res.data.products].sort(() => 0.5 - Math.random()).slice(0, 6);
      setRandomProducts(shuffled);
    } catch (err) { console.error(err); }
  };

  const addCart = async (id, qty = 1) => {
    const data = { product_id: id, qty };
    toast.promise(
      axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, { data }),
      {
        loading: '正在加入守護清單...',
        success: () => { dispatch(createAsyncGetCart()); getCart(); return "已成功加入！"; },
        error: "加入失敗",
      },
      { style: { minWidth: '250px' }, success: { icon: '🐾' } }
    );
  };

  const handleAdd = async (id) => {
    setIsAdding(true);
    await addCart(id);
    setIsAdding(false);
  };

  const deleteCart = async (id) => {
    const toastId = toast.loading('處理中...');
    try {
      await axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${id}`);
      dispatch(createAsyncGetCart());
      getCart();
      toast.success('已將商品移除', { id: toastId });
    } catch (err) { toast.error('移除失敗', { id: toastId }); }
  };

  const updateCart = async (cartId, productId, qty = 1) => {
    const data = { product_id: productId, qty };
    toast.promise(
      axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${cartId}`, { data }),
      {
        loading: '正在更新數量...',
        success: () => { dispatch(createAsyncGetCart()); getCart(); return '數量已更新！'; },
        error: '更新失敗',
      },
      { id: `update-${cartId}` }
    );
  };

  const applyCoupon = async (code) => {
    try {
      const res = await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/coupon`, { data: { code } });
      toast.success(res.data.message, toastConfig);
      getCart();
    } catch (err) { alert(err.response?.data?.message || "套用失敗"); }
  };

  const removeCoupon = () => {
    setCart(prev => ({ ...prev, final_total: prev.total }));
    setCouponCode("");
    toast.success("已暫時移除優惠", toastConfig);
  };

  const toggleFavorite = (id) => {
    let updated = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('fav', JSON.stringify(updated));
    toast(favorites.includes(id) ? '已移除' : '已收藏', { icon: favorites.includes(id) ? '🗑️' : '❤️' });
  };

  const handleMoveToWishlist = (item) => {
    const moveAction = async () => {
      const currentFavs = JSON.parse(localStorage.getItem('fav')) || [];
      if (!currentFavs.includes(item.product_id)) {
        localStorage.setItem('fav', JSON.stringify([...currentFavs, item.product_id]));
        window.dispatchEvent(new Event("storage"));
      }
      return axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${item.id}`);
    };
    toast.promise(moveAction(), {
      loading: '搬移中...',
      success: () => { dispatch(createAsyncGetCart()); getCart(); return '已移至收藏！'; },
      error: '失敗',
    });
  };

  useEffect(() => {
    getCart();
    getSixRandomProducts();
  }, []);

  return {
    cart, isAdding, isUpdating, randomProducts, couponCode, setCouponCode, favorites, isLogin,
    toggleFavorite, handleAdd, deleteCart, updateCart, applyCoupon, removeCoupon, handleMoveToWishlist
  };
};