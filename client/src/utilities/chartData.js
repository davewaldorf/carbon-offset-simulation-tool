// This function finds the date when carbon neutrality is reached
export function findCarbonNeutralityDate(emissionsData, totalCO2Consumption) {
  try {
  let monthlyCO2Consumption = totalCO2Consumption / 12;
  for (const year in emissionsData) {
    for (const month in emissionsData[year]) {
      const monthlyCO2Emission = emissionsData[year][month];
      if (monthlyCO2Emission >= monthlyCO2Consumption) {
        return {
          year: parseInt(year),
          month: parseInt(month),
        };
      }
    }
  }
  } catch (error) {
    console.error(error);
    return 'Carbon neutrality not reached within the dataset.';
  }
}

// This function generates chart data for the carbon neutrality chart
export async function getChartData(mode, treeEmissions, carbonConsumption) {
  try {
    const isMonthlyMode = mode === 'Monthly';
    const chartData = [];
    const carbonNeutrality = findCarbonNeutralityDate(treeEmissions, carbonConsumption);
    let chartDataEndYear = carbonNeutrality.year ? carbonNeutrality.year : new Date().getFullYear() + 3;
    let chartDataStartYear = chartDataEndYear - 3;

    if (isMonthlyMode) {
      let currentMonth = (new Date().getFullYear() === chartDataStartYear) ? new Date().getMonth() : 0;
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let monthsGenerated = 0;

      for (let i = chartDataStartYear; monthsGenerated < 60; i++) {
        for (let j = currentMonth; j < 12; j++) {
          const year = i;
          const month = monthNames[j];
          const consumptionPerMonth = carbonConsumption / 12;
          let treeEmissionsForMonth = treeEmissions[year] ? treeEmissions[year][j] || 0 : 0;

          chartData.push({
            monthYear: `${month}-${year}`,
            kgCO2: consumptionPerMonth,
            treeEmissions: treeEmissionsForMonth,
          });

          monthsGenerated++;
          if (year == carbonNeutrality.year && j == carbonNeutrality.month) {
            break;
          }
        }
        currentMonth = 0;
      }
    } else {
      for (let i = chartDataStartYear; i <= chartDataEndYear + 1; i++) {
        const yearlyEmissions = treeEmissions[i] || {}; // Check if data exists for the year
        const totalYearlyEmissions = Object.values(yearlyEmissions).reduce((acc, value) => acc + value, 0);
        chartData.push({
          monthYear: `${i}`,
          kgCO2: carbonConsumption,
          treeEmissions: totalYearlyEmissions,
        });
      }
    }

    return { chartData, carbonNeutrality };
  } catch (error) {
    throw new Error(error.message);
  }
}
