const mockUserData = {
  userID: 1,
  totalTreesPurchased: 25, // Total trees purchased so far
  carbonNeutralityYear: 2030, // The year they aim to achieve carbon neutrality
  countrySelected: 'United States',
  carbonAbsorptionPerTree: 28.5, // kg of CO2 absorbed per tree per year
  purchases: [
    {
      id: 1,
      date: '2023-04-15', // Date of the purchase
      treesPurchased: 10, // Number of trees purchased in this transaction
      upFrontCost: 120, // Initial cost
      annualCost: 12, // Annual cost per tree
    },
    {
      id: 2,
      date: '2024-02-20',
      treesPurchased: 5,
      upFrontCost: 60,
      annualCost: 6,
    },
    // Additional purchase records here
  ],
};

export default mockUserData;