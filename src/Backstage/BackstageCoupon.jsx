import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import * as bootstrap from "bootstrap";
import Pagination from "../components/Pagination";
import CouponModal from "../components/CouponModal"; // 記得建立這個組件

const { VITE_PATH, VITE_URL } = import.meta.env;

const BackstageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  const couponModalRef = useRef(null);
  const [modalType, setModalType] = useState("");
  
  // 優惠券初始資料結構
  const [templateData, setTemplateData] = useState({
    title: "",
    is_enabled: 0,
    percent: 100,
    due_date: Math.floor(Date.now() / 1000), // 預設今天
    code: "",
  });

  const navigate = useNavigate();

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

  // 取得優惠券列表
  const getCouponData = async (page = 1) => {
    try {
      const res = await axios.get(
        `${VITE_URL}/v2/api/${VITE_PATH}/admin/coupons?page=${page}`
      );
      setCoupons(res.data.coupons);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    }
  };

  // 新增或編輯優惠券
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
      },
    };

    try {
      await axios[method](url, couponData);
      closeModal();
      getCouponData();
    } catch (err) {
      alert(modalType === "edit" ? "更新失敗" : "新增失敗");
    }
  };

  // 刪除優惠券
  const delCoupon = async (id) => {
    try {
      await axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/coupon/${id}`);
      closeModal();
      getCouponData();
    } catch (err) {
      console.error("刪除失敗");
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

  useEffect(() => {
    // Token 驗證與初始化 Modal
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common.Authorization = token;

    const checkAdmin = async () => {
      try {
        await axios.post(`${VITE_URL}/v2/api/user/check`);
        getCouponData();
      } catch {
        navigate("/login");
      }
    };
    checkAdmin();

    couponModalRef.current = new bootstrap.Modal("#couponModal");
  }, [navigate]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-4">
        <h2>優惠券管理</h2>
        <button
                className="btn btn-primary"
                onClick={() => navigate("/")}
              >
                首頁
              </button>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/backstage/products")}
              >
                產品
              </button>
        <button className="btn btn-primary" onClick={() => openModal({}, "new")}>
          建立新優惠券
        </button>
      </div>

      <table className="table table-hover mt-4 align-middle">
        <thead className="table-light">
          <tr>
            <th>名稱</th>
            <th>折扣代碼</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th>是否啟用</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td><code className="text-primary">{item.code}</code></td>
              <td>{item.percent}%</td>
              <td>{new Date(item.due_date * 1000).toLocaleDateString()}</td>
              <td>
                {item.is_enabled ? (
                  <span className="text-success">啟用</span>
                ) : (
                  <span className="text-muted">未啟用</span>
                )}
              </td>
              <td>
                <div className="btn-group btn-group-sm">
                  <button className="btn btn-outline-primary" onClick={() => openModal(item, "edit")}>編輯</button>
                  <button className="btn btn-outline-danger" onClick={() => openModal(item, "delete")}>刪除</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Pagination pagination={pagination} changePage={getCouponData} />

      {/*  CouponModal */}
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