import { useCart } from "../hook/useCart";
import { currency } from "../utils/filter";
import CheckoutStepper from "../components/Stepper";
import PartnerSection from "../components/RelatedSection";
import MechanismLogos from "../components/MechanismLogos";
import CartList from "../components/CartList";
import CartSummary from "./CartSummary";// 記得把右側 Summary 也拆出去

const mechanismImages = [
  { name: '台北市立動物園', imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771161922826.png" },
  { name: 'WildOne 野灣', imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771162111383.png" },
  { name: '機構3', imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771163906842.png" },
  { name: '機構4', imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771163947004.png" },
  { name: '機構5', imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771164038605.png" },
  { name: '機構6', imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771164084617.png" },
  { name: '機構7', imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771164103587.png" },
  { name: '機構8', imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771164129948.png" }
];

const Carts = () => {
  const logic = useCart();

  return (
    <>
      <div className="container my-5 overflow-hidden">
        <CheckoutStepper />

        <div className="row gx-60">
          {/* 左側：守護清單 */}
          <CartList 
            cart={logic.cart}
            currency={currency}
            updateCart={logic.updateCart}
            deleteCart={logic.deleteCart}
            handleMoveToWishlist={logic.handleMoveToWishlist}
            isUpdating={logic.isUpdating}
          />

          {/* 右側：守護計畫摘要 */}
          <CartSummary 
            cart={logic.cart}
            currency={currency}
            isLogin={logic.isLogin}
            couponCode={logic.couponCode}
            setCouponCode={logic.setCouponCode}
            applyCoupon={logic.applyCoupon}
            removeCoupon={logic.removeCoupon}
          />
        </div>
      </div>

      <PartnerSection 
        randomProducts={logic.randomProducts}
        favorites={logic.favorites}
        toggleFavorite={logic.toggleFavorite}
        handleAdd={logic.handleAdd} 
        isAdding={logic.isAdding}
      />
      
      <MechanismLogos mechanismImages={mechanismImages} />
    </>
  );
};

export default Carts;