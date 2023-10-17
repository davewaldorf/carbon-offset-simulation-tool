const baseUrl = 'https://carbon-offset-simulation-tool-server.onrender.com';

// Function to make a GET request to fetch average CO2 consumption for a country
export async function getCountryCO2(country) {
  try {
    const response = await fetch(`${baseUrl}/countries/${country}`);
    if (!response.ok) {
      throw new Error('Failed to fetch country CO2 data');
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to make a GET request to fetch the list of country names
export async function getCountryNames() {
  try {
    const response = await fetch(`${baseUrl}/countries`);
    if (!response.ok) {
      throw new Error('Failed to fetch country names');
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to calculate the total CO2 offset based on tree purchases
export async function calculateTotalCO2Offset(treePurchases) {
  try {
    const response = await fetch(`${baseUrl}/offset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ treePurchases }),
    });
    if (!response.ok) {
      throw new Error('Failed to calculate total CO2 offset');
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

