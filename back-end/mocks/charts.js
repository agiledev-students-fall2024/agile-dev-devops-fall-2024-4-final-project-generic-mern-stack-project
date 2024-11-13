// Mock data for monthly expenses and income
const monthlyData = {
    January: { expenses: 500, income: 1000 },
    February: { expenses: 400, income: 1200 },
    March: { expenses: 700, income: 1300 },
    // Add more months if needed
  };
  
  // Mock data for spending categories
  const categoryData = [
    { category: 'Food', amount: 300 },
    { category: 'Rent', amount: 1000 },
    { category: 'Transportation', amount: 150 },
    { category: 'Entertainment', amount: 200 },
  ];
  
  // Function to calculate monthly net balance
  function calculateMonthlyBalance(month) {
    const data = monthlyData[month];
    if (!data) {
      return { error: 'Month not found' };
    }
    return {
      ...data,
      netBalance: data.income - data.expenses,
    };
  }
  
  // Export the data and calculation function
  module.exports = { monthlyData, categoryData, calculateMonthlyBalance };
  
