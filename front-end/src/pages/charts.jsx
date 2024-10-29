import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartsPage = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mocked Data - Replace with actual data fetching
  useEffect(() => {
    const fetchData = async () => {
      // Replace this with an API call to fetch financial data
      const mockExpenseData = [500, 400, 300, 700, 600, 400, 800, 500, 600, 700, 400, 900];
      const mockIncomeData = [1000, 1200, 900, 1100, 1000, 1200, 1300, 1150, 1200, 1250, 1300, 1400];
      
      setExpenseData(mockExpenseData);
      setIncomeData(mockIncomeData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading data...</div>;
  }

  // Line Chart Data
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: expenseData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.2,  // Adds smoothness to the line
      },
      {
        label: 'Monthly Income',
        data: incomeData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.2,
      },
    ],
  };

  // Bar Chart Data
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Expenses vs. Income',
        data: expenseData.map((expense, index) => incomeData[index] - expense),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Chart options for both charts
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Financial Overview',
      },
    },
  };

  return (
    <div className="charts-page">
      <h2>Financial Charts</h2>

      <div className="chart-container">
        <h3>Monthly Expenses and Income</h3>
        <Line data={lineChartData} options={chartOptions} />
      </div>

      <div className="chart-container">
        <h3>Net Balance (Income - Expenses)</h3>
        <Bar data={barChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ChartsPage;
