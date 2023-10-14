const userOffsets = [];

// Function to add user offset data
function addUserOffset(userId, numberOfTrees, totalCost, co2Offset, purchaseDate) {
  userOffsets.push({
    userId,
    country,
    numberOfTrees,
    totalCost,
    co2Offset,
    purchaseDate
  });
}

// Function to get user's simulated offset data
function getUserOffsets(userId) {
  return userOffsets.filter(offset => offset.userId === userId);
}

module.exports = {
  addUserOffset,
  getUserOffsets
};