import { useState } from 'react';
import 'daisyui/dist/full.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, userSlice } from "../lib/redux";

function PurchaseTable() {
  const [orders, setOrders] = useState([
    { id: 1, month: new Date(), trees: 0 },
  ]);
  const dispatch = useDispatch();

  const getTotalTreesForYear = (year) => {
    return orders.reduce((total, order) => {
      if (order.year === year) {
        total += order.trees;
      }
      return total;
    }, 0);
  };

  const handleAddOrder = () => {
    const newId = orders.length + 1;
    const newOrder = { id: newId, month: new Date(), trees: 0 };
    setOrders([...orders, newOrder]);
    dispatch(userSlice.actions.addPurchase(orders));
  };

  const handleDeleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className="text-3xl mb-4">Purchases</h1>

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
                  max={55 - getTotalTreesForYear(order.year)}
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

      <div className="text-center">
        <button className="btn btn-primary" onClick={handleAddOrder}>
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
