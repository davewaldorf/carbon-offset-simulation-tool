const Country = require('../models/countryModel');

// Get average CO2 consumption for a specific country
function getCountryCO2Consumption(req, res) {
  const { country } = req.params;
  const co2Consumption = Country.getCountryCO2Consumption(country);

  if (co2Consumption === null) {
    return res.status(404).json({ error: 'Country not found' });
  }

  res.json(co2Consumption);
}

// Get the list of country names
function getCountryNames(req, res) {
  const countryNames = Country.getCountries();
  res.json(countryNames);
}

module.exports = {
  getCountryCO2Consumption,
  getCountryNames
};