import { useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useDispatch, userSlice } from "../lib/redux";
import { calculateTotalCO2Offset } from '../api/apiService';

function PurchaseTable() {
  const [orders, setOrders] = useState([
    { id: 1, month: new Date(), trees: 0 },
  ]);

  const dispatch = useDispatch();

  const handleAddOrder = async () => {
    const newId = orders.length + 1;
    const newOrder = { id: newId, month: new Date(), trees: 0 };
    setOrders([...orders, newOrder]);
    dispatch(userSlice.actions.addPurchase(orders));
    const { emissionsData } = await calculateTotalCO2Offset(orders);
    dispatch(userSlice.actions.setCarbonOffset(emissionsData));
  };

  const handleDeleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  };

  return (
    <div className='flex flex-col items-center rounded-lg shadow-md w-full max-w-xl p-5'>
      <h1 className="text-3xl mb-10">Purchases</h1>
      <div className="table-responsive">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="w-1/4">#</th>
              <th className="w-1/4">Month/Year</th>
              <th className="w-1/4">Trees</th>
              <th className="w-1/4"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className='text-center space-between'>
                <td>{order.id}</td>
                <td>
                  <DatePicker
                    selected={order.month}
                    onChange={(date) => {
                      // Handle date change and update the state
                      const updatedOrders = [...orders];
                      const index = updatedOrders.findIndex((o) => o.id === order.id);
                      updatedOrders[index].month = date; // Use the full date object
                      setOrders(updatedOrders);
                    }}
                    showMonthYearPicker
                    dateFormat="MM/yyyy"
                    className="w-full p-2"
                  />

                </td>
                <td>
                  <input
                    type="number"
                    className="w-full p-2"
                    min="0"
                    max={55}
                    value={order.trees}
                    onChange={(e) => {
                      // Handle input change and update the state
                      const updatedOrders = [...orders];
                      const index = updatedOrders.findIndex((o) => o.id === order.id);
                      updatedOrders[index].trees = parseInt(e.target.value);
                      setOrders(updatedOrders);
                    }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <button className="btn btn-primary mt-2" onClick={handleAddOrder}>
          + Add Order
        </button>
      </div>

      <p className="mt-4">
        Total Trees Purchased: {orders.reduce((total, order) => total + order.trees, 0)}
      </p>
    </div>
  );
}

export default PurchaseTable;
