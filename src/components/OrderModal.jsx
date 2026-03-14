const OrderModal = ({ order, onUpdatePaid }) => {
  // 關鍵防呆：如果 order 沒有 id，代表資料還沒準備好，直接回傳 null
  if (!order.id) return null;

  return (
    <div className="modal fade" id="orderModal">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">訂單細節：{order.id}</h5>
          </div>
          <div className="modal-body">
            {/* 加入 ?. 防止 user 為 undefined 時報錯 */}
            <div className="row mb-3">
              <div className="col-6">姓名：{order.user?.name}</div>
              <div className="col-6">電話：{order.user?.tel}</div>
              <div className="col-12">地址：{order.user?.address}</div>
            </div>
            
            <div className="alert alert-secondary">
              <pre>{order.message}</pre>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>商品名稱</th>
                  <th>數量</th>
                  <th>小計</th>
                </tr>
              </thead>
              <tbody>
                {/* 加上 order.products && 確保資料存在才渲染 */}
                {order.products && Object.values(order.products).map((item) => (
                  <tr key={item.id}>
                    <td>{item.product?.title}</td>
                    <td>{item.qty} {item.product?.unit}</td>
                    <td>${item.final_total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button 
              className={`btn ${order.is_paid ? 'btn-success' : 'btn-danger'}`}
              onClick={() => onUpdatePaid(order)}
            >
              目前狀態：{order.is_paid ? '已付款' : '未付款 (點擊變更)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderModal;