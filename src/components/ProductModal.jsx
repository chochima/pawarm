/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

function ProductModal({
  modalType,
  templateData,
  onInputChange,
  onFileChange,
  onImageChange,
  onAddImage,
  onRemoveImage,
  onUpdateProduct,
  onDeleteProduct,
  onContentChange,
  onAddContentImage,
  onRemoveContentImage,
  onContentImageChange,
}) {
  return (
    <div className="modal fade" id="productModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg rounded-4">
          
          {/* Header */}
          <div className={`modal-header py-3 ${modalType === "delete" ? "bg-danger" : "bg-dark"} text-white`}>
            <h5 className="modal-title fw-semibold">
              {modalType === "delete" ? "⚠️ 刪除確認" : modalType === "edit" ? "📝 編輯產品" : "✨ 新增產品"}
            </h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" />
          </div>

          <div className="modal-body p-4">
            {modalType === "delete" ? (
              <div className="alert alert-danger text-center mb-0 py-4">
                <p className="fs-5 mb-0">確定要刪除 <span className="fw-bold">{templateData.title}</span> 嗎？</p>
              </div>
            ) : (
              <div className="row g-4">
                
                {/* --- 左側圖片管理區 --- */}
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm border-0 bg-light rounded-3 p-3">
                    <h6 className="fw-bold mb-3 border-bottom pb-2">產品圖片管理</h6>
                    
                    {/* 主圖上傳 */}
                    <div className="mb-4">
                      <label className="form-label small text-muted fw-bold">主圖來源</label>
                      <div className="input-group input-group-sm mb-2">
                        <input id="imageUrl" type="text" className="form-control" placeholder="請輸入圖片 URL" value={templateData.imageUrl || ''} onChange={onInputChange} />
                        <label className="btn btn-outline-primary">
                          <i className="bi bi-upload"></i>
                          <input type="file" className="d-none" onChange={(e) => onFileChange(e, 'main')} />
                        </label>
                      </div>
                      {templateData.imageUrl && (
                        <div className="ratio ratio-1x1 shadow-sm rounded overflow-hidden border bg-white">
                          <img src={templateData.imageUrl} alt="主圖" className="object-fit-cover" />
                        </div>
                      )}
                    </div>

                    {/* 副圖上傳 */}
                    <hr />
                    <h6 className="fw-bold mb-3 small text-muted text-uppercase">其他副圖 (最多 5 張)</h6>
                    {templateData.imagesUrl?.map((image, index) => (
                      <div key={index} className="mb-4 p-2 border rounded bg-white shadow-sm position-relative">
                        {/* 優化：將關閉按鈕改為紅色小按鈕，並增加間距避免誤觸 */}
                        <button 
                          type="button" 
                          className="btn btn-danger btn-sm position-absolute rounded-circle" 
                          style={{ top: '-10px', right: '-10px', width: '25px', height: '25px', padding: '0', zIndex: '10' }} 
                          onClick={() => onRemoveImage(index)}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                        
                        <div className="input-group input-group-sm mb-2">
                          <input type="text" className="form-control" value={image || ""} onChange={(e) => onImageChange(index, e.target.value)} placeholder="副圖 URL" />
                          <label className="btn btn-outline-secondary">
                            <i className="bi bi-upload"></i>
                            <input type="file" className="d-none" onChange={(e) => onFileChange(e, 'sub', index)} />
                          </label>
                        </div>
                        {image && (
                          <div className="ratio ratio-16x9">
                            <img src={image} className="rounded object-fit-cover border" alt="" />
                          </div>
                        )}
                      </div>
                    ))}
                    {templateData.imagesUrl?.length < 5 && (
                      <button type="button" className="btn btn-outline-primary btn-sm w-100 border-dashed" onClick={onAddImage}>
                        <i className="bi bi-plus-lg me-1"></i>新增副圖欄位
                      </button>
                    )}
                  </div>
                </div>

                {/* --- 右側基本與詳細資訊區 --- */}
                <div className="col-md-8">
                  <div className="card border-0 shadow-sm h-100 p-3">
                    <h6 className="fw-bold mb-4 text-primary border-bottom pb-2">產品規格資訊</h6>
                    
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label fw-bold small">產品標題 <span className="text-danger">*</span></label>
                      <input id="title" type="text" className="form-control" placeholder="請輸入標題" value={templateData.title || ''} onChange={onInputChange} />
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label htmlFor="category" className="form-label fw-bold small">分類 <span className="text-danger">*</span></label>
                        <input id="category" type="text" className="form-control" placeholder="請輸入分類" value={templateData.category || ''} onChange={onInputChange} />
                      </div>
                      <div className="col-md-6">
                        {/* 修正 400 錯誤：補上必填的「單位」欄位 */}
                        <label htmlFor="unit" className="form-label fw-bold small">單位 (unit) <span className="text-danger">*</span></label>
                        <input id="unit" type="text" className="form-control" placeholder="請輸入單位 (如：隻、個)" value={templateData.unit || ''} onChange={onInputChange} />
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-4">
                        <label htmlFor="origin_price" className="form-label fw-bold small">原價 <span className="text-danger">*</span></label>
                        {/* 優化：加上 min="0" 防止負數 */}
                        <input id="origin_price" type="number" min="0" className="form-control" placeholder="0" value={templateData.origin_price ?? ''} onChange={onInputChange} />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="price" className="form-label fw-bold small">售價 <span className="text-danger">*</span></label>
                        {/* 優化：加上 min="0" 防止負數 */}
                        <input id="price" type="number" min="0" className="form-control" placeholder="0" value={templateData.price ?? ''} onChange={onInputChange} />
                      </div>
                    </div>

                    <hr />

                    <div className="mb-4">
                      <label htmlFor="description" className="form-label fw-bold small">產品描述</label>
                      <textarea id="description" className="form-control" rows="2" placeholder="請輸入產品簡介" value={templateData.description || ''} onChange={onInputChange} />
                    </div>

                    {/* 詳細介紹圖片 (contentImgsUrl) */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label fw-bold mb-0 small">介紹區圖片 (內容圖)</label>
                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={onAddContentImage}>+ 新增圖欄</button>
                      </div>
                      <div className="row g-2">
                        {templateData.contentImgsUrl?.map((img, index) => (
                          <div key={index} className="col-md-6 mb-2">
                            <div className="input-group input-group-sm mb-1">
                              <input type="text" className="form-control" placeholder="圖片 URL" value={img || ""} onChange={(e) => onContentImageChange(index, e.target.value)} />
                              <button className="btn btn-outline-danger" onClick={() => onRemoveContentImage(index)}>
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                            {img && <div className="ratio ratio-16x9 border rounded overflow-hidden"><img src={img} className="object-fit-cover" alt="" /></div>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="form-check form-switch mt-auto pt-3">
                      <input id="is_enabled" type="checkbox" className="form-check-input" checked={!!templateData.is_enabled} onChange={onInputChange} />
                      <label className="form-check-label fw-bold" htmlFor="is_enabled">
                        {templateData.is_enabled ? '✅ 已啟用' : '❌ 停用中'}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer bg-light border-0 py-3">
            <button type="button" className="btn btn-link text-secondary text-decoration-none" data-bs-dismiss="modal">取消</button>
            <button 
              type="button" 
              className={`btn ${modalType === 'delete' ? 'btn-danger px-5' : 'btn-primary px-5'} fw-bold shadow-sm`}
              onClick={() => modalType === 'delete' ? onDeleteProduct(templateData.id) : onUpdateProduct(templateData.id)}
            >
              確認{modalType === 'delete' ? '刪除' : '儲存'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductModal.propTypes = {
  modalType: PropTypes.string,
  templateData: PropTypes.object,
  onInputChange: PropTypes.func,
  onFileChange: PropTypes.func,
  onImageChange: PropTypes.func,
  onAddImage: PropTypes.func,
  onRemoveImage: PropTypes.func,
  onUpdateProduct: PropTypes.func,
  onDeleteProduct: PropTypes.func,
  onContentChange: PropTypes.func,
  onAddContentImage: PropTypes.func,
  onRemoveContentImage: PropTypes.func,
  onContentImageChange: PropTypes.func,
};

export default ProductModal;