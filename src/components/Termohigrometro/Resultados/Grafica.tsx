import React from "react";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/system";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

type Props = {
  data: any;
  options?: any;
};

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const Grafica: React.FC<Props> = ({ data, options }) => {
  return <Line data={data} options={options}></Line>;
};
