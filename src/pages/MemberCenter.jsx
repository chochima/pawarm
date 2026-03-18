
import axios from "axios";
import { useState ,useEffect } from "react";
import { NavLink } from 'react-router-dom';
import '../style/_fonts.scss';
import "../style/all.scss";
import notifications from '../data/notifications.json';
const API_BASE = import.meta.env.VITE_URL;
const API_PATH = import.meta.env.VITE_PATH;



function MemberCenter(){
    const [expandedId, setExpandedId] = useState(null);
    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000); // Unix Timestamp 是秒，Date 需要毫秒
        return {
            date: date.toLocaleDateString(), 
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
        };
    };
    const [orders, setOrders] = useState([]);
    const handleLogout = () => {
        toast((t) => (
            <span>
                <b className="fs-24">您確定要登出了嗎？</b>
                <div className="mt-2 d-flex justify-content-center gap-8" >
                    <button
                        className="btn btn-sm btn-danger me-2 fs-20 px-16 text-white"
                        onClick={() => {
                            // 執行登出邏輯
                            toast.dismiss('logout-confirm');

                            document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                            toast.success("已成功登出", { duration: 2000 });
                            setTimeout(() => {
                                toast.dismiss();
                                navigate('/');
                            }, 1000);
                        }}
                    >確定</button>
                    <button
                        className="btn btn-sm btn-secondary fs-20 px-16"
                        onClick={() => toast.dismiss(t.id)} // 點擊取消就關閉
                    >
                        取消
                    </button>
                </div>
            </span>
        ), {
            id: 'logout-confirm',
            duration: Infinity, // 顯示 10 秒
            position: 'top-center',
        });
    };
    // const autoLogin = async () =>{
    //     try {
    //         // e.preventDefault();
    //         const response = await axios.post(`${API_BASE}/admin/signin`,formData)
    //         console.log(response.data);
    //         const { token, expired} = response.data;
    //         document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
    //         axios.defaults.headers.common['Authorization'] = token;
    //         getOrders();


    //     } catch (error) {
    //         // setIsAuth(false);
    //         console.log(error.response)
    //     }
    // }
    const getOrders = async ()=>{
        try {
        const response = await axios.get(`${API_BASE}/api/${API_PATH}/admin/orders`)
        
        // console.log('訂單內容:',response.data)
        if (response.data.success) {
                setOrders(response.data.orders); 
            }

        } catch (error) {
        console.log(error.response);
        }
        
    };

