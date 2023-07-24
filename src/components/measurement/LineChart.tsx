import { ChartProps, Line } from "react-chartjs-2";
import {
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  registerables,
} from "chart.js";

ChartJS.register(...registerables);

const lineOptions: ChartOptions<"line"> = {
  scales: {
    x: {
      title: {
        display: true,
        text: "HZs",
      },
      position: "top",
    },
    y: {
      title: {
        display: true,
        text: "DB",
      },
      min: -10,
      max: 120,
      reverse: true,
      ticks: {
        stepSize: 10,
      },
    },
  },
};

export default function LineChart({
  chartData,
}: {
  chartData: ChartData<"line">;
}) {
  return (
    <div>
      <Line data={{ ...chartData }} options={lineOptions} />
    </div>
  );
}
