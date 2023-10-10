const countries = {
  'United States': 15.52,
  'United Kingdom': 5.55,
  'Germany': 9.44,
  'South Africa': 6.95,
  'India': 1.91,
  'China': 7.38,
  'Singapore': 8.56,
  'Australia': 17.10
};

// Function to get average CO2 consumption for a specific country
function getCountryCO2Consumption(countryName) {
  return countries[countryName] || null;
}

module.exports = {
  getCountryCO2Consumption
};