import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './charts.css';

const Charts = ({ month }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/charts/${month}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setChartData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [month]);

  if (loading) return <div>Loading chart data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!chartData) return <div>No data available for this month.</div>;

  const barData = {
    labels: ['Budget Limit', 'Overall Spent'],
    datasets: [
      {
        label: month,
        data: [chartData.budgetLimit, chartData.overallSpent],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <div className="charts-page">
      <h2>{month} Budget Overview</h2>
      <div className="chart-container">
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Charts;

