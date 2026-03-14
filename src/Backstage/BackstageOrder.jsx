import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as bootstrap from "bootstrap";
import Pagination from "../components/Pagination";
import OrderModal from "../components/OrderModal";

const{VITE_PATH,VITE_URL}=import.meta.env;




const BackstageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [tempOrder, setTempOrder] = useState({}); 
  const orderModalRef = useRef(null);

  // 取得訂單列表
  const getOrders = async (page = 1) => {
    try {
      const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/orders?page=${page}`);
      setOrders(res.data.orders);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    }
  };
 // 增加處理更新的邏輯
const updateOrder = async (orderData) => {
  try {
    await axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${orderData.id}`, { data: orderData });
    alert("訂單已更新");
    getOrders(); // 成功後刷新列表
    orderModalRef.current.hide(); // 關閉視窗
  } catch (err) {
    alert("更新失敗");
  }
};

// 增加刪除的邏輯
const deleteOrder = async (id) => {
  if (!window.confirm("確定刪除此訂單？")) return;
  try {
    await axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${id}`);
    getOrders();
  } catch (err) {
    alert("刪除失敗");
  }
};

  // 修改付款狀態 (這是訂單管理最常用的功能)
  const updatePaid = async (order) => {
    const orderData = { ...order, is_paid: !order.is_paid };
    try {
      await axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${order.id}`, { data: orderData });
      getOrders(); // 成功後刷新列表
    } catch (err) {
      alert("狀態更新失敗");
    }
  };
  
  
 const openOrderModal = (order) => {
  setTempOrder(order);
  
  setTimeout(() => {
    if (!orderModalRef.current) {
      orderModalRef.current = new bootstrap.Modal(document.querySelector("#orderModal"));
    }
    orderModalRef.current.show();
  }, 0);
};

  useEffect(() => {
    getOrders();
    const modalEl = document.querySelector("#orderModal");
  if (modalEl) {
    orderModalRef.current = new bootstrap.Modal(modalEl);
  }
  }, []);
  useEffect(() => {
    // 1. 從 cookie 取得 token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // 2. 設定 axios 預設標頭
    axios.defaults.headers.common.Authorization = token;

    // 3. 檢查身分是否正確
    const checkAdmin = async () => {
      try {
        await axios.post(`${VITE_URL}/v2/api/user/check`);
        getOrders();
      } catch (err) {
        console.error("驗證失敗，請重新登入");
        navigate("/login"); 
      }
    };

    checkAdmin();
  
  }, []);
  return (
    <div className="container mt-4">
      <h2>訂單管理</h2>
      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th>訂單時間</th>
            <th>顧客 Email</th>
            <th>購買商品</th>
            <th>應付金額</th>
            <th>狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{new Date(order.create_at * 1000).toLocaleDateString()}</td>
              <td>{order.user?.email}</td>
              <td>
                {Object.values(order.products).map((p) => (
                  <div key={p.id}>{p.product.title} x {p.qty}</div>
                ))}
              </td>
              <td>${Math.round(order.total)}</td>
              <td>
                <button 
                  className={`btn btn-sm ${order.is_paid ? 'btn-success' : 'btn-outline-danger'}`}
                  onClick={() => updatePaid(order)}
                >
                  {order.is_paid ? '已付款' : '未付款'}
                </button>
              </td>
              <td>
               <div className="btn-group btn-group-sm">
                  <button className="btn btn-outline-primary" onClick={() => openOrderModal(order)}>檢視/編輯</button>
                  <button className="btn btn-outline-danger" onClick={() => deleteOrder(order.id)}>刪除</button>
               </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pagination={pagination} changePage={getOrders} />

      <OrderModal 
  order={tempOrder} 
  onUpdatePaid={updatePaid} 
  onUpdateOrder={updateOrder} 
/>
    </div>
  );
};
export default BackstageOrder;