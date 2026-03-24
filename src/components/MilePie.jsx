import { useEffect, useRef, useState } from "react";

export default function MilePie() {
  const chartRef = useRef(null);

  const [active, setActive] = useState(null);
  const [openItem, setOpenItem] = useState(null); // accordion click 控制

  useEffect(() => {
    const chartHeight = window.innerWidth < 768 ? 300 : 400; // <768 為手機板

    chartRef.current = c3.generate({
    bindto: "#chart",

    data: {
      columns: [
        ["data1", 60],
        ["data2", 25],
        ["data3", 10],
        ["data4", 5]
      ],
      type: "donut",
      colors: {
        data1: "#B28440",
        data2: "#B0B0B0",
        data3: "#3D3D3D",
        data4: "#dbb54d"
      },
      onmouseover: function (d) {
        setActive(d.id);
      }
    },
    legend: {
      show: false  // 關閉下方顏色圖例
    }
  });

  const handleResize = () => {
    const newHeight = window.innerWidth < 768 ? 300 : 400;
    chartRef.current.resize({ height: newHeight });
  };
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);

}, []);

  const details = [
    {
      "id": 1,
      "title": "60% 飼料照護",
      "content":"本​項目資金​直接​用​於​合作​單位​的​日常​照護​支出，​包含野生​動物​專用​飼料​採購、​營養補​給品，​以及​餵食與​環境維護​所​需​的​耗材。​",
      "color":"#B28440"
    },
    {
      "id": 2,
      "title": "25% 醫療費用",
      "content": "本項目資金直接用於合作單位的醫療費用，包含野生動物的醫療檢查、治療、藥品及所需醫療耗材",
      "color":"#B0B0B0"
    },
    {
      "id": 3,
      "title": "10% 物資",
      "content": "本項目資金專用於提供合作單位必需物資，涵蓋醫療耗材、藥品、飼料與營養補給品，支持野生動物的健康管理與照護需求。",
      "color":"#3D3D3D"
    },
    {
      "id": 4,
      "title": "5% 行政支援",
      "content": "本項目資金專用於提供合作單位行政支援，包括人力管理、文件與報告處理、會議協調，以及物流與日常運作所需的行政費用，以保障項目順利執行。",
      "color":"#dbb54d"
    }
  ];

  return (
  <div className="row pt-20 pt-md-48 ">

  {/* chart */}
  <div className="col-md-6 px-40 py-40">
    <div id="chart"></div>
  </div>

  {/* accordion */}
  <div className="col-md-6 px-md-40 py-md-40">
    <div className="accordion accordion-flush" id="mileAccordion">
      {details.map((item, index) => {
        const isOpen =
        (active === `data${index + 1}` && active !== null) ||
        openItem === index;

        return (
          <div className="accordion-item border-0" key={item.id}>
            <h2 className="accordion-header">
              <button
                type="button"
                aria-expanded={isOpen}
                className={`accordion-button ${!isOpen ? "collapsed" : ""}`}
                onClick={() =>
                  setOpenItem(openItem === index ? null : index)
                }
              >
                <span
                  className="color-dot"
                  style={{backgroundColor: item.color,}}></span>
                <span className="title-text-H3 ps-12">{item.title}</span>
              </button>
            </h2>

            <div
              className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
            >
              <div className="accordion-body body-text">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>

</div>
  );
}