const router = require('express').Router();
const countryController = require('../controllers/countryController');
const offsetSimulatorController = require('../controllers/offsetSimulatorController');
const userOffsetController = require('../controllers/userOffsetController');

// Country routes
router.get('/countries/:country', countryController.getCountryCO2Consumption);
router.get('/countries', countryController.getCountryNames);

// Offset Simulator routes
router.post('/offset/simulate', offsetSimulatorController.simulateTreePurchase);
router.get('/offset/user/:userId', offsetSimulatorController.getUserOffsets);

// User Offset routes
router.post('/user/:userId/offset', (req, res) => {
  const userId = req.se
  const { numberOfTrees } = req.body;
  const userOffsetResult = userOffsetController.calculateUserOffset(userId, numberOfTrees);
  res.json(userOffsetResult);
});

module.exports = router;
