import { useState, useEffect } from "react";

const OrderModal = ({ order, onUpdateOrder }) => {
  const [tempData, setTempData] = useState({});

  useEffect(() => {
    setTempData(order);
  }, [order]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, user: { ...tempData.user, [name]: value } });
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
            <h6>顧客資料</h6>
            <div className="row mb-3">
              <div className="col-4"><input name="name" className="form-control" value={tempData.user?.name || ''} onChange={handleUserChange} placeholder="姓名" /></div>
              <div className="col-4"><input name="email" className="form-control" value={tempData.user?.email || ''} onChange={handleUserChange} placeholder="Email" /></div>
              <div className="col-4"><input name="tel" className="form-control" value={tempData.user?.tel || ''} onChange={handleUserChange} placeholder="電話" /></div>
              <div className="col-12 mt-2">
                <input name="address" className="form-control" value={tempData.user?.address || ''} onChange={handleUserChange} placeholder="地址" />
              </div>
            </div>

            <h6>商品明細</h6>
            <table className="table">
              <thead><tr><th>商品</th><th>數量</th><th>單價</th></tr></thead>
              <tbody>
                {Object.entries(tempData.products || {}).map(([id, item]) => (
                  <tr key={id}>
                    <td>{item.product.title}</td>
                    <td>
                      <input type="number" className="form-control w-25" value={item.qty} onChange={(e) => handleQtyChange(e, id)} />
                    </td>
                    <td>${item.product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mb-3">
              <label>訂單備註</label>
              <textarea 
                name="message" 
                className="form-control" 
                rows="8" // 將備註區塊高度加大
                value={tempData.message || ''} 
                onChange={handleInputChange} 
              />
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