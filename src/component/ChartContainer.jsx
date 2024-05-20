import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';





const MyChart = ({data , options}) => {
  return <Bar data={data} options={options} />;
};

export default MyChart;