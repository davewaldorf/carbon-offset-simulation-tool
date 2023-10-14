import Selector from "./components/Selector";
import Chart from "./components/Chart";
import PurchaseTable from "./components/PurchaseTable";
import { useState, useEffect } from "react"
import { getChartData } from "./utilities/chartData";
import { useSelector, useDispatch } from "./lib/redux";


export default function App() {
  const { mode, country } = useSelector((state) => state.user);
  const [chartData, setChartData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const data = await getChartData(dispatch, country, mode);
      setChartData(data);
    }
    fetchData();
  }, [country, mode]);

  return (
    <main className="bg-accent-content flex min-h-screen flex-col items-center justify-between p-10">
    <div className="z-10 max-w-5xl w-full items-start justify-between font-mono text-sm lg:flex">
      <div className="lg:w-60% border-r border-gray-400 flex flex-col justify-center items-center">
          <Selector />
          <PurchaseTable />
      </div>
      <div className="lg:w-40% text-center flex flex-col justify-center items-center ml-0">
        <Chart data={chartData} dataKeysAndColors={[{ dataKey: "kgCO2", lineColor: "#FF5733" }, { dataKey: "treeEmissions", lineColor: "#3399FF" }]} />
        {/* <Chart data={chartData} dataKeysAndColors={[{ dataKey: "usdSpend", lineColor: "#FF5733" }, { dataKey: "anotherKey", lineColor: "#3399FF" }]} /> */}
      </div>
    </div>
  </main>
  )
}
