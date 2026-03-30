import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import * as bootstrap from "bootstrap";
import Pagination from "../../components/Pagination";
import CouponModal from "../../components/CouponModal";

const { VITE_PATH, VITE_URL } = import.meta.env;

const BackstageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  const couponModalRef = useRef(null);
  const [modalType, setModalType] = useState("");

  // 🚩 1. 優惠券初始資料
  const [templateData, setTemplateData] = useState({
    title: "",
    is_enabled: 0,
    percent: 100,
    due_date: Math.floor(Date.now() / 1000),
    code: "",
  });

  // 🚩 2. 取得優惠券列表 (不需重複檢查 Admin)
  const getCouponData = async (page = 1) => {
    try {
      const res = await axios.get(
        `${VITE_URL}/v2/api/${VITE_PATH}/admin/coupons?page=${page}`
      );
      setCoupons(res.data.coupons);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("取得優惠券失敗", err.response);
    }
  };

  // 開啟 Modal
  const openModal = (coupon, type) => {
    setModalType(type);
    if (type === "new") {
      setTemplateData({
        title: "",
        is_enabled: 0,
        percent: 100,
        due_date: Math.floor(Date.now() / 1000),
        code: "",
      });
    } else {
      setTemplateData({ ...coupon });
    }
    couponModalRef.current.show();
  };

  const closeModal = () => {
    couponModalRef.current.hide();
  };

  // 🚩 3. 新增或編輯優惠券 (修正 Catch 邏輯)
  const updateCoupon = async (id) => {
    let url = `${VITE_URL}/v2/api/${VITE_PATH}/admin/coupon`;
    let method = "post";

    if (modalType === "edit") {
      url = `${VITE_URL}/v2/api/${VITE_PATH}/admin/coupon/${id}`;
      method = "put";
    }

    const couponData = {
      data: {
        ...templateData,
        percent: Number(templateData.percent),
        is_enabled: templateData.is_enabled ? 1 : 0,
        // 確保 due_date 是數字格式
        due_date: Number(templateData.due_date)
      },
    };

    try {
      await axios[method](url, couponData);
      toast.success(modalType === "edit" ? "更新成功" : "新增成功");
      closeModal();
      getCouponData(pagination.current_page || 1);
    } catch (err) {
      // 🚩 修正：原先失敗也噴 success toast 的問題
      const msg = err.response?.data?.message || "操作失敗";
      toast.error(msg);
    }
  };

  // 刪除優惠券
  const delCoupon = async (id) => {
    try {
      await axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/coupon/${id}`);
      toast.success("已刪除優惠券");
      closeModal();
      getCouponData();
    } catch (err) {
      toast.error("刪除失敗");
    }
  };

  // 表單輸入處理
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setTemplateData((pre) => ({
      ...pre,
      [id]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  // 🚩 4. 簡化後的 useEffect
  useEffect(() => {
    // 初始化 Bootstrap Modal
    couponModalRef.current = new bootstrap.Modal("#couponModal", {
      keyboard: false
    });

    // 直接抓取資料，驗證交給父層 Backstage.jsx
    getCouponData();

    // 處理 Modal 關閉後的焦點問題
    const modalElement = document.querySelector("#couponModal");
    const handleHide = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };
    modalElement.addEventListener("hide.bs.modal", handleHide);

    return () => {
      modalElement.removeEventListener("hide.bs.modal", handleHide);
    };
  }, []);

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">優惠券管理</h3>
        <button className="btn btn-primary px-4 py-2" onClick={() => openModal({}, "new")}>
          <i className="bi bi-plus-lg me-2"></i>建立新優惠券
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr className="text-secondary small">
              <th>名稱</th>
              <th>折扣代碼</th>
              <th>折扣百分比</th>
              <th>到期日</th>
              <th className="text-center">狀態</th>
              <th className="text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length > 0 ? (
              coupons.map((item) => (
                <tr key={item.id}>
                  <td className="fw-semibold">{item.title}</td>
                  <td><code className="bg-primary bg-opacity-10 text-primary px-2 py-1 rounded">{item.code}</code></td>
                  <td>{item.percent}%</td>
                  <td className="text-muted">{new Date(item.due_date * 1000).toLocaleDateString()}</td>
                  <td className="text-center">
                    {item.is_enabled ? (
                      <span className="text-success small fw-bold">● 已啟用</span>
                    ) : (
                      <span className="text-muted small">○ 未啟用</span>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="btn-group btn-group-sm shadow-sm">
                      <button className="btn btn-outline-primary" onClick={() => openModal(item, "edit")}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-outline-danger" onClick={() => openModal(item, "delete")}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-5 text-muted">目前暫無優惠券資料</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4">
        <Pagination pagination={pagination} changePage={getCouponData} />
      </div>

      {/* CouponModal */}
      <CouponModal
        modalType={modalType}
        templateData={templateData}
        onInputChange={handleInputChange}
        onUpdateCoupon={updateCoupon}
        onDeleteCoupon={delCoupon}
        onClose={closeModal}
      />
    </div>
  );
};

export default BackstageCoupons;