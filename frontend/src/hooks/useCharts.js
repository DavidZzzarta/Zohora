import { AccountContext } from "../context.js";
import { useState, useEffect, useContext } from "preact/hooks";

import { backgroundColor, borderColor } from "../constants/chartColors.js";

export function useCharts({ type }) {
  const { accounts } = useContext(AccountContext);
  const [labels, setLabels] = useState();
  const [datasets, setDatasets] = useState();
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    setChartData({
      type,
      data: { labels, datasets },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Graficos de tu balance",
          },
          legend: {
            position: "top",
          },
        },
      },
    });
  }, [labels, datasets, type]);

  useEffect(() => {
    setLabels(accounts.map((e) => e.name));

    if (type === "pie") {
      setDatasets([
        {
          data: accounts.map((e) => e.current_balance),
          backgroundColor: backgroundColor.slice(0, accounts.length),
          borderColor: borderColor.slice(0, accounts.length),
          borderWidth: 1,
        },
      ]);
      return;
    }
    if (type === "bar") {
      setDatasets([
        {
          label: "Balance de Cuentas",
          data: accounts.map((e) => e.current_balance),
          backgroundColor: backgroundColor.slice(0, accounts.length),
          borderColor: borderColor.slice(0, accounts.length),
          borderWidth: 1,
        },
      ]);
      return;
    }
  }, [accounts, type]);

  return {
    chartData,
  };
}