// 2. 加入這段 JS 邏輯
    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("hexToken="))
            ?.split("=")[1];
        if (token){
            axios.defaults.headers.common['Authorization'] = token;
            getOrders();
        } else{
            autoLogin();
        }



        // const initNotificationToggle = () => {
        //     const previews = document.querySelectorAll('.content-preview');
            
        //     previews.forEach((item) => {
        //         // 使用 onclick 確保邏輯簡單直接
        //         item.onclick = function() {
        //             if (this.classList.contains('collapsed')) {
        //                 this.classList.remove('collapsed');
        //                 this.classList.add('expanded');
        //             } else {
        //                 this.classList.remove('expanded');
        //                 this.classList.add('collapsed');
        //             }
        //         };
        //     });
        // };
        // // 稍微延遲一下，確保 Tab 切換產生的內容也能被抓到
        // const timer = setTimeout(initNotificationToggle, 300);

        // return () => clearTimeout(timer); // 清除定時器


    }, []); // 空陣列表示只在組件載入時執行一次


    return(
        <>
        <h1 className="text-center">會員中心</h1>
        <div className="bg-primary-100">
            <div className="container py-40">
                <div className="row g-24">
                    {/* 左側選單*/}
                    <div className="col-md-4 bg-primary-50">
                        <div className="d-flex align-items-center justify-content-space py-32 px-24 gap-16 mb-16">
                        <div className="ratio ratio-1x1 shadow me-12" style={{ width: '150px' }}>
                            <img src="src\image\track-img\leopard-cat-description-1.png" alt="user avatar" className="img-fluid w-100 h-100 object-fit-cover"/>
                        </div>
                        <div className="text-center">
                            <h4 className="fs-24 mb-32">Lynn</h4>
                            <p className="mb-0 text-muted fs-14">LV.5 銀牌守護者</p>
                        </div>
                        </div>

                        <div className="nav flex-row flex-md-column justify-content-center nav-pills" id="v-pills-tab" role="tablist"
                        aria-orientation="vertical">
                            <button className="col-3 col-md-12 nav-link active fs-mb-20 rounded-0 p-16 user-left-list" id="v-pills-user-tab"
                                data-bs-toggle="pill" data-bs-target="#v-pills-user" type="button" role="tab"
                                aria-controls="v-pills-user" aria-selected="true">個人資訊</button>
                            <button className="col-3 col-md-12 nav-link fs-mb-20 rounded-0 p-16 user-left-list" id="v-pills-messages-tab"
                                data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab"
                                aria-controls="v-pills-messages" aria-selected="false">通知訊息</button>
                            <button className="col-3 col-md-12 nav-link fs-mb-20 rounded-0 p-16 user-left-list" id="v-pills-orders-tab"
                                data-bs-toggle="pill" data-bs-target="#v-pills-orders" type="button" role="tab"
                                aria-controls="v-pills-orders" aria-selected="false">訂單資訊</button>
                            <button className="col-3 col-md-12 nav-link fs-mb-20 rounded-0 p-16 user-left-list  " id="v-pills-follow-tab"
                                data-bs-toggle="pill" data-bs-target="#v-pills-follow" type="button" role="tab"
                                aria-controls="v-pills-follow" aria-selected="false">我的關注</button>
                            <a href="#" className="text-decoration-none">
                                <button className="col-3 col-md-12 nav-link fs-mb-5 rounded-0 p-4 user-left-list mb-md-4 w-100"
                                type="button">登出</button></a>
                        </div>
                    </div>
                    {/* 右側選單*/}
                    <div className="col-md-8">
                        <div className="tab-content user-right-content pt-md-0" id="v-pills-tabContent">
                            {/* 個人資訊*/}
                            <div className="tab-pane fade show active" id="v-pills-user" role="tabpanel"
                                aria-labelledby="v-pills-user-tab" tabIndex="0">
                                <div className="bg-white p-20" style={{ borderRadius: '16px' }}>

                                <h4 className="mb-32 fs-24 fw-700 text-primary-600">個人資訊</h4>
                                <div>
                                    <form action="">
                                    {/* 使用者名稱*/}
                                    <div className="mb-16">
                                        <label htmlFor="userName" className="form-label fs-16 mb-8 fw-700 text-black">使用者名稱</label>
                                        <input type="text" className="form-control w-auto rounded-4" id="userName" placeholder="使用者名稱" defaultValue="Lynn"/>
                                    </div>
                                    {/* 密碼*/}
                                    <div className="mb-16">
                                        <label htmlFor="userPassword" className="form-label fs-16 mb-8 fw-700 text-black">密碼</label>
                                        <div className="d-flex align-items-center">
                                        <input type="password" className="form-control w-auto me-24 rounded-4" id="userPassword" placeholder="密碼"
                                            defaultValue="********"/>
                                        <a href="#" className="text-danger fs-14 underline-link">修改密碼</a>
                                        </div>
                                    </div>
                                    {/* email(唯獨)*/}

                                    <div className="mb-16">
                                        <label htmlFor="userEmail" className="form-label fs-16 mb-8 fw-700 text-black">email 信箱</label>
                                        <input type="email" className="form-control-plaintext w-auto text-secondary-400" id="userEmail"
                                        placeholder="用戶信箱" value="dooogie234@gmail.com" readOnly/>
                                    </div>
                                    {/* 手機*/}
                                    <div className="mb-16">
                                        <label htmlFor="userPhone" className="form-label fs-16 mb-8 fw-700 text-black">手機</label>
                                        <input type="tel" className="form-control w-auto rounded-4" id="userPhone" placeholder="手機號碼"
                                        defaultValue="0912-345678"/>
                                    </div>
                                    {/* 生日*/}
                                    <div className="mb-md-16 mb-24">
                                        <label htmlFor="userBirth" className="form-label fs-16 mb-8 fw-700 text-black">生日</label>
                                        <input type="date" className="form-control w-auto rounded-4" id="userBirth"/>
                                    </div>
                                    {/* 儲存按鈕*/}
                                    <div className="text-end">
                                        <button type="submit" className="btn btn-danger px-24 text-white rounded-3 me-md-80 ">確認儲存</button>
                                    </div>
                                    </form>
                                </div>

                                </div>

                            </div>
                            {/* 通知訊息 */}
                            <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabIndex="0">
                            <div className="bg-white" style={{ borderRadius: '16px' }}>
                                <div>
                                {/* header (隱藏)*/}
                                <div className="d-flex justify-content-between align-items-center p-24 d-none">
                                    <div className="d-flex align-items-center gap-8">
                                    <div className="fs-16 fw-bold text-primary-600">通知訊息</div>
                                    <div>
                                        <a href="#" className="p-12 text-primary-700 bg-primary-400 text-decoration-none sm-btn fs-14 fw-medium" style={{ borderRadius: '16px' }}>
                                        一鍵已讀
                                        </a>
                                    </div>
                                    </div>

                                    <div className="d-flex align-items-center gap-8">
                                    <div>通知類別</div>
                                    <div>
                                        <select className="form-select form-select-lg fs-14" aria-label=".form-select-lg example" style={{ borderRadius: '100px' }} defaultValue="全部內容">
                                        <option>全部內容</option>
                                        <option value="訂單與領養">訂單與領養</option>
                                        <option value="會員活動與優惠">會員活動與優惠</option>
                                        <option value="系統與帳號">系統與帳號</option>
                                        </select>
                                    </div>
                                    </div>
                                </div>

                                {/* NEW header */}
                                <div className="container p-24">
                                    <div className="row d-lg-flex justify-content-between gy-3">
                                    <div className="col-12 col-lg-6 d-flex align-items-center gap-8">
                                        <span className="fs-16 fw-bold text-primary-600">通知訊息</span>
                                        <a href="#" className="px-12 py-4 text-primary-700 bg-primary-100 text-decoration-none sm-btn fs-14 fw-medium" style={{ borderRadius: '10px' }}>
                                        一鍵已讀
                                        </a>
                                    </div>

                                    <div className="col-12 col-lg-6 d-lg-flex align-items-center justify-content-end ps-2">
                                        <div className="col-auto">
                                        <select className="form-select form-select-lg fs-14" aria-label=".form-select-lg example" style={{ borderRadius: '100px' }} defaultValue="全部內容">
                                            <option>全部內容</option>
                                            <option value="訂單與領養">訂單與領養</option>
                                            <option value="會員活動與優惠">會員活動與優惠</option>
                                            <option value="系統與帳號">系統與帳號</option>
                                        </select>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                {/* END NEW header */}

                                {/* content */}
                                <div className="p-24">
                                    {notifications.map((item) => (
                                        <div className="py-16 border-bottom" key={item.id}>
                                        <div className="d-md-flex justify-content-between align-items-center">
                                            <div className="fw-bold fs-16 text-primary-600 lh-sm">{item.title}</div>
                                            <div className="fw-medium text-secondary-400 lh-base">{item.date}</div>
                                        </div>

                                        <div className="text-secondary-600">
                                            <div
                                            className={`content-preview pt-4 pb-6 lh-base fw-medium fs-6 ${
                                                expandedId === item.id ? 'expanded' : 'collapsed'
                                            }`}
                                            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                            >
                                            <div dangerouslySetInnerHTML={{ __html: item.content }} />
                                            
                                            {expandedId === item.id && item.action_text && (
                                                <div className="mt-3 d-flex">
                                                <a 
                                                    href={item.link} 
                                                    className="p-2 bg-primary-100 text-primary-700 text-decoration-none sm-btn rounded-3 " 
                                                    onClick={(e) => e.stopPropagation()} // 阻止冒泡，避免點按鈕時又把內容縮回去
                                                >
                                                    {item.action_text}
                                                </a>
                                                </div>
                                            )}
                                            </div>
                                        </div>
                                        </div>
                                    ))}
                                </div>


                                {/* footer */}
                                <div className="d-flex justify-content-end fs-5 px-4 py-5 bg-white" style={{ borderBottomRightRadius: '16px', borderBottomLeftRadius: '16px' }}></div>
                                </div>
                            </div>
                            </div>
                            {/* 訂單資訊 */}
                            <div className="tab-pane fade" id="v-pills-orders" role="tabpanel" aria-labelledby="v-pills-orders-tab" tabIndex="0">
                                <div className="bg-white" style={{ borderRadius: '16px' }}>
                                    <div className=" ">
                                    <div className="d-flex justify-content-between align-items-center p-24">
                                        <div className="fs-24 fw-bold text-primary-600">訂單資訊</div>
                                        <div className="d-flex align-items-center gap-8">
                                        <div className="d-none">篩選</div>
                                        <div>
                                            <select 
                                            className="form-select form-select-lg fs-14" 
                                            aria-label=".form-select-lg example"
                                            style={{ borderRadius: '100px' }}
                                            defaultValue="0"
                                            >
                                            <option value="0">3個月內</option>
                                            <option value="1">6個月內</option>
                                            <option value="2">1年內</option>
                                            </select>
                                        </div>
                                        </div>
                                    </div>
                                    <div>
                                        <table className="table align-middle mb-0 table-borderless">
                                        <thead>
                                            <tr className="text-center">
                                            <th className="bg-primary-50 py-16 text-secondary-800 fs-16 fw-500">訂單編號</th>
                                            <th className="bg-primary-50 py-16 text-secondary-800 fs-16 fw-500">訂單時間</th>
                                            <th className="bg-primary-50 py-16 text-secondary-800 fs-16 fw-500">訂單狀態</th>
                                            <th className="bg-primary-50 py-16 text-secondary-800 fs-16 fw-500">付款狀態</th>
                                            <th className="bg-primary-50 py-16 text-secondary-800 fs-16 fw-500">合計</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { orders.length > 0 ? (
                                                orders.map((order)=>{
                                                    const orderTime = formatTime(order.create_at);//轉換時間
                                                    return (
                                                        <tr className="text-center" key={order.id}>
                                                            <td className="py-lg-16">
                                                                <a href="#" className="text-decoration-none fw-bold text-primary-600 order">{order.id.slice(-7)}</a>
                                                            </td>
                                                            <td>
                                                                <div className="text-secondary-400 fw-medium">{orderTime.date}</div>
                                                                <div className="text-secondary-400 fw-medium">{orderTime.time}</div>
                                                            </td>
                                                            <td>{order.is_paid ? "處理中" : "待處理"}</td>
                                                            <td>
                                                                <span className={order.is_paid ? "text-success" : "text-danger"}>
                                                                    {order.is_paid ? "已付款" : "未付款"}
                                                                </span>
                                                            </td>
                                                            <td className="text-danger fw-medium">${order.total.toLocaleString()}</td>
                                                        </tr>
                                                    )
                                                })
                                            ):(
                                                <tr>
                                                    <td colSpan="5" className="text-center py-5 text-secondary-400">
                                                        目前沒有訂單資料
                                                    </td>
                                                </tr>
                                            )

                                            }
                                        </tbody>
                                        </table>

                                        <div 
                                        className="d-flex justify-content-end fs-5 px-4 py-5 bg-white"
                                        style={{ borderBottomRightRadius: '16px', borderBottomLeftRadius: '16px' }}
                                        >
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            {/* 我的關注 */}
                            <div className="tab-pane fade" id="v-pills-follow" role="tabpanel" aria-labelledby="v-pills-follow-tab" tabIndex="0">
                            <div className="bg-white" style={{ borderRadius: '16px' }}>
                                <div>
                                {/* header */}
                                <div className="d-flex justify-content-between align-items-center p-24">
                                    <div>
                                    <div className="fs-24 fw-bold text-primary-600">我的收藏</div>
                                    </div>

                                    <div className="d-flex align-items-center gap-8">
                                    <div className="">順序</div>
                                    <div>
                                        <select 
                                        className="form-select form-select-lg fs-8" 
                                        aria-label=".form-select-lg example"
                                        style={{ borderRadius: '100px' }}
                                        defaultValue="由新至舊"
                                        >
                                        <option value="由新至舊">新至舊</option>
                                        <option value="舊至新">舊至新</option>
                                        </select>
                                    </div>
                                    </div>
                                </div>

                                {/* content */}
                                <div className="p-24">
                                    <ul className="nav nav-tabs mb-12" id="favTabs" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pets-tab" data-bs-toggle="tab" data-bs-target="#pets" type="button" role="tab">
                                        寶貝
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="org-tab" data-bs-toggle="tab" data-bs-target="#org" type="button" role="tab">
                                        機構
                                        </button>
                                    </li>
                                    </ul>

                                    {/* Tab 內容 */}
                                    <div className="tab-content">
                                    {/* 寶貝 */}
                                    <div className="tab-pane fade show active" id="pets" role="tabpanel">
                                        <div className="container scroll-area">
                                            <div className="row g-16">
                                                {/* 卡片：阿橘橘 */}
                                                <div className="col-md-4 col-12">
                                                    <div className="card border-primary rounded-4" >
                                                        <img src="src\image\pet_4_阿橘橘.jpg" alt="#" className="w-100 h-155 rounded-4" style={{ position: 'relative' }} />
                                                        <img src="src\image\love-fill.svg" alt="heat" style={{ position: 'absolute', top: '10px', right: '10px' }} />
                                                        <div className="card-body">
                                                        <div className="text-center py-12">
                                                            <div className="fw-bold fs-28 text-primary-600 lh-sm pb-2">阿橘橘</div>
                                                            <div className="fw-medium fs-16 text-secondary-800 lh-sm">喵了個咪中途之家</div>
                                                        </div>
                                                        <div className="d-flex justify-content-between text-center gap-8">
                                                            <div className="fw-medium fs-md-12 fs-14 px-md-8 py-8 px-16 bg-primary-200 text-primary-700 rounded-4">新北市</div>
                                                            <div className="fw-medium fs-md-12 fs-14 px-md-8 py-8 px-16 bg-primary-200 text-primary-700 rounded-4">已結紮</div>
                                                            <div className="fw-medium fs-md-12 fs-14 px-md-8 py-8 px-16 bg-primary-200 text-primary-700 rounded-4">可領養</div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 卡片：阿財 */}
                                                <div className="col-md-4 col-12">
                                                    <div className="card border-primary rounded-4">
                                                        <img src="src\image\pet_3_阿財.png" alt="#" className="w-100 h-155 rounded-4" style={{ position: 'relative' }} />
                                                        <img src="src\image\love-fill.svg" alt="heat" style={{ position: 'absolute', top: '10px', right: '10px' }} />
                                                        <div className="card-body">
                                                        <div className="text-center py-12">
                                                            <div className="fw-bold fs-28 text-primary-600 lh-sm pb-2">阿財</div>
                                                            <div className="fw-medium fs-16 text-secondary-800 lh-sm">毛茸茸中途咖啡</div>
                                                        </div>
                                                        <div className="d-flex justify-content-between text-center gap-8">
                                                            <div className="fw-medium fs-md-12 fs-14 px-md-8 py-8 px-16 bg-primary-200 text-primary-700 rounded-4" >新北市</div>
                                                            <div className="fw-medium fs-md-12 fs-14 px-md-8 py-8 px-16 bg-primary-200 text-primary-700 rounded-4" >已結紮</div>
                                                            <div className="fw-medium fs-md-12 fs-14 px-md-8 py-8 px-16 bg-primary-200 text-primary-700 rounded-4" >可領養</div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>

                                    {/* 機構 */}
                                    <div className="tab-pane fade" id="org" role="tabpanel">
                                        <div className="container scroll-area">
                                        <div className="row g-16">
                                            {/* 機構卡片範例 */}
                                            <div className="col-lg-4 col-6">
                                                <div className="card border-primary rounded-4">
                                                <img src="src\image\dog and doctor 1.jpg" alt="#" className="w-100 rounded-4"
                                                    style={{ position: 'relative', height: 200, objectFit: 'cover', overflow: 'hidden' }}/>
                                                <img src="src\image\love-fill.svg" alt="heat"
                                                    style={{ position: 'absolute', top: '10px', right: '10px' }}/>
                                                <div className="card-body">
                                                    <div className="text-center ">

                                                    <div className="fw-bold fs-lg-24 fs-18 text-primary-600 lh-base">毛寶寶基金會</div>
                                                    </div>

                                                </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-6">
                                                <div className="card border-primary rounded-4">
                                                <img src="src\image\pet with people.jpg" alt="#" className="w-100 rounded-4"
                                                    style={{ position: 'relative', height: 200, objectFit: 'cover', overflow: 'hidden' }}/>
                                                <img src="src\image\love-fill.svg" alt="heat"
                                                    style={{ position: 'absolute', top: '10px', right: '10px' }}/>
                                                <div className="card-body">
                                                    <div className="text-center ">

                                                    <div className="fw-bold fs-lg-24 fs-18 text-primary-600 lh-base">喵了個咪中途之家</div>
                                                    </div>

                                                </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-6">
                                                <div className="card border-primary rounded-4">
                                                <img src="src\image\vet.jpg" alt="#" className="w-100 rounded-4"
                                                    style={{ position: 'relative', height: 200, objectFit: 'cover', overflow: 'hidden' }}/>
                                                <img src="src\image\love-fill.svg" alt="heat"
                                                    style={{ position: 'absolute', top: '10px', right: '10px' }}/>
                                                <div className="card-body">
                                                    <div className="text-center ">

                                                    <div className="fw-bold fs-lg-24 fs-18 text-primary-600 lh-base">小腳印之家</div>
                                                    </div>

                                                </div>
                                                </div>
                                            </div>
                                            {/* 其他機構卡片以此類推... */}
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                {/* footer */}
                                <div 
                                className="d-flex justify-content-end fs-5 px-4 py-5 bg-white"
                                style={{ borderBottomRightRadius: '16px', borderBottomLeftRadius: '16px' }}
                                >
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>

        
    )
}
export default MemberCenter;