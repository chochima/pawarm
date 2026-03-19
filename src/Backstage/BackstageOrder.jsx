import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router"; 
import * as bootstrap from "bootstrap";
import Pagination from "../components/Pagination";
import OrderModal from "../components/OrderModal";
import toast from 'react-hot-toast';

const { VITE_PATH, VITE_URL } = import.meta.env;

const BackstageOrder = () => {
  // 🚀 初始值務必給予正確型別，防止 length 讀取失敗
  const [orders, setOrders] = useState([]); 
  const [pagination, setPagination] = useState({});
  const [tempOrder, setTempOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const orderModalRef = useRef(null);
  const navigate = useNavigate();

  const toastStyle = {
    background: '#333',
    color: '#fff',
    borderRadius: '8px',
  };

  // 取得訂單列表
  const getOrders = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/orders?page=${page}`);
      // 🚀 加上 || [] 確保資料路徑即便出錯，orders 仍是陣列
      setOrders(res.data?.orders || []);
      setPagination(res.data?.pagination || {});
    } catch (err) {
      toast.error("取得訂單失敗", { style: toastStyle });
      setOrders([]); // 出錯時重置為空陣列，防止畫面崩潰
    } finally {
      setIsLoading(false);
    }
  };

  // 更新訂單資訊
  const updateOrder = async (orderData) => {
    try {
      await axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${orderData.id}`, { data: orderData });
      toast.success("訂單更新成功", { style: toastStyle });
      getOrders(pagination.current_page || 1); 
      orderModalRef.current?.hide();
    } catch (err) {
      toast.error("更新失敗", { style: toastStyle });
    }
  };

  // 刪除訂單
  const deleteOrder = async (id) => {
    if (!window.confirm("確定要刪除這筆訂單嗎？此操作無法復原。")) return;
    try {
      await axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${id}`);
      toast.success("訂單已刪除", { icon: '🗑️', style: toastStyle });
      getOrders(pagination.current_page || 1);
    } catch (err) {
      toast.error("刪除失敗", { style: toastStyle });
    }
  };

  // 修改付款狀態
  const updatePaid = async (order) => {
    const orderData = { ...order, is_paid: !order.is_paid };
    const loadingToast = toast.loading('處理中...', { style: toastStyle });
    try {
      await axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${order.id}`, { data: orderData });
      toast.success(orderData.is_paid ? "已標記為已付款" : "已標記為未付款", {
        id: loadingToast,
        style: toastStyle,
      });
      getOrders(pagination.current_page || 1);
    } catch (err) {
      toast.error("更新狀態失敗", { id: loadingToast, style: toastStyle });
    }
  };

  // 開啟 Modal
  const openOrderModal = (order) => {
    setTempOrder(order);
    const modalEl = document.querySelector("#orderModal");
    if (modalEl) {
      if (!orderModalRef.current) {
        orderModalRef.current = new bootstrap.Modal(modalEl);
      }
      orderModalRef.current.show();
    }
  };

  // 初始化驗證
  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    if (!token) {
      navigate("/login");
      return;
    }
    axios.defaults.headers.common.Authorization = token;

    const checkAdmin = async () => {
      try {
        await axios.post(`${VITE_URL}/v2/api/user/check`);
        getOrders();
      } catch (err) {
        navigate("/login");
      }
    };
    checkAdmin();

    // 清除效應：組件卸載時銷毀 Modal 實例
    return () => {
      if (orderModalRef.current) {
        orderModalRef.current.dispose();
      }
    };
  }, [navigate]);

  return (
    <div className="p-2">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">訂單管理總覽</h3>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => getOrders()}>
          <i className="bi bi-arrow-clockwise me-1"></i> 重新整理
        </button>
      </div>

      <div className="table-responsive bg-white rounded-3 shadow-sm">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th className="ps-4">下單日期</th>
              <th>顧客資訊</th>
              <th>購買品項</th>
              <th className="text-end">應付金額</th>
              <th className="text-center">付款狀態</th>
              <th className="text-center pe-4">管理操作</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="6" className="text-center py-5 text-muted">資料載入中...</td></tr>
            ) : (orders && orders.length > 0) ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="ps-4">
                    <span className="text-muted fs-14">
                      {new Date(order.create_at * 1000).toLocaleDateString()}
                    </span>
                  </td>
                  <td>
                    <div className="fw-bold">{order.user?.name || '未知用戶'}</div>
                    <div className="text-muted fs-12">{order.user?.email || 'N/A'}</div>
                  </td>
                  <td>
                    <ul className="list-unstyled mb-0 fs-14">
                      {/* 🚀 這裡增加安全檢查，防止 products 沒資料噴錯 */}
                      {order.products && Object.values(order.products).map((p) => (
                        <li key={p.id} className="text-truncate" style={{ maxWidth: '200px' }}>
                          {p.product?.title || '未知商品'} <span className="text-primary-500 fw-bold">x {p.qty}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="text-end fw-bold text-dark">
                    ${Math.round(order.total || 0).toLocaleString()}
                  </td>
                  <td className="text-center">
                    <div 
                      className={`badge rounded-pill p-2 ${order.is_paid ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}
                      onClick={() => updatePaid(order)}
                      style={{ cursor: 'pointer', fontSize: '12px' }}
                    >
                      {order.is_paid ? '● 已付款' : '○ 未付款'}
                    </div>
                  </td>
                  <td className="text-center pe-4">
                    <div className="btn-group">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => openOrderModal(order)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteOrder(order.id)}>
                        <i className="bi bi-trash3"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="text-center py-5">目前尚無訂單</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 d-flex justify-content-center">
        {/* 🚀 確保有分頁資料才顯示 */}
        {pagination && <Pagination pagination={pagination} changePage={getOrders} />}
      </div>

      <OrderModal 
        order={tempOrder} 
        onUpdatePaid={updatePaid} 
        onUpdateOrder={updateOrder} 
      />
    </div>
  );
};

export default BackstageOrder;