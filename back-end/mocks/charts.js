// Mock data for monthly expenses and income
const monthlyData = {
  January: { expenses: 500, income: 1900 },
  February: { expenses: 400, income: 1600 },
  March: { expenses: 700, income: 1600 },
  April: { expenses: 389, income: 1600 },
  May: { expenses: 400, income: 1600 },
  June: { expenses: 1100, income: 1800 },
  July: { expenses: 500, income: 1600 },
  August: { expenses: 400, income: 1600 },
  September: { expenses: 700, income: 1600 },
  October: { expenses: 500, income: 1600 },
  November: { expenses: 400, income: 1600 },
  December: { expenses: 690, income: 1600 },
  // Add more months if needed
};

// Mock data for spending categories
const categoryData = [
  { category: 'Food', amount: 300 },
  { category: 'Rent', amount: 1000 },
  { category: 'Transportation', amount: 150 },
  { category: 'Entertainment', amount: 200 },
  { category: 'Healthcare', amount: 170 },
  { category: 'Subscriptions', amount: 77 },
  { category: 'Other', amount: 200 },
];

// Function to calculate the monthly net balance
function calculateMonthlyBalance(month) {
  const data = monthlyData[month];
  
  // Handle invalid month input
  if (!data) {
    return { error: 'Month not found. Please provide a valid month.' };
  }

  // Calculate net balance
  const netBalance = data.income - data.expenses;

  return {
    ...data,
    netBalance,
  };
}

// Function to calculate the total expenses and income for the year
function calculateYearlySummary() {
  const totals = Object.values(monthlyData).reduce(
    (acc, month) => {
      acc.totalIncome += month.income;
      acc.totalExpenses += month.expenses;
      return acc;
    },
    { totalIncome: 0, totalExpenses: 0 }
  );

  // Add net savings to the summary
  totals.netSavings = totals.totalIncome - totals.totalExpenses;

  return totals;
}

// Function to categorize spending
function getCategorySummary() {
  const totalSpending = categoryData.reduce(
    (sum, category) => sum + category.amount,
    0
  );

  const categorySummary = categoryData.map((category) => ({
    ...category,
    percentage: ((category.amount / totalSpending) * 100).toFixed(2) + '%',
  }));

  return { totalSpending, categorySummary };
}

// Export the data and calculation functions
export default {
  monthlyData,
  categoryData,
  calculateMonthlyBalance,
  calculateYearlySummary,
  getCategorySummary,
};
