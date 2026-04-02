import PropTypes from 'prop-types'; // 🚩 修正 1：引入 PropTypes

function Pagination({ pagination, changePage }) {
  const handleClick = (event, page) => {
    event.preventDefault();
    changePage(page);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center"> {/* 🚩 建議加上置中樣式 */}
        {/* 上一頁 */}
        <li className={`page-item ${!pagination.has_pre ? 'disabled' : ''}`}>
          <a
            href="/"
            aria-label="Previous"
            className="page-link"
            onClick={(event) => handleClick(event, pagination.current_page - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        {/* 頁碼按鈕 */}
        {[...new Array(pagination.total_pages || 0)].map((_, i) => (
          <li className="page-item" key={`${i}_page`}>
            <a
              className={`page-link ${
                i + 1 === pagination.current_page ? 'active' : ''
              }`}
              href="/"
              onClick={(event) => handleClick(event, i + 1)}
            >
              {i + 1}
            </a>
          </li>
        ))}

        {/* 下一頁 */}
        <li className={`page-item ${!pagination.has_next ? 'disabled' : ''}`}>
          <a
            className="page-link"
            onClick={(event) => handleClick(event, pagination.current_page + 1)}
            href="/"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

// 🚩 修正 2：補齊型別驗證，消滅 react/prop-types 紅字
Pagination.propTypes = {
  pagination: PropTypes.shape({
    total_pages: PropTypes.number,
    current_page: PropTypes.number,
    has_pre: PropTypes.bool,
    has_next: PropTypes.bool,
    category: PropTypes.string,
  }).isRequired,
  changePage: PropTypes.func.isRequired,
};

export default Pagination;