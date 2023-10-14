const UserOffset = require('../models/userModel');

function calculateUserOffset(userId, numberOfTrees) {
  const initialCost = 120; // Example initial cost per tree ($)
  const annualCostPercentage = 0.10; // Example annual cost as a percentage of the initial cost
  const co2OffsetPerYear = 28.5; // Example CO2 offset per tree per year (kg)
  const fullyGrownYear = 6; // Example year when the tree becomes fully grown

  // Get the user's country and average CO2 consumption per year
  const userCountry = getUserCountry(userId);
  const averageCO2Consumption = getAverageCO2Consumption(userCountry) / 1000; // Convert to tonnes

  // Calculate the total cost and CO2 offset of the trees
  const totalCost = initialCost * numberOfTrees + (initialCost * annualCostPercentage * (fullyGrownYear - 1)) * numberOfTrees;
  const co2Offset = numberOfTrees * co2OffsetPerYear;

  // Calculate the year of carbon neutrality
  const yearsToCarbonNeutrality = Math.ceil(co2Offset / averageCO2Consumption);
  const carbonNeutralYear = new Date().getFullYear() + yearsToCarbonNeutrality;

  // Add user offset data to the UserOffset model
  UserOffset.addUserOffset(userId, numberOfTrees, totalCost, co2Offset, new Date());

  // Return the calculated results
  return {
    numberOfTrees,
    totalCost,
    co2Offset,
    yearsToCarbonNeutrality,
    carbonNeutralYear
  };
}

module.exports = {
  calculateUserOffset
};
