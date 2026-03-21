import React from 'react';

const CartList = ({ 
  cart, 
  currency, 
  updateCart, 
  deleteCart, 
  handleMoveToWishlist, 
  isUpdating 
}) => {
  return (
    <div className="col-md-9">
      <div className="fs-36 fw-700 title-text-cart text-black mb-32">守護清單</div>

      {/* --- 桌機版 --- */}
      <div className="card-body d-none d-md-block">
        <table className="table align-middle">
          <thead>
            <tr>
              <th width="400">守護清單</th>
              <th width="120" className="text-start">單價</th>
              <th width="160" className="text-center">數量</th>
              <th width="120" className="text-start">小計</th>
              <th width="150"></th>
            </tr>
          </thead>
          <tbody>
            {cart?.carts?.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.title}
                      className="object-fit-cover mr-3"
                      style={{ width: '100px', height: '100px' }}
                    />
                    <div>
                      <div className="fs-20 lh-base fw-bold">{item.product.title}</div>
                      <div className="fs-16 lh-base fw-400 text-gray-500">{item.product.agency}</div>
                    </div>
                  </div>
                </td>
                <td>${currency(item.product.price)}</td>
                <td>
                  <div className="d-flex align-items-center justify-content-center">
                    <button 
                      className="btn btn-outline-dark btn-sm rounded-circle"
                      style={{ width: '30px', height: '30px', padding: 0 }}
                      onClick={() => updateCart(item.id, item.product_id, item.qty - 1)}
                      disabled={item.qty <= 1 || isUpdating === item.id}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <span className="mx-3 fw-bold">{item.qty}</span>
                    <button 
                      className="btn btn-outline-dark btn-sm rounded-circle"
                      style={{ width: '30px', height: '30px', padding: 0 }}
                      onClick={() => updateCart(item.id, item.product_id, item.qty + 1)}
                      disabled={isUpdating === item.id}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </td>
                <td className="text-start fw-bold">
                  ${currency(item.final_total)}
                </td>
                <td>
                  <button 
                    className="btn btn-sm text-dark d-flex align-items-center justify-content-end mb-2 w-100"
                    onClick={() => deleteCart(item.id)}
                  >
                    <i className="bi bi-trash3 me-2"></i> 取消守護
                  </button>
                  <button 
                    className="btn btn-sm text-dark d-flex align-items-center justify-content-end w-100"
                    onClick={() => handleMoveToWishlist(item)}
                  >
                    <i className="bi bi-heart me-2"></i> 移至收藏
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- 手機版 --- */}
      <div className="d-md-none">
        {cart.carts?.map((item) => (
          <div key={item.id} className="py-3 border-bottom">
            <div className="d-flex gap-3">
              {/* 左側：商品圖片 */}
              <div style={{ width: '80px', height: '80px' }}>
                <img 
                  src={item.product.imageUrl} 
                  className="w-100 h-100 object-fit-cover rounded" 
                  alt={item.product.title} 
                />
              </div>

              {/* 右側：內容與操作 */}
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="fw-bold mb-1">{item.product.title}</h6>
                    <p className="text-muted small mb-0">{item.product.agency}</p>
                  </div>
                  <div className="d-flex gap-3 text-muted">
                    <i className="bi bi-heart" style={{ cursor: 'pointer' }}></i>
                    <i 
                      className="bi bi-trash" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => deleteCart(item.id)}
                    ></i>
                  </div>
                </div>

                {/* 下方：數量與金額 */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="d-flex align-items-center justify-content-center">
                    <button 
                      className="btn btn-outline-dark btn-sm rounded-circle"
                      style={{ width: '30px', height: '30px', padding: 0 }}
                      onClick={() => updateCart(item.id, item.product_id, item.qty - 1)}
                      disabled={item.qty <= 1 || isUpdating === item.id}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <span className="mx-3 fw-bold">{item.qty}</span>
                    <button 
                      className="btn btn-outline-dark btn-sm rounded-circle"
                      style={{ width: '30px', height: '30px', padding: 0 }}
                      onClick={() => updateCart(item.id, item.product_id, item.qty + 1)}
                      disabled={isUpdating === item.id}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                  <span className="fw-bold">${item.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartList;