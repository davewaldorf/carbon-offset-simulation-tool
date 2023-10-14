const Tree = require('../models/treeModel');
const UserOffset = require('../models/userModel');

// Simulate tree purchase and calculate future offsets
function simulateTreePurchase(req, res) {
  const { numberOfTrees } = req.body;

  if (!numberOfTrees || numberOfTrees <= 0 || numberOfTrees > 55) {
    return res.status(400).json({ error: 'Invalid number of trees' });
  }

  const initialCost = Tree.initialCost;
  const annualCostPercentage = Tree.annualCostPercentage / 100;
  const co2OffsetPerTree = Tree.co2OffsetPerYear;
  const fullyGrownYear = Tree.fullyGrownYear;

  let totalCost = initialCost;
  let co2Offset = 0;

  for (let year = 1; year <= numberOfTrees; year++) {
    if (year > 1) {
      totalCost += initialCost * annualCostPercentage;
    }
    if (year >= fullyGrownYear) {
      co2Offset += co2OffsetPerTree;
    }
  }

  // Add user offset data to UserOffset model (you might need user authentication for this)
  // UserOffset.addUserOffset(userId, numberOfTrees, totalCost, co2Offset, new Date());

  res.json({ numberOfTrees, totalCost, co2Offset });
}

// Get user's simulated offset data (assuming user authentication)
function getUserOffsets(req, res) {
  // Replace with user authentication logic to get the userId
  const userId = 'exampleUserId';

  const userOffsets = UserOffset.getUserOffsets(userId);

  res.json(userOffsets);
}

module.exports = {
  simulateTreePurchase,
  getUserOffsets
};