const router = require('express').Router();
const countryController = require('../controllers/countryController');
const offsetSimulatorController = require('../controllers/offsetSimulatorController');
const userOffsetController = require('../controllers/userOffsetController');

// Country routes
router.get('/country/:countryName', countryController.getCountryCO2Consumption);

// Offset Simulator routes
router.post('/offset/simulate', offsetSimulatorController.simulateTreePurchase);
router.get('/offset/user/:userId', offsetSimulatorController.getUserOffsets);

// User Offset routes
router.get('/user/:userId/offsets', userOffsetController.getUserOffsets);

module.exports = router;
