function CouponModal({
  modalType,
  templateData,
  onCloseModal,
  onInputChange,
  onUpdateCoupon,
  onDeleteCoupon,
}) {
  return (
    <div
      className="modal fade"
      id="couponModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          {/* Header */}
          <div
            className={`modal-header py-3 ${
              modalType === "delete" ? "bg-danger" : "bg-dark"
            } text-white`}
          >
            <h5 className="modal-title fw-semibold">
              {modalType === "delete"
                ? "刪除優惠券"
                : modalType === "edit"
                ? "編輯優惠券"
                : "新增優惠券"}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            />
          </div>

          {/* Body */}
          <div className="modal-body">
            {modalType === "delete" ? (
              <div className="alert alert-danger text-center mb-0">
                <h5 className="mb-3">⚠️ 刪除確認</h5>
                <p className="mb-0">
                  確定要刪除優惠券：
                  <span className="fw-bold mx-1">{templateData.title}</span>
                  嗎？
                </p>
              </div>
            ) : (
              <div className="row g-3">
                {/* 標題 */}
                <div className="col-12">
                  <label htmlFor="title" className="form-label small fw-bold">
                    優惠券名稱
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="form-control"
                    placeholder="例如：週年慶特惠"
                    value={templateData.title}
                    onChange={onInputChange}
                  />
                </div>

                {/* 優惠碼 */}
                <div className="col-12">
                  <label htmlFor="code" className="form-label small fw-bold">
                    優惠代碼 (Code)
                  </label>
                  <input
                    id="code"
                    type="text"
                    className="form-control"
                    placeholder="例如：happy2025"
                    value={templateData.code}
                    onChange={onInputChange}
                  />
                </div>

                {/* 到期日 */}
                <div className="col-md-6">
                  <label htmlFor="due_date" className="form-label small fw-bold">
                    到期日
                  </label>
                  <input
                    id="due_date"
                    type="date"
                    className="form-control"
                    // 將 Timestamp 轉回 YYYY-MM-DD 格式顯示在 input
                    value={
                      templateData.due_date
                        ? new Date(templateData.due_date * 1000).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => {
                      // 將 input 日期字串轉回 Timestamp 秒數傳回父組件
                      const timestamp = Math.floor(new Date(e.target.value).getTime() / 1000);
                      onInputChange({
                        target: { id: "due_date", value: timestamp },
                      });
                    }}
                  />
                </div>

                {/* 折扣百分比 */}
                <div className="col-md-6">
                  <label htmlFor="percent" className="form-label small fw-bold">
                    折扣百分比 (%)
                  </label>
                  <div className="input-group">
                    <input
                      id="percent"
                      type="number"
                      min="0"
                      max="100"
                      className="form-control"
                      placeholder="例如：80"
                      value={templateData.percent}
                      onChange={onInputChange}
                    />
                    <span className="input-group-text">%</span>
                  </div>
                  <small className="text-muted">80 代表打 8 折</small>
                </div>

                {/* 啟用狀態 */}
                <div className="col-12 mt-2">
                  <div className="form-check form-switch">
                    <input
                      id="is_enabled"
                      type="checkbox"
                      className="form-check-input"
                      checked={templateData.is_enabled === 1}
                      onChange={(e) => {
                        onInputChange({
                          target: {
                            id: "is_enabled",
                            type: "checkbox",
                            checked: e.target.checked ? 1 : 0,
                          },
                        });
                      }}
                    />
                    <label className="form-check-label" htmlFor="is_enabled">
                      是否啟用此優惠券
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer border-0 pt-0">
            <button
              type="button"
              className="btn btn-outline-secondary me-auto"
              data-bs-dismiss="modal"
              onClick={onCloseModal}
            >
              取消
            </button>

            {modalType === "delete" ? (
              <button
                type="button"
                className="btn btn-danger px-4"
                onClick={() => onDeleteCoupon(templateData.id)}
              >
                刪除
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary px-4"
                onClick={() => onUpdateCoupon(templateData.id)}
              >
                確認
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponModal;