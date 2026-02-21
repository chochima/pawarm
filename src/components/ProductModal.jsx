function ProductModal({
  modalType,
  templateData,
  onCloseModal,
  onInputChange,
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
          {/* Header 保持不變 */}
          <div className={`modal-header py-3 ${modalType === "delete" ? "bg-danger" : "bg-dark"} text-white`}>
            <h5 className="modal-title fw-semibold">
              {modalType === "delete" ? "刪除產品" : modalType === "edit" ? "編輯產品" : "新增產品"}
            </h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" />
          </div>

          <div className="modal-body">
            {modalType === "delete" ? (
              <div className="alert alert-danger text-center mb-0">
                <h5 className="mb-3">⚠️ 刪除確認</h5>
                <p>確定要刪除 <span className="fw-bold">{templateData.title}</span> 嗎？</p>
              </div>
            ) : (
              <div className="row g-4">
                {/* 左側圖片區：保留原本的主圖與副圖邏輯 */}
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm border-0 bg-light">
                    <div className="card-body">
                      <h6 className="fw-semibold mb-3">產品圖片</h6>
                      <div className="mb-3">
                        <label className="form-label small text-muted">主圖網址</label>
                        <input id="imageUrl" type="text" className="form-control" value={templateData.imageUrl} onChange={onInputChange} />
                      </div>
                      {templateData.imageUrl && (
                        <div className="ratio ratio-1x1 mb-3 shadow-sm">
                          <img src={templateData.imageUrl} alt="主圖" className="rounded border object-fit-cover" />
                        </div>
                      )}
                      {/* 副圖區 */}
<div className="mt-4">
  <h6 className="fw-semibold mb-3 small text-muted text-uppercase">其他副圖</h6>
  
  {templateData.imagesUrl.map((image, index) => (
    <div key={index} className="mb-3 p-2 border rounded bg-white shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <label className="form-label small mb-0">副圖 {index + 1}</label>
        <button 
          type="button" 
          className="btn-close small" 
          style={{ fontSize: '0.6rem' }}
          onClick={() => onRemoveImage(index)} 
        ></button>
      </div>
      
      <input
        type="text"
        className="form-control form-control-sm mb-2"
        value={image || ""} 
        onChange={(e) => onImageChange(index, e.target.value)}
        placeholder="請輸入圖片網址"
      />
      
      {image && (
        <div className="ratio ratio-16x9">
          <img
            src={image}
            alt={`副圖 ${index + 1}`}
            className="rounded border object-fit-cover"
          />
        </div>
      )}
    </div>
  ))}

  {/* 新增圖片按鈕：限制最多 5 張 */}
  {templateData.imagesUrl.length < 5 && (
    <button
      type="button"
      className="btn btn-outline-primary btn-sm w-100 mt-2"
      onClick={onAddImage}
    >
      + 新增副圖
    </button>
  )}
</div>
                    </div>
                  </div>
                </div>

                {/* 右側表單區：針對你的 JSON 結構優化 */}
                <div className="col-md-8">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <h6 className="fw-semibold mb-3 text-primary">基本資訊</h6>
                      
                      <div className="mb-3">
                        <label className="form-label">產品標題</label>
                        <input id="title" type="text" className="form-control" value={templateData.title} onChange={onInputChange} />
                      </div>

                      {/* 新增：動物、機構、地區資訊 */}
                      <div className="row g-3 mb-3">
                        <div className="col-md-4">
                          <label className="form-label">守護機構 (agency)</label>
                          <input id="agency" type="text" className="form-control" value={templateData.agency} onChange={onInputChange} />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">動物類別 (animal)</label>
                          <input id="animal" type="text" className="form-control" value={templateData.animal} onChange={onInputChange} />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">棲地地區 (area)</label>
                          <input id="area" type="text" className="form-control" value={templateData.area} onChange={onInputChange} />
                        </div>
                      </div>

                      <div className="row g-3 mb-3">
                        <div className="col-md-4">
                          <label className="form-label">分類</label>
                          <input id="category" className="form-control" value={templateData.category} onChange={onInputChange} />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">原價</label>
                          <input id="origin_price" type="number" className="form-control" value={templateData.origin_price} onChange={onInputChange} />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">售價</label>
                          <input id="price" type="number" className="form-control" value={templateData.price} onChange={onInputChange} />
                        </div>
                      </div>

                      <hr />

                      <div className="mb-3">
                        <label className="form-label">詳細描述 (description)</label>
                        <textarea id="description" className="form-control" rows="3" value={templateData.description} onChange={onInputChange} />
                      </div>

                      
                      <div className="mb-3">
                        <label className="form-label d-flex justify-content-between">
                          守護行動內容 (content 陣列)
                          <small className="text-muted">通常包含四項計畫</small>
                        </label>
                        {Array.isArray(templateData.content) ? (
                          templateData.content.map((item, index) => (
                            <div key={index} className="input-group mb-2">
                              <span className="input-group-text small">{index + 1}</span>
                              <input 
                                type="text" 
                                className="form-control" 
                                value={item} 
                                onChange={(e) => onContentChange(index, e.target.value)} 
                              />
                            </div>
                            



                          ))
                        ) : (
                          <textarea id="content" className="form-control" value={templateData.content} onChange={onInputChange} />
                        )}
                      </div>

                      <div>
                        {/* contentImgsUrl 區塊 */}
<div className="mb-3 mt-4">
  <label className="form-label d-flex justify-content-between align-items-center">
    <span className="text-primary fw-bold">內容說明圖片 (contentImgsUrl)</span>
    {templateData.contentImgsUrl?.length < 4 && (
      <button 
        type="button" 
        className="btn btn-outline-primary btn-sm"
        onClick={onAddContentImage}
      >
        + 新增說明圖
      </button>
    )}
  </label>

  <div className="row g-2">
    {templateData.contentImgsUrl?.map((img, index) => (
      <div key={index} className="col-md-6">
        <div className="card shadow-sm border-0 bg-light">
          <div className="card-body p-2">
            <div className="d-flex gap-2 mb-2">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder={`說明圖 ${index + 1} 網址`}
                value={img || ""}
                onChange={(e) => onContentImageChange(index, e.target.value)}
              />
              <button 
                type="button" 
                className="btn btn-outline-danger btn-sm"
                onClick={() => onRemoveContentImage(index)}
              >
                <i className="bi bi-trash"></i> 刪除
              </button>
            </div>
            {img && (
              <div className="ratio ratio-16x9">
                <img src={img} className="rounded object-fit-cover" alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
                      </div>

                      <div className="form-check form-switch mt-4">
                        <input id="is_enabled" type="checkbox" className="form-check-input" checked={templateData.is_enabled} onChange={onInputChange} />
                        <label className="form-check-label fw-bold">啟用此產品</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer 保持不變 */}
          <div className="modal-footer border-0">
            <button type="button" className="btn btn-outline-secondary me-auto" data-bs-dismiss="modal">取消</button>
            <button 
              type="button" 
              className={`btn ${modalType === 'delete' ? 'btn-danger' : 'btn-primary'} px-4`}
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
export default ProductModal;