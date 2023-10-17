const router = require('express').Router();
const countryController = require('../controllers/countryController');
const userOffsetController = require('../controllers/userOffsetController');

// Country routes
router.get('/countries/:country', countryController.getCountryCO2Consumption);
router.get('/countries', countryController.getCountryNames);

// Offset simulator routes
router.post('/offset', userOffsetController.calculateTotalCO2Offset);

module.exports = router;
