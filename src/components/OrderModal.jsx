import { useState, useEffect } from "react";

const OrderModal = ({ order, onUpdateOrder }) => {
  const [tempData, setTempData] = useState({});

  useEffect(() => {
    // 確保初始化時包含巢狀結構，避免 undefined 錯誤
    setTempData({
      ...order,
      user: {
        ...order.user,
        invoice: order.user?.invoice || { type: '', tool: '', email: '' }
      }
    });
  }, [order]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    
    // 如果是 invoice 相關欄位
    if (['type', 'tool', 'email'].includes(name)) {
      setTempData({
        ...tempData,
        user: {
          ...tempData.user,
          invoice: { ...tempData.user.invoice, [name]: value }
        }
      });
    } else {
      // 一般 user 欄位 (name, tel, address, delivery, payment)
      setTempData({
        ...tempData,
        user: { ...tempData.user, [name]: value }
      });
    }
  };

  const handleQtyChange = (e, productId) => {
    const newProducts = { ...tempData.products };
    newProducts[productId].qty = Number(e.target.value);
    setTempData({ ...tempData, products: newProducts });
  };

  if (!tempData.id) return null;

  return (
    <div className="modal fade" id="orderModal">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">編輯訂單：{tempData.id}</h5>
          </div>
          <div className="modal-body">
            <h6>顧客基本資料</h6>
            <div className="row mb-3 g-2">
              <div className="col-4"><input name="name" className="form-control" value={tempData.user?.name || ''} onChange={handleUserChange} placeholder="姓名" /></div>
              <div className="col-4"><input name="email" className="form-control" value={tempData.user?.email || ''} onChange={handleUserChange} placeholder="Email" /></div>
              <div className="col-4"><input name="tel" className="form-control" value={tempData.user?.tel || ''} onChange={handleUserChange} placeholder="電話" /></div>
              <div className="col-12"><input name="address" className="form-control" value={tempData.user?.address || ''} onChange={handleUserChange} placeholder="地址" /></div>
            </div>

            <h6>購物細節</h6>
            <div className="row mb-3 g-2">
              <div className="col-6"><input name="delivery" className="form-control" value={tempData.user?.delivery || ''} onChange={handleUserChange} placeholder="配送方式" /></div>
              <div className="col-6"><input name="payment" className="form-control" value={tempData.user?.payment || ''} onChange={handleUserChange} placeholder="付款方式" /></div>
              <div className="col-4"><input name="type" className="form-control" value={tempData.user?.invoice?.type || ''} onChange={handleUserChange} placeholder="發票類型" /></div>
              <div className="col-4"><input name="tool" className="form-control" value={tempData.user?.invoice?.tool || ''} onChange={handleUserChange} placeholder="發票載具" /></div>
              <div className="col-4"><input name="email" className="form-control" value={tempData.user?.invoice?.email || ''} onChange={handleUserChange} placeholder="發票 Email" /></div>
            </div>

            <h6>商品明細</h6>
            <table className="table">
              <thead><tr><th>商品</th><th>數量</th><th>單價</th></tr></thead>
              <tbody>
                {Object.entries(tempData.products || {}).map(([id, item]) => (
                  <tr key={id}>
                    <td>{item.product.title}</td>
                    <td><input type="number" className="form-control w-25" value={item.qty} onChange={(e) => handleQtyChange(e, id)} /></td>
                    <td>${item.product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mb-3">
              <label>訂單備註</label>
              <textarea name="message" className="form-control" rows="3" value={tempData.message || ''} onChange={handleInputChange} />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button className="btn btn-primary" onClick={() => onUpdateOrder(tempData)}>儲存全數變更</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;