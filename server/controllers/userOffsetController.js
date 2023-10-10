const UserOffset = require('../models/userOffsetModel');

// Get user's simulated offset data (assuming user authentication)
function getUserOffsets(req, res) {
  // Replace with user authentication logic to get the userId
  const userId = 'exampleUserId';

  const userOffsets = UserOffset.getUserOffsets(userId);

  res.json(userOffsets);
}

module.exports = {
  getUserOffsets
};