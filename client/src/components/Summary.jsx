import PropTypes from 'prop-types';

function Summary({ costData, treeData, carbonNeutrality }) {
  // Calculate the total amount of trees planted
  const totalTrees = treeData.reduce((acc, curr) => acc + curr.trees, 0);

  // Calculate the monthly maintenance fee at carbon neutrality
  const maintenanceFee = costData.find((data) => {
    return new Date(data.monthYear).getFullYear() === carbonNeutrality.year;
  });

  const monthlyMaintenanceFee = maintenanceFee ? maintenanceFee.maintenanceCost : 0;

  // Function to convert numeric month to name
  function getMonthName(month) {
    const options = { month: 'long' };
    return new Date(`${carbonNeutrality.year}-${month + 1}-01`).toLocaleDateString(undefined, options);
  }

  // Convert the month number to its corresponding name
  const monthName = getMonthName(carbonNeutrality.month);

  // Calculate the total cost of purchase and maintenance over 10 years
  const totalPurchaseCost = costData.reduce(
    (acc, curr) => acc + curr.purchaseCost,
    0
  );
  const totalMaintenanceCost = costData.reduce(
    (acc, curr) => acc + curr.maintenanceCost,
    0
  );
  const totalCost = totalPurchaseCost + totalMaintenanceCost;

  return (
    <div className="rounded-lg p-10 shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Summary</h2>
      <ul>
        <li className="mb-2">
          You will reach carbon neutrality in {monthName} {carbonNeutrality.year} with {totalTrees} trees planted.
        </li>
        <li className="mb-2">
          Your monthly maintenance fee at that point is <span className="font-bold">${monthlyMaintenanceFee}</span>.
        </li>
      </ul>
      <ul className="mt-4">
        <li className="mb-2">
          Your estimated expenditure over 10 years is <span className="font-bold">${totalCost}</span>.
        </li>
        <li className="mb-2">
          This comprises:
          <ul className="list-disc ml-4">
            <li>USD <span className="font-bold">${totalPurchaseCost}</span> in purchase costs.</li>
            <li>USD <span className="font-bold">${totalMaintenanceCost}</span> in maintenance fees.</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

Summary.propTypes = {
  costData: PropTypes.array.isRequired, // Array of cost data
  treeData: PropTypes.array.isRequired, // Array of tree data
  carbonNeutrality: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
  }).isRequired,
};


export default Summary;
