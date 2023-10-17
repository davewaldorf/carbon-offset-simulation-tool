import { useState, useEffect } from "react"

import { useSelector, useDispatch } from "./lib/redux";
import { userSlice } from "./lib/redux";

import Selector from "./components/Selector";
import Chart from "./components/Chart";
import PurchaseTable from "./components/PurchaseTable";
import Summary from "./components/Summary";

import { getChartData } from "./utilities/chartData";
import TreeCostChart from "./utilities/expensesCalculator";

export default function App() {
  const { mode, country, treeEmissions, carbonConsumption, purchases, carbonNeutrality } = useSelector((state) => state.user);
  const [offsetChart, setOffsetChart] = useState([]);
  const [costChart, setCostChart] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getChartData(mode, treeEmissions, carbonConsumption);
        if (data) {
          setOffsetChart(data.chartData);
          dispatch(userSlice.actions.setCarbonNeutralityYear(data.carbonNeutrality));
          const costData = await TreeCostChart(purchases, 10);
          setCostChart(costData);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    }
    fetchData();
  }, [country, mode, treeEmissions]);

  const isCarbonNeutralityReached = carbonNeutrality !== "Carbon neutrality not reached within the dataset.";

  return (
    <main className="bg-accent-content flex flex-col items-center justify-between p-5 md:p-10 lg:p-20 font-mono">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center">Carbon Offset Simulation Tool</h1>
      <div className="max-w w-full items-start justify-between text-sm lg:flex">
        <div className="lg:w-60% w-full flex flex-col justify-center items-center p-5 md:p-10 lg:p-20">
          <Selector />
          <PurchaseTable />
          {isCarbonNeutralityReached && (
            <Summary costData={costChart} treeData={purchases} carbonNeutrality={carbonNeutrality} />
          )}
        </div>
        <div className="lg:w-40% w-full text-center flex flex-col justify-center items-center mt-40 p-5">
          <h1 className="font-bold ml-5 md:ml-10 mt-5 md:mt-10">Carbon Offsets</h1>
          <Chart data={offsetChart} dataKeysAndColors={[{ dataKey: "kgCO2", lineColor: "#FF5733" }, { dataKey: "treeEmissions", lineColor: "#3399FF" }]} />
          <h1 className="font-bold ml-5 md:ml-10 mt-5 md:mt-10">Cumulative Expenditure</h1>
          <Chart data={costChart} dataKeysAndColors={[{ dataKey: "totalCost", lineColor: "#008000" }]} />
        </div>
      </div>
    </main>
  )
}
