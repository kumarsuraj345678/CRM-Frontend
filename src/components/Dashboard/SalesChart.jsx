import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function SalesChart({ data }) {
  const chartData = {
    labels: data?.map((d) => d.day),
    datasets: [
      {
        data: data?.map((d) => d.conversion),
        backgroundColor: "#d9d9d9",
        borderRadius: 6,
        barThickness: 14,
        categoryPercentage: 0.6,
        barPercentage: 0.6,
      },
    ],
  };

  const dashedGridPlugin = {
    id: "dashedGrid",
    beforeDraw: (chart) => {
      const { ctx, chartArea, scales } = chart;
      const yScale = scales.y;

      ctx.save();

      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = "#E5E7EB";

      yScale.ticks.forEach((tick) => {
        const y = yScale.getPixelForValue(tick.value);

        ctx.beginPath();
        ctx.moveTo(chartArea.left, y);
        ctx.lineTo(chartArea.right, y);
        ctx.stroke();
      });

      ctx.restore();
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#666",
          font: { size: 11 },
        },
      },

      y: {
        beginAtZero: true,
        max: 60,

        grid: {
          display: false,
        },

        border: {
          display: false,
        },

        ticks: {
          stepSize: 10,
          color: "#666",
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <div className="chart-box">
      <h3 className="chart-title">Sale Analytics</h3>

      <div className="chart-wrapper">
        <Bar data={chartData} options={options} plugins={[dashedGridPlugin]} />
      </div>
    </div>
  );
}
