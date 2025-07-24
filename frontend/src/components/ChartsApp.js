import { h } from "preact";
import htm from "htm";
import { useState, useEffect, useRef, useContext } from "preact/hooks";
import Chart from "chart.js/auto";

import { useCharts } from "../hooks/useCharts.js";
import { AccountContext } from "../context.js";
import { PieSvg, BarSvg } from "../Svgs.js";

const html = htm.bind(h);

function AccountChart({ type }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { chartData } = useCharts({ type });

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, chartData);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return html`
    <div
      class="chart-container"
      style="position: relative; height:${type === "pie"
        ? "300"
        : "300"}px; width:100%"
    >
      <canvas ref=${chartRef} width="400" height="300"></canvas>
    </div>
  `;
}

export function ChartsApp() {
  const [chartType, setChartType] = useState("bar");
  const { accounts } = useContext(AccountContext);

  return html`
    <p class="menu-label">graficos</p>
    <div class="tabs is-centered">
      <ul>
        <li class="${chartType === "bar" ? "is-active" : ""}">
          <a onClick=${() => setChartType("bar")}>
            <span
              href="#"
              class="icon"
              style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px;"
            >
              <${BarSvg} />
            </span>
            <span>Bars</span>
          </a>
        </li>

        <li class="${chartType === "pie" ? "is-active" : ""}">
          <a href="#" onClick=${() => setChartType("pie")}>
            <span
              class="icon is-small"
              style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px;"
            >
              <${PieSvg} />
            </span>
            <span>Pie</span>
          </a>
        </li>
      </ul>
    </div>

    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          ${!accounts[0] || !accounts
            ? html`<p>Sin cuentas aun.</p>`
            : html`<${AccountChart} type=${chartType} />`}
        </div>
      </div>
    </nav>
  `;
}
