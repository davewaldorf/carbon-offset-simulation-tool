const Tree = require('../models/treeModel');

const treeController = {
  // Calculate the total CO2 offset based on tree purchases
  calculateTotalCO2Offset: (req, res) => {
    try {
      const treePurchases = req.body.treePurchases;

      if (!Array.isArray(treePurchases) || treePurchases.length === 0) {
        return res.status(400).json({ error: 'Invalid tree purchases data' });
      }

      // Define a function to calculate CO2 emissions for a tree in a given month
      const calculateTreeEmissions = (purchase, year, month) => {
        const purchaseDate = new Date(purchase.month);
        const treeAgeInMonths = (year - purchaseDate.getFullYear()) * 12 + (month - purchaseDate.getMonth());
        const isFullyGrown = treeAgeInMonths >= Tree.fullyGrownYear * 12;

        let co2Offset = 0;

        if (treeAgeInMonths >= 1) {
          co2Offset = isFullyGrown
            ? Tree.fullyGrownYear * Tree.co2OffsetPerYear
            : treeAgeInMonths * (Tree.co2OffsetPerYear / 12);
        }

        return co2Offset * purchase.trees;
      };

      // Find the earliest and latest purchase dates
      const earliestPurchaseDate = new Date(Math.min(...treePurchases.map((purchase) => new Date(purchase.month))));
      
      // Initialize an object to store emissions data for each month in the 20-year range
      const emissionsData = {};

      // Calculate the end date (20 years after the earliest purchase date)
      const endDate = new Date(earliestPurchaseDate);
      endDate.setFullYear(earliestPurchaseDate.getFullYear() + 20);

      // Iterate through tree purchases
      for (const purchase of treePurchases) {
        if (purchase.trees <= 0) {
          continue;
        }

        // Iterate through months within the 20-year range
        for (let currentMonth = new Date(earliestPurchaseDate); currentMonth <= endDate; currentMonth.setMonth(currentMonth.getMonth() + 1)) {
          const year = currentMonth.getFullYear();
          const month = currentMonth.getMonth();

          if (!emissionsData[year]) {
            emissionsData[year] = {};
          }

          if (!emissionsData[year][month]) {
            emissionsData[year][month] = 0;
          }

          emissionsData[year][month] += calculateTreeEmissions(purchase, year, month);
        }
      }
      res.json({ emissionsData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = treeController;
