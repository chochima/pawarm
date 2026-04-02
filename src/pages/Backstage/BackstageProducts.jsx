import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import * as bootstrap from "bootstrap";
import toast from 'react-hot-toast';
import Pagination from "../../components/Pagination";
import ProductModal from "../../components/ProductModal";

const { VITE_PATH, VITE_URL } = import.meta.env;

const BackstageProducts = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const productModalRef = useRef(null);
  const [modalType, setModalType] = useState("");
  const [templateData, setTemplateData] = useState({
    id: "",
    imageUrl: "",
    title: "",
    category: "",
    unit: "",
    origin_price: 0,
    price: 0,
    description: "",
    content: ["", "", "", ""],
    is_enabled: false,
    imagesUrl: [],
    agency: "",
    animal: "",
    area: "",
    contentImgsUrl: [],
  });

  // 🚩 修正 1：使用 useCallback 穩定函式，並移除 catch 中未使用的變數
  const getProductData = useCallback(async (page = 1) => {
    try {
      const res = await axios.get(
        `${VITE_URL}/v2/api/${VITE_PATH}/admin/products?page=${page}`
      );
      setProducts(res.data.products);
      setPagination(res.data.pagination);
    } catch {
      toast.error("取得產品資料失敗");
    }
  }, []);

  // Modal 邏輯
  const openModal = (product, type) => {
    setTemplateData({
      id: product.id || "",
      imageUrl: product.imageUrl || "",
      title: product.title || "",
      category: product.category || "",
      unit: product.unit || "",
      origin_price: product.origin_price || 0,
      price: product.price || 0,
      description: product.description || "",
      content: product.content || ["", "", "", ""],
      is_enabled: product.is_enabled || false,
      imagesUrl: product.imagesUrl || [],
      agency: product.agency || "",
      animal: product.animal || "",
      area: product.area || "",
      contentImgsUrl: product.contentImgsUrl || [],
    });
    setModalType(type);
    productModalRef.current.show();
  };

  const closeModal = () => {
    productModalRef.current.hide();
  };

  // 圖片上傳
  const handleFileChange = async (e, type = 'main', index = null) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file-to-upload", file);

    try {
      toast.loading("圖片上傳中...", { id: 'upload' });
      const res = await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/admin/upload`, formData);
      const uploadedImageUrl = res.data.imageUrl;

      setTemplateData((prev) => {
        if (type === 'main') {
          return { ...prev, imageUrl: uploadedImageUrl };
        } else if (type === 'sub') {
          const newImages = [...prev.imagesUrl];
          newImages[index] = uploadedImageUrl;
          return { ...prev, imagesUrl: newImages };
        } else if (type === 'content') {
          const newContentImgs = [...(prev.contentImgsUrl || [])];
          newContentImgs[index] = uploadedImageUrl;
          return { ...prev, contentImgsUrl: newContentImgs };
        }
        return prev;
      });
      
      toast.success("圖片上傳成功！", { id: 'upload' });
    } catch {
      toast.error("圖片上傳失敗", { id: 'upload' });
    }
  };

  const updateProductData = async (id) => {
    let url = `${VITE_URL}/v2/api/${VITE_PATH}/admin/product`;
    let method = "post";

    if (modalType === "edit") {
      url = `${VITE_URL}/v2/api/${VITE_PATH}/admin/product/${id}`;
      method = "put";
    }

    const productData = {
      data: {
        ...templateData,
        origin_price: Number(templateData.origin_price),
        price: Number(templateData.price),
        is_enabled: templateData.is_enabled ? 1 : 0,
      },
    };

    try {
      await axios[method](url, productData);
      toast.success(modalType === "edit" ? "產品更新成功" : "產品新增成功");
      closeModal();
      getProductData(pagination.current_page || 1);
    } catch (err) {
      const msg = err.response?.data?.message || "操作失敗";
      toast.error(msg);
    }
  };

  const delProductData = async (id) => {
    try {
      await axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/product/${id}`);
      toast.success("產品已刪除");
      closeModal();
      getProductData();
    } catch {
      toast.error("刪除失敗");
    }
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setTemplateData((pre) => ({
      ...pre,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (index, value) => {
    setTemplateData((pre) => {
      const newImages = [...pre.imagesUrl];
      newImages[index] = value;
      if (value !== "" && index === newImages.length - 1 && newImages.length < 5) {
        newImages.push("");
      }
      return { ...pre, imagesUrl: newImages };
    });
  };

  const handleAddImage = () => {
    if (templateData.imagesUrl.length >= 5) {
      toast.error("最多只能上傳 5 張圖片");
      return;
    }
    setTemplateData((pre) => ({ ...pre, imagesUrl: [...pre.imagesUrl, ""] }));
  };

  const handleRemoveImage = (index) => {
    setTemplateData((pre) => {
      const newImages = pre.imagesUrl.filter((_, i) => i !== index);
      return { ...pre, imagesUrl: newImages.length === 0 ? [""] : newImages };
    });
  };

  const handleContentImageChange = (index, value) => {
    setTemplateData((prev) => {
      const newImgs = [...(prev.contentImgsUrl || [])];
      newImgs[index] = value;
      return { ...prev, contentImgsUrl: newImgs };
    });
  };

  const handleAddContentImage = () => {
    setTemplateData((prev) => ({
      ...prev,
      contentImgsUrl: [...(prev.contentImgsUrl || []), ""],
    }));
  };

  const handleRemoveContentImage = (index) => {
    setTemplateData((prev) => ({
      ...prev,
      contentImgsUrl: prev.contentImgsUrl.filter((_, i) => i !== index),
    }));
  };

  const handleContentChange = (index, value) => {
    setTemplateData((prev) => {
      const newContent = [...prev.content];
      newContent[index] = value;
      return { ...prev, content: newContent };
    });
  };

  // 🚩 修正 2：封裝 fetchData 以避開同步連鎖渲染警告
  useEffect(() => {
    productModalRef.current = new bootstrap.Modal("#productModal", {
      keyboard: false,
    });

    const fetchData = async () => {
      await getProductData();
    };
    fetchData();

    const modalElement = document.querySelector("#productModal");
    if (modalElement) {
      const handleHide = () => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      };
      modalElement.addEventListener("hide.bs.modal", handleHide);

      return () => {
        modalElement.removeEventListener("hide.bs.modal", handleHide);
      };
    }
  }, [getProductData]);

  return (
    <>
      <div className="container-fluid px-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold mb-0">產品清單</h3>
          <button className="btn btn-primary px-4 py-2" onClick={() => openModal({}, "new")}>
            <i className="bi bi-plus-lg me-2"></i>建立新產品
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr className="text-secondary small">
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120" className="text-end">原價</th>
                <th width="120" className="text-end">售價</th>
                <th width="120" className="text-center">狀態</th>
                <th width="140" className="text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td><span className="badge bg-secondary bg-opacity-10 text-secondary px-3">{product.category}</span></td>
                  <td className="fw-semibold">{product.title}</td>
                  <td className="text-end text-muted">${product.origin_price}</td>
                  <td className="text-end fw-bold text-dark">${product.price}</td>
                  <td className="text-center">
                    {product.is_enabled ? (
                      <span className="text-success small fw-bold">● 已啟用</span>
                    ) : (
                      <span className="text-muted small">○ 停用</span>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="btn-group btn-group-sm shadow-sm">
                      <button className="btn btn-outline-primary" onClick={() => openModal(product, "edit")}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-outline-danger" onClick={() => openModal(product, "delete")}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4">
          <Pagination pagination={pagination} changePage={getProductData} />
        </div>
      </div>

      <ProductModal
        modalType={modalType}
        templateData={templateData}
        onCloseModal={closeModal}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        onImageChange={handleImageChange}
        onAddImage={handleAddImage}
        onRemoveImage={handleRemoveImage}
        onUpdateProduct={updateProductData}
        onDeleteProduct={delProductData}
        onContentChange={handleContentChange}
        onAddContentImage={handleAddContentImage}
        onRemoveContentImage={handleRemoveContentImage}
        onContentImageChange={handleContentImageChange}
      />
    </>
  );
};

export default BackstageProducts;