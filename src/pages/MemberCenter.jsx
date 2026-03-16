
import axios from "axios";
import { useState ,useEffect } from "react";
import { NavLink } from 'react-router-dom';
import '../style/_fonts.scss';
import "../style/all.scss";
const API_BASE = import.meta.env.VITE_URL;
const API_PATH = import.meta.env.VITE_PATH;



function MemberCenter(){
    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000); // Unix Timestamp 是秒，Date 需要毫秒
        return {
            date: date.toLocaleDateString(), 
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
        };
    };
    const [orders, setOrders] = useState([]);
    const [formData, setFormData] = useState({
        username:"pawarm@gmail.com",
        password:"pawarm"
    });
    const autoLogin = async () =>{
        try {
            // e.preventDefault();
            const response = await axios.post(`${API_BASE}/admin/signin`,formData)
            console.log(response.data);
            const { token, expired} = response.data;
            document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
            axios.defaults.headers.common['Authorization'] = token;
            getOrders();


        } catch (error) {
            // setIsAuth(false);
            console.log(error.response)
        }
    }
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



        const initNotificationToggle = () => {
            const previews = document.querySelectorAll('.content-preview');
            
            previews.forEach((item) => {
                // 使用 onclick 確保邏輯簡單直接
                item.onclick = function() {
                    if (this.classList.contains('collapsed')) {
                        this.classList.remove('collapsed');
                        this.classList.add('expanded');
                    } else {
                        this.classList.remove('expanded');
                        this.classList.add('collapsed');
                    }
                };
            });
        };
        // 稍微延遲一下，確保 Tab 切換產生的內容也能被抓到
        const timer = setTimeout(initNotificationToggle, 300);

        return () => clearTimeout(timer); // 清除定時器


    }, []); // 空陣列表示只在組件載入時執行一次


    return(
        <>
        <h1>會員中心</h1>
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
                                    <div className="py-16">
                                        <div className="d-md-flex justify-content-between align-items-center">
                                            <div className="fw-bold fs-16 text-primary-600 lh-sm">📣訂單更新</div>
                                            <div className="fw-medium text-secondary-400 lh-base">2024-08-18</div>
                                        </div>
                                        <div className="text-secondary-600">
                                            <div className="content-preview collapsed pt-4 pb-6 lh-base fw-medium fs-6">
                                            您的訂單<a href="#" className="text-decoration-none">#4081846</a> 已成功付款，您的愛心已透過雲端送達牠的身邊。
                                            <br /><br />
                                            若有任何訂單問題或需求，歡迎隨時聯繫客服，我們將竭誠為您服務。謝謝您與My-Shelter一起守護每一位毛寶貝的幸福！
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-16">
                                    <div className="d-md-flex justify-content-between align-items-center">
                                        <div className="fw-bold fs-16 text-primary-600 lh-sm">📣領養審核通過</div>
                                        <div className="fw-medium text-secondary-400 lh-base">2024-08-16</div>
                                    </div>
                                    <div className="text-secondary-600">
                                        <div className="content-preview collapsed pt-4 pb-6 lh-base fw-medium fs-6">
                                        恭喜！您申請領養的「蹲蹲」已通過初步審核，所屬機構將於7日內與您聯繫，請配合
                                        <br /><br />
                                        機構完成後續領養程序。
                                        <br /><br />
                                        接下來，所屬機構將安排後續的領養流程與訪視時間。請您保持電話暢通並留意相關訊息，以便順利完成領養手續。
                                        <br /><br />
                                        如有任何問題，歡迎隨時與我們聯繫。祝您與新夥伴生活愉快！
                                        <br /><br />
                                        謝謝您對動物的愛心與支持！
                                        <br />
                                        My-Shelter 敬上
                                        </div>
                                    </div>
                                    </div>

                                    <div className="py-16">
                                    <div className="d-md-flex justify-content-between align-items-center">
                                        <div className="fw-bold fs-16 text-primary-600 lh-sm">🎁生日快樂！為你送上生日祝福</div>
                                        <div className="fw-medium text-secondary-400 lh-base">2024-08-13</div>
                                    </div>
                                    <div className="text-secondary-600">
                                        <div className="content-preview collapsed pt-4 pb-6 lh-base fw-medium fs-6">
                                        生日快樂！
                                        <br /><br />
                                        My-Shelter為您送上NT$100優惠券，讓我們一起透過雲端為寶貝傳遞愛心！🎉🎂
                                        <br /><br />
                                        感謝您一直以來對毛寶貝們的關懷與支持，這份小小的心意希望能為您的生日增添一點溫暖與喜悅。
                                        <br /><br />
                                        在結帳時使用優惠券即可享有$100折扣優惠。
                                        <br /><br />
                                        優惠券有效期限至2024-09-13，一起向毛寶貝們分享這份喜悅吧！
                                        <div className="my-6">
                                            <a href="index.html" className="p-2 bg-primary-400 text-primary-700 text-decoration-none sm-btn" style={{ borderRadius: '4px' }}>
                                            【分享喜悅】
                                            </a>
                                        </div>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="py-16">
                                    <div className="d-md-flex justify-content-between align-items-center">
                                        <div className="fw-bold fs-16 text-primary-600 lh-sm">🏆等級升級</div>
                                        <div className="fw-medium text-secondary-400 lh-base">2024-08-09</div>
                                    </div>
                                    <div className="text-secondary-600">
                                        <div className="content-preview collapsed pt-4 pb-6 lh-base fw-medium fs-6">
                                        恭喜您！您的會員等級已升級為「Lv.5銀牌守護者」，感謝您持續的支持與愛心，
                                        <br /><br />
                                        讓更多寶貝們感受到世界的溫暖與關懷。🐾💖
                                        <br /><br />
                                        身為銀牌守護者，您將享有更多專屬福利與驚喜禮遇，未來也請繼續與我們一同守護這些可愛的小生命！
                                        <br /><br />
                                        感謝您為寶貝的愛心與對我們的信任！
                                        <br />
                                        My-Shelter 敬上
                                        </div>
                                    </div>
                                    </div>

                                    <div className="py-16">
                                    <div className="d-md-flex justify-content-between align-items-center">
                                        <div className="fw-bold fs-16 text-primary-600 lh-sm">📣寶貝影片來囉！</div>
                                        <div className="fw-medium text-secondary-400 lh-base">2024-07-29</div>
                                    </div>
                                    <div className="text-secondary-600">
                                        <div className="content-preview collapsed pt-4 pb-6 lh-base fw-medium fs-6">
                                        訂單 <a href="#" className="text-decoration-none">#2068439 </a>感謝您支援「幼貓疫苗接種協助-幼貓疫苗(三合一)」
                                        <br /><br />
                                        所屬機構「喵了個咪中途之家」已經將您的回饋影片上傳囉🎥🐾
                                        <br /><br />
                                        點擊下方連結，感受這些毛孩子滿滿的活力與幸福瞬間吧！
                                        <div className="my-6">
                                            <a href="index.html" className="p-2 bg-primary-400 text-primary-700 text-decoration-none sm-btn" style={{ borderRadius: '4px' }}>
                                            【觀看影片】
                                            </a>
                                        </div>
                                        <br />
                                        未來也讓我們一起陪伴寶貝們走過每一步，傳遞更多溫暖。
                                        <br />
                                        My-Shelter 敬上
                                        </div>
                                    </div>
                                    </div>

                                    <div className="py-16">
                                    <div className="d-md-flex justify-content-between align-items-center">
                                        <div className="fw-bold fs-16 text-primary-600 lh-sm">⚙️系統通知</div>
                                        <div className="fw-medium text-secondary-400 lh-base">2024-07-25</div>
                                    </div>
                                    <div className="text-secondary-600">
                                        <div className="content-preview collapsed pt-4 pb-6 lh-base fw-medium fs-6">
                                        為了提升服務品質，我們將於【2024-07-26】進行系統維護作業。
                                        <br /><br />
                                        屆時平台部分功能可能暫時無法使用，造成不便敬請見諒。
                                        <br /><br />
                                        <span className="text-secondary-900">
                                            維護時間：
                                            <br />
                                            2024-07-26 12:00至2024-07-26 14:00
                                        </span>
                                        <br /><br />
                                        期間如有緊急問題，請透過客服信箱或電話與我們聯繫，我們將盡快為您處理。感謝您的理解與支持，期待維護後為您帶來更流暢的使用體驗！
                                        <br /><br />
                                        My-Shelter 敬上
                                        </div>
                                    </div>
                                    </div>
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