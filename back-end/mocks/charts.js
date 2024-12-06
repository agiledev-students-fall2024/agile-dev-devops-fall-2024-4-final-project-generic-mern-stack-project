import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Generate Bar Chart Configuration
 * @param {Array} labels - Array of labels (e.g., months)
 * @param {Array} budgetLimits - Array of budget limits
 * @param {Array} overallSpent - Array of overall spent values
 * @returns {Object} - Chart.js configuration object
 */
export const getBarChartConfig = (labels, budgetLimits, overallSpent) => ({
  labels,
  datasets: [
    {
      label: 'Budget Limit',
      data: budgetLimits,
      backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue
    },
    {
      label: 'Overall Spent',
      data: overallSpent,
      backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red
    },
  ],
});

/**
 * Default Chart Options
 * @param {String} title - Title of the chart
 * @returns {Object} - Chart.js options object
 */
export const getDefaultChartOptions = (title) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: title,
    },
  },
});

export default {
  getBarChartConfig,
  getDefaultChartOptions,
};
