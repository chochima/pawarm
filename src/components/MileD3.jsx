import React, { useRef, useEffect } from "react";

export default function D3PieChart({ data, width = 400, height = 400 }) {
  const ref = useRef();

  useEffect(() => {
    if (!window.d3) return;
    const d3 = window.d3;

    // 移除舊圖
    d3.select(ref.current).selectAll("*").remove();

    // svg 設定
    const radius = Math.min(width, height) / 2;
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // pie 生成 layout
    const pie = d3
      .pie()
      .value((d) => d.value);

    // arc generator
    const arc = d3.arc().outerRadius(radius).innerRadius(0);

    // data -> arcs
    const arcs = pie(data);

    // 畫弧形
    svg
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", arc)
      .append("title")
      .text((d) => `${d.data.name}: ${d.data.value}`);

    // labels
    svg
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("transform", (d) =>
        `translate(${arc.centroid(d)})`
      )
      .attr("text-anchor", "middle")
      .text((d) => d.data.name);

  }, [data, width, height]);

  return <div ref={ref}></div>;
}