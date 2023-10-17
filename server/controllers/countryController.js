const Country = require('../models/countryModel');

// Get average CO2 consumption for a specific country
function getCountryCO2Consumption(req, res) {
  try {
    const { country } = req.params;
    const co2Consumption = Country.getCountryCO2Consumption(country);

    if (co2Consumption === null) {
      return res.status(404).json({ error: 'Country not found' });
    }

    res.json(co2Consumption);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get the list of country names
function getCountryNames(req, res) {
  try {
    const countryNames = Country.getCountries();
    res.json(countryNames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getCountryCO2Consumption,
  getCountryNames
};