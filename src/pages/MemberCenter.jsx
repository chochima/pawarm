import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../style/_fonts.scss';
import "../style/all.scss";
import notificationsData from '../data/notifications.json'; 
import { toast, Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { setToken } from "../slice/authSlice";
import { logout } from "../slice/authSlice";
import iconUser from "../image/icon-user.png";

const API_BASE = import.meta.env.VITE_URL;
const API_PATH = import.meta.env.VITE_PATH;

function MemberCenter() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('user'); 
    const [expandedId, setExpandedId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [allProducts, setAllProducts] = useState([]); // 存放所有產品以供收藏比對
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    // 1. 收藏 ID 列表 (初始從 LocalStorage 讀取)
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('fav')) || [];
        } catch {
            return [];
        }
    });

    // 2. 計算目前要顯示的收藏產品詳細資料
    const displayFavorites = useMemo(() => {
        return allProducts.filter(item => favorites.map(String).includes(String(item.id)));
    }, [allProducts, favorites]);

    // 時間格式化
    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
        };
    };

    // 登出邏輯
    const handleLogout = () => {
    toast((t) => (
        <span>
            <b className="fs-20">您確定要登出了嗎？</b>
            <div className="mt-2 d-flex justify-content-center gap-2">
                <button
                    className="btn btn-sm btn-danger px-3 text-white"
                    onClick={() => {
                        toast.dismiss(t.id);
                        dispatch(logout());
                        delete axios.defaults.headers.common.Authorization;
                        setTimeout(() => navigate('/Login'), 1000);
                    }}
                >確定</button>
                <button className="btn btn-sm btn-secondary px-3" onClick={() => toast.dismiss(t.id)}>取消</button>
            </div>
        </span>
    ), { id: 'logout-confirm', duration: Infinity, position: 'top-center' });
};

    // 取得訂單與產品資料
    const fetchData = async () => {
        setIsLoading(true);
        try {
            // 同時取得訂單與所有產品
            const [orderRes, productRes] = await Promise.all([
                axios.get(`${API_BASE}/api/${API_PATH}/admin/orders`),
                axios.get(`${API_BASE}/api/${API_PATH}/products/all`)
            ]);

            if (orderRes.data.success) setOrders(orderRes.data.orders);
            if (productRes.data.success) setAllProducts(productRes.data.products);
        } catch (error) {
            console.error("資料讀取失敗", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 切換收藏狀態
    const toggleFavorite = (id) => {
        let updated;
        if (favorites.includes(id)) {
            updated = favorites.filter(favId => favId !== id);
            toast('已從收藏移除', { icon: '🗑️' });
        } else {
            updated = [...favorites, id];
            toast.success('已加入我的關注');
        }
        setFavorites(updated);
        localStorage.setItem('fav', JSON.stringify(updated));
    };

    // 初始驗證
    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("hexToken="))
            ?.split("=")[1];
        if (token) {
            axios.defaults.headers.common['Authorization'] = token;
            fetchData();
        } else {
            navigate('/Login');
        }
    }, [navigate]);
    
    useEffect(() => {
    const handleStorageChange = () => {
        const newFavs = JSON.parse(localStorage.getItem('fav')) || [];
        setFavorites(newFavs);
    };

    // 監聽 storage 事件（包含同分頁手動發送的事件）
    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
}, []);

    return (
        <>
            <Toaster position="top-right" />
            <div className="bg-primary-50 min-vh-100">
                <div className="container py-40">
                    <h1 className="text-center pb-12 text-primary-600 fw-bold">會員中心</h1>
                    <div className="row g-24">
                        
                        {/* 左側選單 */}
                        <div className="col-md-4">
                            <div className="bg-white rounded-4 shadow-sm p-24">
                                <div className="d-flex align-items-center gap-16 mb-32">
                                    <div className="ratio ratio-1x1 shadow-sm rounded-circle overflow-hidden" style={{ width: '80px' }}>
                                        <img src={iconUser} alt="avatar" className="object-fit-cover" />
                                    </div>
                                    <div>
                                        <h4 className="fs-20 fw-bold mb-1">Tina Liu</h4>
                                        <p className="mb-0 text-muted fs-14">LV.5 銀牌守護者</p>
                                    </div>
                                </div>

                                <div className="nav flex-column nav-pills gap-2">
                                    {['user', 'messages', 'orders', 'follow'].map((tab) => (
                                        <button 
                                            key={tab}
                                            className={`nav-link text-start p-16 rounded-3 ${activeTab === tab ? 'active' : 'text-secondary'}`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab === 'user' && '個人資訊'}
                                            {tab === 'messages' && '通知訊息'}
                                            {tab === 'orders' && '訂單資訊'}
                                            {tab === 'follow' && '我的關注'}
                                        </button>
                                    ))}
                                    <hr />
                                    <button className="nav-link text-start p-16 text-danger" onClick={handleLogout}>登出</button>
                                </div>
                            </div>
                        </div>

                        {/* 右側內容區 */}
                        <div className="col-md-8">
                            <div className="bg-white shadow-sm rounded-4 p-24 p-md-40 min-vh-50">
                                
                                {/* 1. 個人資訊 */}
                                {activeTab === 'user' && (
                                    <div className="animate__animated animate__fadeIn">
                                        <h4 className="mb-32 fs-24 fw-700 text-primary-600 border-start border-4 border-primary ps-3">個人資訊</h4>
                                        <form>
                                            <div className="mb-16">
                                                <label className="form-label fw-bold">使用者名稱</label>
                                                <input type="text" className="form-control w-md-50" defaultValue="Tina Liu" />
                                            </div>
                                            <div className="mb-16">
                                                <label className="form-label fw-bold">密碼</label>
                                                <div className="d-flex align-items-center gap-3">
                                                    <input type="password" className="form-control w-md-50" defaultValue="********" />
                                                    <a href="#" className="text-danger fs-14">修改密碼</a>
                                                </div>
                                            </div>
                                            <div className="mb-16">
                                                <label className="form-label fw-bold">Email 信箱</label>
                                                <input type="email" className="form-control-plaintext text-muted" value="dooogie234@gmail.com" readOnly />
                                            </div>
                                            <div className="mb-16">
                                                <label className="form-label fw-bold">手機號碼</label>
                                                <input type="tel" className="form-control w-md-50" defaultValue="0912345678" />
                                            </div>
                                            <div className="mb-16">
                                                <label className="form-label fw-bold d-block">性別</label>
                                                {['女性', '男性', '其他'].map((g, idx) => (
                                                    <div className="form-check form-check-inline" key={g}>
                                                        <input className="form-check-input" type="radio" name="gender" id={`g${idx}`} defaultChecked={idx===0} />
                                                        <label className="form-check-label" htmlFor={`g${idx}`}>{g}</label>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mb-16">
                                                <label className="form-label fw-bold">常用收貨地址</label>
                                                <div className="d-flex gap-2 mb-2 w-md-75">
                                                    <select className="form-select w-50"><option>台北市</option></select>
                                                    <select className="form-select w-50"><option>大安區</option></select>
                                                </div>
                                                <input type="text" className="form-control" placeholder="詳細地址" defaultValue="忠孝東路四段..." />
                                            </div>
                                            <div className="text-end mt-4">
                                                <button type="button" className="btn btn-primary px-40 rounded-pill" onClick={() => toast.success('資訊已更新')}>確認儲存</button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {/* 2. 通知訊息 */}
                                {activeTab === 'messages' && (
                                    <div className="animate__animated animate__fadeIn">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <h4 className="fw-bold text-primary-600 mb-0 border-start border-4 border-primary ps-3">通知訊息</h4>
                                            <button className="btn btn-outline-primary btn-sm rounded-pill" onClick={() => toast.success('已全部標記為已讀')}>一鍵已讀</button>
                                        </div>
                                        {notificationsData.map((item) => (
                                            <div 
                                                key={item.id} 
                                                className={`p-3 mb-2 border-bottom cursor-pointer rounded-2 transition-all ${expandedId === item.id ? 'bg-primary-50' : 'bg-hover-light'}`}
                                                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                            >
                                                <div className="d-flex justify-content-between">
                                                    <span className={`fw-bold ${expandedId === item.id ? 'text-primary' : ''}`}>{item.title}</span>
                                                    <small className="text-muted">{item.date}</small>
                                                </div>
                                                <div className={`mt-2 fs-14 text-secondary ${expandedId === item.id ? '' : 'text-truncate'}`}>
                                                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                                                    {expandedId === item.id && item.link && (
                                                        <button className="btn btn-sm btn-primary mt-2">查看詳情</button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 3. 訂單資訊 */}
                                {activeTab === 'orders' && (
                                    <div className="animate__animated animate__fadeIn">
                                        <h4 className="fw-bold text-primary-600 mb-4 border-start border-4 border-primary ps-3">訂單資訊</h4>
                                        <div className="table-responsive">
                                            <table className="table align-middle">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>訂單編號</th>
                                                        <th>時間</th>
                                                        <th>狀態</th>
                                                        <th>合計</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.length > 0 ? orders.map(order => (
                                                        <tr key={order.id}>
                                                            <td className="text-primary fw-bold">#{order.id.slice(-7)}</td>
                                                            <td>{formatTime(order.create_at).date}</td>
                                                            <td><span className={`badge ${order.is_paid ? 'bg-success' : 'bg-warning'}`}>{order.is_paid ? '已付款' : '未付款'}</span></td>
                                                            <td className="fw-bold">${order.total.toLocaleString()}</td>
                                                        </tr>
                                                    )) : <tr><td colSpan="4" className="text-center py-4 text-muted">目前沒有訂單</td></tr>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* 4. 我的關注 */}
                                {activeTab === 'follow' && (
                                    <div className="animate__animated animate__fadeIn">
                                        <h4 className="fw-bold text-primary-600 mb-4 border-start border-4 border-primary ps-3">我的關注</h4>
                                        {displayFavorites.length > 0 ? (
                                            <div className="row g-3">
                                                {displayFavorites.map(product => (
                                                    <div className="col-6 col-lg-4" key={product.id}>
                                                        <div className="card h-100 rounded-4 overflow-hidden border-0 shadow-sm position-relative shadow-hover">
                                                            <button 
                                                                className="position-absolute top-0 end-0 m-2 btn btn-light btn-sm rounded-circle shadow-sm z-3"
                                                                onClick={() => toggleFavorite(product.id)}
                                                            >
                                                                <i className="bi bi-heart-fill text-danger"></i>
                                                            </button>
                                                            <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                                                                <img src={product.imageUrl} className="card-img-top object-fit-cover" style={{height: '150px'}} alt={product.title} />
                                                                <div className="card-body p-3">
                                                                    <h6 className="fw-bold mb-1 text-truncate">{product.title}</h6>
                                                                    <p className="small text-muted mb-0">{product.agency || '守護中途'}</p>
                                                                    <div className="text-primary fw-bold mt-2">${product.price?.toLocaleString()}</div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-5">
                                                <p className="text-muted mb-3">還沒有關注任何產品喔！</p>
                                                <Link to="/products" className="btn btn-outline-primary rounded-pill px-4">去逛逛</Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .nav-pills .nav-link.active { background-color: #primary-color; color: white; }
                .cursor-pointer { cursor: pointer; }
                .min-vh-50 { min-height: 50vh; }
                .shadow-hover { transition: transform 0.3s; }
                .shadow-hover:hover { transform: translateY(-5px); }
                .bg-hover-light:hover { background-color: #f8f9fa; }
                .transition-all { transition: all 0.2s ease; }
            `}</style>
        </>
    );
}

export default MemberCenter;