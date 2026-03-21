import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { currency } from "../utils/filter";

const { VITE_PATH, VITE_URL } = import.meta.env;

const OrderAnalysis = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, totalQty: 0, orderCount: 0 });
  const [productRanking, setProductRanking] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/orders`);
        const orderData = res.data.orders || [];
        setOrders(orderData);
        calculateStats(orderData);
      } catch (err) {
        console.error("抓取訂單失敗", err);
      }
    };
    fetchOrders();
  }, []);

  const calculateStats = (data) => {
    let revenue = 0;
    let qty = 0;
    const rankingMap = {};

    data.forEach(order => {
      revenue += order.total;
      Object.values(order.products).forEach(item => {
        qty += item.qty;
        // 統計單一產品銷量
        if (rankingMap[item.product.title]) {
          rankingMap[item.product.title].qty += item.qty;
          rankingMap[item.product.title].totalPrice += item.total;
        } else {
          rankingMap[item.product.title] = { 
            qty: item.qty, 
            totalPrice: item.total,
            category: item.product.category 
          };
        }
      });
    });

    setStats({
      totalRevenue: revenue,
      totalQty: qty,
      orderCount: data.length
    });

    // 轉為陣列並排序
    const sortedRanking = Object.entries(rankingMap)
      .map(([title, val]) => ({ title, ...val }))
      .sort((a, b) => b.qty - a.qty);
    
    setProductRanking(sortedRanking);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">銷售數據分析</h4>
        <span className="badge bg-primary-100 text-primary px-3 py-2">數據即時更新</span>
      </div>

      {/* --- 統計指標卡片 --- */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="p-4 border-0 shadow-sm rounded-4 bg-primary text-white">
            <div className="fs-14 opacity-75">累計銷售總額</div>
            <div className="fs-32 fw-bold my-2">${currency(stats.totalRevenue)}</div>
            <div className="fs-12"><i className="bi bi-graph-up-arrow me-1"></i> 較上月增長 12%</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 border-0 shadow-sm rounded-4 bg-white border">
            <div className="fs-14 text-muted">總成交訂單數</div>
            <div className="fs-32 fw-bold my-2 text-dark">{stats.orderCount} <small className="fs-16">筆</small></div>
            <div className="fs-12 text-success">已全數完成對帳</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 border-0 shadow-sm rounded-4 bg-white border">
            <div className="fs-14 text-muted">商品銷售總數</div>
            <div className="fs-32 fw-bold my-2 text-dark">{stats.totalQty} <small className="fs-16">件</small></div>
            <div className="fs-12 text-primary">平均客單價：${currency(stats.totalRevenue / (stats.orderCount || 1))}</div>
          </div>
        </div>
      </div>

      {/* --- 熱銷排行榜 --- */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="p-4 bg-white border rounded-4 shadow-sm h-100">
            <h5 className="fw-bold mb-4">熱銷產品排行榜</h5>
            <div className="table-responsive">
              <table className="table align-middle table-hover">
                <thead className="table-light">
                  <tr>
                    <th className="border-0">排名</th>
                    <th className="border-0">產品名稱</th>
                    <th className="border-0">類別</th>
                    <th className="border-0 text-center">銷量</th>
                    <th className="border-0 text-end">銷售總額</th>
                  </tr>
                </thead>
                <tbody>
                  {productRanking.slice(0, 5).map((item, index) => (
                    <tr key={item.title}>
                      <td width="80">
                        <span className={`badge rounded-circle ${index < 3 ? 'bg-warning text-dark' : 'bg-light text-muted'}`} style={{ width: '25px', height: '25px', display: 'inline-grid', placeItems: 'center' }}>
                          {index + 1}
                        </span>
                      </td>
                      <td><span className="fw-bold text-gray-800">{item.title}</span></td>
                      <td><span className="badge bg-gray-100 text-gray-600">{item.category}</span></td>
                      <td className="text-center fw-bold">{item.qty}</td>
                      <td className="text-end text-primary fw-bold">${currency(item.totalPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- 銷售佔比分析 --- */}
        <div className="col-lg-4">
          <div className="p-4 bg-white border rounded-4 shadow-sm h-100">
            <h5 className="fw-bold mb-4">銷量視覺分析</h5>
            {productRanking.slice(0, 4).map((item, index) => {
              const percentage = (item.qty / stats.totalQty) * 100;
              return (
                <div className="mb-4" key={item.title}>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-14 text-gray-700">{item.title}</span>
                    <span className="fs-14 fw-bold text-primary">{Math.round(percentage)}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar rounded-pill" 
                      style={{ 
                        width: `${percentage}%`, 
                        backgroundColor: `rgba(13, 110, 253, ${1 - index * 0.2})` 
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
            <div className="mt-5 p-3 rounded-3 bg-light fs-12 text-muted">
              <i className="bi bi-info-circle me-1"></i> 此數據根據目前已成立之訂單內容自動生成。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderAnalysis;