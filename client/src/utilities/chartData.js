import {userSlice} from '../lib/redux'
import { getCountryCO2 } from '../api/apiService'

export async function getChartData(dispatch, country, mode) {
  const data = await getCountryCO2(country);

  // Process data and set it in the Redux store
  const isMonthlyMode = mode === 'Monthly';
  const chartData = [];

  if (isMonthlyMode) {
    // Process data for monthly mode
    const currentMonth = new Date().getMonth();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    for (let i = currentMonth; i < currentMonth + 12 * 5; i++) {
      const year = new Date().getFullYear() + Math.floor(i / 12);
      const month = monthNames[i % 12];
      const consumptionPerMonth = data / 12;
      
      chartData.push({
        monthYear: `${month}-${year}`,
        kgCO2: consumptionPerMonth,
        treeEmissions: 10, // Calculate based on trees purchased
      });
    }
  } else {
    // Process data for yearly mode
    for (let i = new Date().getFullYear(); i < new Date().getFullYear() + 5; i++) {
      chartData.push({
        monthYear: `${i}`,
        kgCO2: data,
        treeEmissions: 10, // Calculate based on trees purchased
      });
    }
  }

  dispatch(userSlice.actions.setCarbonOffset(chartData));

  return chartData;
}

