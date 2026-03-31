import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const OrderModal = ({ order, onUpdateOrder }) => {
  const [tempData, setTempData] = useState({});

  // 🚩 修正 1：解決 cascading renders 警告
  // 透過內部 async 函式封裝，告訴 React 這是一個非同步的副作用同步流程
  useEffect(() => {
    const syncData = async () => {
      if (order?.id && order.id !== tempData.id) {
        setTempData({
          ...order,
          user: {
            ...order.user,
            invoice: order.user?.invoice || { type: '', tool: '', email: '' }
          }
        });
      }
    };
    syncData();
  }, [order, tempData.id]);

  // --- 1. 處理一般欄位更新 (例如：訂單備註) ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  // --- 2. 處理顧客資訊與發票層級更新 ---
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    if (['type', 'tool', 'email'].includes(name)) {
      setTempData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          invoice: { ...prev.user.invoice, [name]: value }
        }
      }));
    } else {
      setTempData((prev) => ({
        ...prev,
        user: { ...prev.user, [name]: value }
      }));
    }
  };

  // --- 3. 處理商品數量變動並即時重新計算金額 ---
  const handleQtyChange = (e, productId) => {
    const newQty = Number(e.target.value);
    if (newQty < 1) return;

    const newProducts = { ...tempData.products };
    newProducts[productId] = {
      ...newProducts[productId],
      qty: newQty,
      total: newProducts[productId].product.price * newQty
    };
    
    const newTotal = Object.values(newProducts).reduce((acc, item) => {
      return acc + (item.product.price * item.qty);
    }, 0);

    setTempData((prev) => ({ 
      ...prev, 
      products: newProducts,
      total: newTotal 
    }));
  };

  // 🚩 修正 2：防呆 guard，防止資料尚未同步時讀取 undefined
  if (!tempData.id) return null;

  return (
    <div className="modal fade" id="orderModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-pencil-square me-2"></i>
              編輯訂單：<span className="text-info">{tempData.id}</span>
            </h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body p-4" style={{ backgroundColor: '#fcfcfc' }}>
            <div className="row">
              {/* 左側：顧客與購物資訊 */}
              <div className="col-md-5 border-end">
                <h6 className="fw-bold mb-3 text-primary border-bottom pb-2">
                  <i className="bi bi-person-circle me-2"></i>顧客基本資料
                </h6>
                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <label className="form-label fs-14 text-muted">姓名</label>
                    <input name="name" className="form-control" value={tempData.user?.name || ''} onChange={handleUserChange} />
                  </div>
                  <div className="col-6">
                    <label className="form-label fs-14 text-muted">電話</label>
                    <input name="tel" className="form-control" value={tempData.user?.tel || ''} onChange={handleUserChange} />
                  </div>
                  <div className="col-12">
                    <label className="form-label fs-14 text-muted">Email</label>
                    <input name="email" className="form-control" value={tempData.user?.email || ''} onChange={handleUserChange} />
                  </div>
                  <div className="col-12">
                    <label className="form-label fs-14 text-muted">配送地址</label>
                    <input name="address" className="form-control" value={tempData.user?.address || ''} onChange={handleUserChange} />
                  </div>
                </div>

                <h6 className="fw-bold mb-3 text-primary border-bottom pb-2">
                  <i className="bi bi-receipt me-2"></i>發票與配送
                </h6>
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label fs-14 text-muted">配送方式</label>
                    <input name="delivery" className="form-control" value={tempData.user?.delivery || ''} onChange={handleUserChange} />
                  </div>
                  <div className="col-6">
                    <label className="form-label fs-14 text-muted">載具/統編</label>
                    <input name="tool" className="form-control" value={tempData.user?.invoice?.tool || ''} onChange={handleUserChange} />
                  </div>
                </div>
              </div>

              {/* 右側：商品明細 */}
              <div className="col-md-7 ps-md-4">
                <h6 className="fw-bold mb-3 text-primary border-bottom pb-2">
                  <i className="bi bi-cart3 me-2"></i>商品明細
                </h6>
                <div className="table-responsive border rounded mb-3 bg-white">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>商品</th>
                        <th width="100">數量</th>
                        <th>單價</th>
                        <th className="text-end">小計</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(tempData.products || {}).map(([id, item]) => (
                        <tr key={id}>
                          <td className="fw-bold">{item.product.title}</td>
                          <td>
                            <input 
                              type="number" 
                              className="form-control form-control-sm" 
                              value={item.qty} 
                              min="1" 
                              onChange={(e) => handleQtyChange(e, id)} 
                            />
                          </td>
                          <td className="text-muted">${item.product.price}</td>
                          <td className="text-end fw-bold text-dark">
                            ${(item.total || item.product.price * item.qty).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3 shadow-sm border">
                  <span className="fw-bold text-secondary">應付總額 (自動加總)</span>
                  <span className="text-danger fw-bold fs-3">${(tempData.total || 0).toLocaleString()}</span>
                </div>

                <div className="mt-4">
                  <label className="fw-bold mb-2 fs-14"><i className="bi bi-chat-dots me-2"></i>訂單備註</label>
                  <textarea 
                    name="message" 
                    className="form-control shadow-sm" 
                    rows="3" 
                    value={tempData.message || ''} 
                    onChange={handleInputChange} 
                    placeholder="這裡可以修改訂單備註..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer bg-light border-0">
            <button className="btn btn-outline-secondary px-4" data-bs-dismiss="modal">取消</button>
            <button 
              className="btn btn-primary px-5 fw-bold shadow" 
              onClick={() => onUpdateOrder(tempData)}
            >
              儲存全數變更
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🚩 修正 3：補齊深層 PropTypes 驗證
OrderModal.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string,
    is_paid: PropTypes.bool,
    message: PropTypes.string,
    total: PropTypes.number,
    create_at: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
      tel: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      delivery: PropTypes.string,
      invoice: PropTypes.shape({
        type: PropTypes.string,
        tool: PropTypes.string,
        email: PropTypes.string,
      }),
    }),
    products: PropTypes.object,
  }).isRequired,
  onUpdateOrder: PropTypes.func.isRequired,
};

export default OrderModal;