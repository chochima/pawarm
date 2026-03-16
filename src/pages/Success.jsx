import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";

const { VITE_URL, VITE_PATH } = import.meta.env;

const CheckoutSuccess = () => {
  const { orderId } = useParams(); // 從 URL 取得訂單 ID
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/order/${orderId}`);
        if (res.data.success) {
          setOrder(res.data.order);
        }
      } catch (error) {
        console.error("取得訂單失敗", error);
      } finally {
        setIsLoading(false);
      }
    };
    getOrder();
  }, [orderId]);

  if (isLoading) return <div className="container py-60 text-center">載入訂單資料中...</div>;
  if (!order) return <div className="container py-60 text-center">找不到此訂單。</div>;

  return (
    <div className="container py-60">
      <div className="text-center mb-5">
        <div className="text-success fs-1 mb-2">
          <i className="bi bi-check-circle-fill"></i>
        </div>
        <h2 className="fw-bold">感謝您的愛心守護！</h2>
        <p className="text-muted">訂單編號：{orderId}</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5 className="mb-4 fw-bold border-bottom pb-2">訂單明細</h5>
            
            {/* 商品列表 */}
            <ul className="list-unstyled">
              {Object.values(order.products).map((item) => (
                <li key={item.id} className="d-flex justify-content-between mb-3">
                  <span>{item.product.title} x {item.qty}</span>
                  <span className="fw-bold">${item.total.toLocaleString()}</span>
                </li>
              ))}
            </ul>
            
            <hr />
            
            <div className="d-flex justify-content-between fs-5 fw-bold text-primary-600">
              <span>總金額</span>
              <span>${order.total.toLocaleString()}</span>
            </div>

            <h5 className="mt-5 mb-4 fw-bold border-bottom pb-2">收件資訊</h5>
            <div className="row g-3">
              <div className="col-6 text-muted">收件人：</div>
              <div className="col-6 text-end">{order.user.name}</div>
              <div className="col-6 text-muted">聯絡電話：</div>
              <div className="col-6 text-end">{order.user.tel}</div>
              <div className="col-6 text-muted">配送方式：</div>
              <div className="col-6 text-end">{order.user.delivery}</div>
              <div className="col-6 text-muted">付款狀態：</div>
              <div className="col-6 text-end">
                {order.is_paid ? <span className="text-success">已付款</span> : <span className="text-danger">尚未付款</span>}
              </div>
            </div>

            <div className="text-center mt-5">
              <Link to="/products" className="btn btn-primary-500 px-5 py-2 fw-bold text-white border-0">
                繼續逛逛
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;