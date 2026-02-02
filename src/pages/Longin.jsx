import { useState } from "react";
import  axios from 'axios'

const{VITE_PATH,VITE_URL}=import.meta.env;

function Longin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isAuth, setisAuth] = useState(false);
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(null);

  async function checkLogin() {
    try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
        axios.defaults.headers.common['Authorization'] = token;

      const res = await axios.post(`${VITE_URL}/v2/api/user/check`);
      console.log(res);
      alert('已登入');
    } catch (err) {
      console.error(err);
    }
  }

  async function logout() {
    try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
        axios.defaults.headers.common['Authorization'] = token;

        const res = await axios.post(`${VITE_URL}/v2/logout`);

      alert(`${res.data.message}`);

      setisAuth(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function getData() {
    try {
      const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/products`);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((data) => ({
      ...data,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
      const response = await axios.post(`${VITE_URL}/v2/admin/signin`, formData);
      const { token, expired } = response.data;
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
      axios.defaults.headers.common['Authorization'] = token;

      getData();

      setisAuth(true);
    }catch(err){
      alert("登入失敗");
    }
  };

  return (
    <>
{isAuth ? (
  <div className="container-fluid pt-5 bg-success bg-opacity-10">
    <div className="row g-4">
      {/* 左：產品列表 */}
      <div className="col-12">
        <div className="card shadow-sm h-100">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold">產品列表</h5>
            <button
              className="btn btn-outline-danger btn-sm"
              type="button"
              onClick={checkLogin}
            >
              確認是否登入
            </button>
            <button
              className="btn btn-outline-success btn-sm"
              type="button"
              onClick={logout}
            >
              登出
            </button>
          </div>

          <div className="card-body p-0">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>產品名稱</th>
                  <th>原價</th>
                  <th>售價</th>
                  <th className="text-center">狀態</th>
                  <th className="text-center">操作</th>
                </tr>
              </thead>
              <tbody>
                {products && products.length > 0 ? (
                  products.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-semibold">{item.title}</td>
                      <td className="text-muted">
                        ${item.origin_price}
                      </td>
                      <td className="fw-bold text-danger">
                        ${item.price}
                      </td>
                      <td className="text-center">
                        <span
                          className={`badge ${
                            item.is_enabled ? "bg-success" : "bg-secondary"
                          }`}
                        >
                          {item.is_enabled ? "啟用" : "未啟用"}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setTempProduct(item)}
                        >
                          查看細節
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      <div className="alert alert-secondary text-center mb-0">
                        尚無產品資料
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 右：產品細節 */}
      <div className="col-0 col-md-3"></div>
      <div className="col-12 col-md-6">
        <div className="card shadow-sm h-100">
          <div className="card-header bg-white">
            <h5 className="mb-0 fw-bold">單一產品細節</h5>
          </div>

          <div className="card-body">
            {tempProduct ? (
              <>
                <img
                  src={tempProduct.imageUrl}
                  className="img-fluid rounded mb-3"
                  alt="主圖"
                />

                <h5 className="fw-bold">
                  {tempProduct.title}
                  <span className="badge bg-primary ms-2">
                    {tempProduct.category}
                  </span>
                </h5>

                <p className="text-muted small mb-1">商品描述</p>
                <p>{tempProduct.description}</p>

                <p className="text-muted small mb-1">商品內容</p>
                <p>{tempProduct.content}</p>

                <div className="bg-light p-3 rounded mb-3">
                  <span className="text-muted text-decoration-line-through me-2">
                    ${tempProduct.origin_price}
                  </span>
                  <span className="fw-bold text-danger fs-5">
                    ${tempProduct.price}
                  </span>
                  <span className="ms-1">元</span>
                </div>

                <h6 className="fw-bold">更多圖片</h6>
                <div className="row g-2">
                  {tempProduct.imagesUrl?.map((url, index) => (
                    <div className="col-4" key={index}>
                      <img
                        src={url}
                        className="img-fluid rounded border"
                        alt="副圖"
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="alert alert-secondary text-center">
                請選擇一個商品查看
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-0 col-md-3"></div>
    </div>
  </div>
      ) : (
  <div className="container-fluid bg-success bg-opacity-10 min-vh-100 d-flex align-items-center">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body bg-success bg-opacity-25">
              <h1 className="fs-3 text-center fw-bold mb-4 text-white fw-bold">
                Pawarm
              </h1>

              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="username"
                    placeholder="name@example.com"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="username">Email</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <button
                  className="fs-4 btn btn-success w-100 bg-success bg-opacity-10 text-white fw-bold"
                  type="submit"
                >
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default Longin;
