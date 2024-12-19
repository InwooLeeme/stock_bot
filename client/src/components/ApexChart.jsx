import ApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import axios from "axios";

const Chart = ({ theme }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getChartData = async () => {
    const { data } = await axios.get("http://localhost:5000/api/chart");
    const json = data;
    const result = json.splice(1);
    const default_ONEYEAR_DATA = result.splice(0, 246);

    setChartData(default_ONEYEAR_DATA);
    setLoading(false);
  };
  useEffect(() => {
    getChartData();
  }, []);

  return isLoading ? (
    <h1>isLoading...</h1>
  ) : (
    <ApexChart
      type="candlestick"
      height="500"
      series={[
        {
          data: chartData.map((item) => {
            return [
              item.date,
              Number(item.opening_price.split(",").join("")),
              Number(item.high_price.split(",").join("")),
              Number(item.low_price.split(",").join("")),
              Number(item.closing_price.split(",").join("")),
            ];
          }),
        },
      ]}
      options={{
        theme: {
          mode: theme,
        },
        chart: {
          toolbar: { show: true },
          background: "transparent",
        },
        stroke: { curve: "smooth", width: 1 },
        grid: {
          show: true,
          borderColor: theme === "light" ? "black" : "white",
        },
        yaxis: { show: true },
        xaxis: {
          labels: {
            show: true,
            datetimeFormatter: {
              day: "yyyy.MM.dd",
            },
            axisBorder: {
              color: "black",
            },
          },
          axisTicks: { show: true },
          axisBorder: {
            show: true,
            color: theme === "light" ? "black" : "white",
          },
          type: "datetime",
        },
      }}
    ></ApexChart>
  );
};

export default Chart;
