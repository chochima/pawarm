import { Outlet } from "react-router";
import { useNavigate } from "react-router";
const  Backstage=()=>{
    const navigate = useNavigate();
    return(
        <>
        <h1 className="text-center">後台頁面</h1>
        <div className="container py-60">
            <div className="row">
                <div className="col-3">
                <button
                className="btn btn-primary"
                onClick={() => navigate("/")}
              >
                首頁
              </button>
              </div>
                <div className="col-3">
                <button
                className="btn btn-primary "
                onClick={() => navigate("/backstage/products")}
              >
                產品
              </button>
                </div>
              <div className="col-3">
                <button
                className="btn btn-primary "
                onClick={() => navigate("/backstage/coupon")}
              >
                Coupon
              </button>
              </div>

              <div className="col-3">
                <button
                className="btn btn-primary "
                onClick={() => navigate("/backstage/order")}
              >
                Order
              </button>
              </div>
              
            </div>
              
        </div>


        <Outlet/>


        </>
    )
}
export default Backstage;