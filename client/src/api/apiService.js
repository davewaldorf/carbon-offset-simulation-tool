const baseUrl = 'http://localhost:4000';

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

// Function to make a POST request to simulate future purchases of carbon offsets
export async function simulateCarbonOffset(data) {
  try {
    const response = await fetch(`${baseUrl}/simulate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to simulate carbon offset');
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to make a GET request to visualize simulated future offsets and expenditure
export async function visualizeOffsets(userId) {
  try {
    const response = await fetch(`${baseUrl}/visualize/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch visualized data');
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}