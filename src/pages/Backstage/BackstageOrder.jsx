import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as bootstrap from "bootstrap";
import Pagination from "../../components/Pagination";
import OrderModal from "../../components/OrderModal";
import toast from 'react-hot-toast';

const { VITE_PATH, VITE_URL } = import.meta.env;

const BackstageOrder = () => {
  const [orders, setOrders] = useState([]); 
  const [pagination, setPagination] = useState({});
  const [tempOrder, setTempOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const orderModalRef = useRef(null);

  // 🚩 1. 取得訂單列表 (驗證已由父層 Backstage.jsx 處理)
  const getOrders = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/orders?page=${page}`);
      setOrders(res.data?.orders || []);
      setPagination(res.data?.pagination || {});
    } catch (err) {
      // 🚩 修正：使用 err.response
      const msg = err.response?.data?.message || "取得訂單失敗";
      toast.error(msg);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 更新訂單詳細資訊
  const updateOrder = async (orderData) => {
    try {
      await axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${orderData.id}`, { data: orderData });
      toast.success("訂單更新成功");
      getOrders(pagination.current_page || 1); 
      orderModalRef.current?.hide();
    } catch (err) {
      const msg = err.response?.data?.message || "更新失敗";
      toast.error(msg);
    }
  };

  // 刪除訂單
  const deleteOrder = async (id) => {
    if (!window.confirm("確定要刪除這筆訂單嗎？")) return;
    try {
      await axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${id}`);
      toast.success("訂單已刪除", { icon: '🗑️' });
      getOrders(pagination.current_page || 1);
    } catch (err) {
      const msg = err.response?.data?.message || "刪除失敗";
      toast.error(msg);
    }
  };

  // 🚩 切換付款狀態
  const updatePaid = async (order) => {
    const orderData = { ...order, is_paid: !order.is_paid };
    const loadingToast = toast.loading('處理中...');
    try {
      await axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${order.id}`, { data: orderData });
      toast.success(orderData.is_paid ? "已標記為已付款" : "已標記為未付款", { id: loadingToast });
      getOrders(pagination.current_page || 1);
    } catch (err) {
      const msg = err.response?.data?.message || "更新狀態失敗";
      toast.error(msg, { id: loadingToast });
    }
  };

  const openOrderModal = (order) => {
    setTempOrder(order);
    orderModalRef.current?.show();
  };

  // 🚩 2. 簡化後的 useEffect
  useEffect(() => {
    // 初始化 Modal
    const modalEl = document.querySelector("#orderModal");
    if (modalEl) {
      orderModalRef.current = new bootstrap.Modal(modalEl, { keyboard: false });
    }

    // 直接抓取資料
    getOrders();

    return () => {
      if (orderModalRef.current) orderModalRef.current.dispose();
    };
  }, []); // 🚩 不再需要依賴 navigate

  return (
    <div className="w-100 overflow-hidden">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0 fs-24">訂單管理</h3>
        <button className="btn btn-outline-secondary btn-sm rounded-pill px-3" onClick={() => getOrders()}>
          <i className="bi bi-arrow-clockwise me-1"></i> 刷新資料
        </button>
      </div>

      <div className="table-responsive bg-white rounded-4 shadow-sm border">
        <table className="table table-hover align-middle mb-0 text-nowrap">
          <thead className="table-light">
            <tr>
              <th className="ps-4 py-3 border-0 d-none d-md-table-cell">下單日期</th>
              <th className="border-0 ps-4 ps-md-2">顧客資訊 / 日期</th>
              <th className="border-0">購買品項</th>
              <th className="text-end border-0">應付金額</th>
              <th className="text-center border-0 d-none d-sm-table-cell">付款狀態</th>
              <th className="text-center pe-4 border-0">操作</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="6" className="text-center py-5 text-muted">資料載入中...</td></tr>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="ps-4 d-none d-md-table-cell">
                    <span className="text-secondary fs-14">
                      {new Date(order.create_at * 1000).toLocaleDateString()}
                    </span>
                  </td>

                  <td className="ps-4 ps-md-2">
                    <div className="d-md-none text-primary fw-600 fs-12 mb-1">
                      <i className="bi bi-calendar3 me-1"></i>
                      {new Date(order.create_at * 1000).toLocaleDateString()}
                    </div>
                    <div className="fw-bold text-dark">{order.user?.name || '未知用戶'}</div>
                    <div className="text-muted fs-12">{order.user?.email}</div>
                  </td>

                  <td>
                    <div className="fs-13" style={{ maxWidth: '200px', whiteSpace: 'normal' }}>
                      {order.products && Object.values(order.products).map((p) => (
                        <div key={p.id} className="mb-1 text-truncate">
                          <span className="badge bg-light text-dark fw-normal border me-1">{p.product?.title}</span>
                          <span className="text-primary-600 fw-bold">x{p.qty}</span>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="text-end fw-bold text-dark fs-15">
                    ${Math.round(order.total || 0).toLocaleString()}
                    <div className="d-sm-none mt-1">
                      <span className={`badge rounded-pill ${order.is_paid ? 'text-success p-0' : 'text-danger p-0'}`} style={{fontSize: '10px'}}>
                        {order.is_paid ? '● 已付' : '○ 未付'}
                      </span>
                    </div>
                  </td>

                  <td className="text-center d-none d-sm-table-cell">
                    <span 
                      className={`badge rounded-pill px-3 py-2 cursor-pointer transition-all ${order.is_paid ? 'bg-success-subtle text-success border border-success' : 'bg-danger-subtle text-danger border border-danger'}`}
                      onClick={() => updatePaid(order)}
                    >
                      {order.is_paid ? '已付款' : '未付款'}
                    </span>
                  </td>

                  <td className="text-center pe-4">
                    <div className="btn-group shadow-sm rounded-2 overflow-hidden">
                      <button className="btn btn-sm btn-white border" onClick={() => openOrderModal(order)}>
                        <i className="bi bi-search text-primary"></i>
                      </button>
                      <button className="btn btn-sm btn-white border text-danger" onClick={() => deleteOrder(order.id)}>
                        <i className="bi bi-trash3"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="text-center py-5">目前尚無訂單資料</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 d-flex justify-content-center">
        {pagination && <Pagination pagination={pagination} changePage={getOrders} />}
      </div>

      <OrderModal order={tempOrder} onUpdatePaid={updatePaid} onUpdateOrder={updateOrder} />

      <style>{`
        .cursor-pointer { cursor: pointer; }
        .bg-success-subtle { background-color: #e6fcf5 !important; }
        .bg-danger-subtle { background-color: #fff5f5 !important; }
        .fs-13 { font-size: 13px; }
        .btn-white { background: #fff; border-color: #dee2e6 !important; }
        .btn-white:hover { background: #f8f9fa; }
        .text-primary-600 { color: #2D5A27; }
      `}</style>
    </div>
  );
};

export default BackstageOrder;