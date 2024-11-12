import React, { useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './charts.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartsPage = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const mockExpenseData = [500, 400, 300, 700, 600, 400, 800, 500, 600, 700, 400, 900];
      const mockIncomeData = [1000, 1200, 900, 1100, 1000, 1200, 1300, 1150, 1200, 1250, 1300, 1400];
      
      setExpenseData(mockExpenseData);
      setIncomeData(mockIncomeData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

  // Calculate summary values
  const totalIncome = incomeData.reduce((sum, income) => sum + income, 0);
  const totalExpense = expenseData.reduce((sum, expense) => sum + expense, 0);
  const totalSavings = totalIncome - totalExpense;

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: expenseData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.2,
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

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Net Balance (Income - Expenses)',
        data: expenseData.map((expense, index) => incomeData[index] - expense),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const pieChartData = {
    labels: ['Rent', 'Food', 'Transportation', 'Entertainment', 'Other'],
    datasets: [
      {
        label: 'Expense Breakdown',
        data: [1200, 300, 200, 150, 100], // Mock data
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

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
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toFixed(2)}`, // Format values as currency
        },
      },
    },
  };

  return (
    <div className={`charts-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <h2>Financial Charts</h2>

      {/* Toggle Dark Mode */}
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

      {/* Data Summary */}
      <div className="data-summary">
        <h3>Data Summary</h3>
        <p>Total Income: ${totalIncome}</p>
        <p>Total Expenses: ${totalExpense}</p>
        <p>Total Savings: ${totalSavings}</p>
      </div>

      <div className="chart-container">
        <h3>Monthly Expenses and Income</h3>
        <Line data={lineChartData} options={chartOptions} />
      </div>

      <div className="chart-container">
        <h3>Net Balance (Income - Expenses)</h3>
        <Bar data={barChartData} options={chartOptions} />
      </div>

      <div className="chart-container">
        <h3>Expense Breakdown by Category</h3>
        <Pie data={pieChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ChartsPage;
