const Country = require('../models/countryModel');

// Get average CO2 consumption for a specific country
function getCountryCO2Consumption(req, res) {
  const { countryName } = req.params;
  const co2Consumption = Country.getCountryCO2Consumption(countryName);

  if (co2Consumption === null) {
    return res.status(404).json({ error: 'Country not found' });
  }

  res.json({ countryName, co2Consumption });
}

module.exports = {
  getCountryCO2Consumption
};