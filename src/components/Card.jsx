import { useState } from "react";

export default function ProductCard() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="card product-card" style={{ maxWidth: 320 }}>
      {/* 圖片區 */}
      <div className="position-relative p-3">
        {/* 標籤 */}
        <div className="position-absolute top-0 start-0 m-2 d-flex gap-2">
          <span className="badge rounded-pill text-bg-warning">新品</span>
          <span className="badge rounded-pill text-bg-secondary">台灣專屬</span>
        </div>

        {/* 愛心 */}
        <button
          className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle"
          onClick={() => setLiked(!liked)}
        >
          {liked ? "❤️" : "🤍"}
        </button>
       

        <img
          src="./image/product-img"
          className="img-fluid"
          alt="台灣穿山甲吊飾"
        />
      </div>

      {/* 內容 */}
      <div className="card-body">
        <h6 className="fw-bold mb-1">台灣穿山甲吊飾</h6>
        <p className="text-muted small mb-2">台北市立動物園</p>

        <div className="mb-3">
          <span className="fw-bold fs-5">$500</span>
          <del className="text-muted ms-2">$650</del>
        </div>

        <button className="btn btn-outline-warning w-100">
          加入購物車
        </button>
      </div>
    </div>
  );
}
