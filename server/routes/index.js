const router = require('express').Router();
const countryController = require('../controllers/countryController');
const offsetSimulatorController = require('../controllers/offsetSimulatorController');
const userOffsetController = require('../controllers/userOffsetController');

// Country routes
router.get('/countries/:countryName', countryController.getCountryCO2Consumption);
router.get('/countries', countryController.getCountryNames);

// Offset Simulator routes
router.post('/offset/simulate', offsetSimulatorController.simulateTreePurchase);
router.get('/offset/user/:userId', offsetSimulatorController.getUserOffsets);

// User Offset routes
router.get('/user/:userId/offsets', userOffsetController.getUserOffsets);

module.exports = router;
