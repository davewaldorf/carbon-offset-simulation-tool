// This function calculates the costs of trees for each year and generates chart data for the tree cost chart
export default function TreeCostChart(purchaseOrders, numberOfYears) {
  try {
    const initialCostPerTree = 120;
    const chartData = [];

    // Create an initial year and cost object
    const initialYear = purchaseOrders.length > 0 ? new Date(purchaseOrders[0].month).getFullYear() : new Date().getFullYear();

    // Initialize the chart data with zeros for the years before the first purchase
    for (let year = initialYear; year <= initialYear + numberOfYears; year++) {
      chartData.push({
        monthYear: `${year}`,
        purchaseCost: 0,
        maintenanceCost: 0,
        totalCost: 0,
      });
    }

    // Process purchase orders and calculate purchase costs
    purchaseOrders.forEach((order) => {
      const purchaseYear = new Date(order.month).getFullYear();

      const treesPurchased = order.trees;

      // Calculate purchase cost
      const purchaseCost = treesPurchased * initialCostPerTree;

      // Add purchase cost for the year of purchase
      const chartDataIndex = purchaseYear - initialYear;
      chartData[chartDataIndex].purchaseCost += purchaseCost;
    });

    // Calculate maintenance fees for each year
    const purchaseCosts = chartData.map((data) => ({ monthYear: data.monthYear, purchaseCost: data.purchaseCost }));
    const maintenanceFees = calculateMaintenanceFees(purchaseCosts, initialYear + numberOfYears);

    // Add maintenance cost and total cost for each year
    chartData.forEach((data, index) => {
      const maintenanceCost = maintenanceFees[index].maintenanceCost;
      const totalCost = data.purchaseCost + maintenanceCost;
      chartData[index].maintenanceCost = maintenanceCost;
      chartData[index].totalCost = totalCost + (index > 0 ? chartData[index - 1].totalCost : 0);
      chartData[index].monthYear = data.monthYear;
    });
    return chartData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// This function calculates the maintenance fees for each year
function calculateMaintenanceFees(purchaseCosts, endYear) {
  try {
    const annualMaintenanceCostPercentage = 0.1;
    const maintenanceFees = [];

    const firstPurchaseYear = purchaseCosts.length > 0 ? parseInt(purchaseCosts[0].monthYear.split('-')[0]) : new Date().getFullYear();

    for (let year = firstPurchaseYear; year <= endYear; year++) {
      // Calculate maintenance cost for each year
      const maintenanceCost = purchaseCosts
        .filter((purchase) => parseInt(purchase.monthYear.split('-')[0]) < year)
        .reduce((total, purchase) => total + purchase.purchaseCost, 0) * annualMaintenanceCostPercentage;

      maintenanceFees.push({
        monthYear: `${year}`,
        maintenanceCost,
      });
    }
    return maintenanceFees;
  } catch (error) {
    console.error(error);
    return null;
  }
}
