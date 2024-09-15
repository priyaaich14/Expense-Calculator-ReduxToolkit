// import React from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import { useSelector } from 'react-redux';

// export default function CategoryShowModal({ category, isOpen, onRequestClose }) {
//   const { data: expenses } = useSelector((state) => state.expenses); // Get the expenses from the Redux store

//   // Filter the expenses for the selected category
//   const categoryExpenses = expenses.filter(expense => expense.category === category._id);

//   // Calculate the total amount spent in this category
//   const totalAmount = categoryExpenses.reduce((total, expense) => total + expense.amount, 0);

//   return (
//     <Modal show={isOpen} onHide={onRequestClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>{category.name} Details</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h5>Expenses for {category.name}:</h5>
//         <ul>
//           {categoryExpenses.map((expense) => (
//             <li key={expense._id}>
//               {expense.title} - {expense.amount}
//             </li>
//           ))}
//         </ul>
//         <h5>Total Expenses: {categoryExpenses.length}</h5>
//         <h5>Total Amount Spent: {totalAmount}</h5>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onRequestClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }


import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function CategoryShowModal({ category, isOpen, onRequestClose }) {
  const { data: expenses } = useSelector((state) => state.expenses); // Get the expenses from the Redux store

  // Filter the expenses for the selected category
  const categoryExpenses = expenses.filter(expense => expense.category === category._id);

  // Calculate the total amount spent in this category
  const totalAmount = categoryExpenses.reduce((total, expense) => total + expense.amount, 0);

  // Helper function to format the date
  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>{category.name} Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Expenses for {category.name}:</h5>

        {/* Bootstrap Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {categoryExpenses.map((expense) => (
                <tr key={expense._id}>
                  <td>{formatDate(expense.expenseDate)}</td>
                  <td>{expense.title}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.description || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Total Expenses: {categoryExpenses.length}</h5>
        <h5>Total Amount Spent: {totalAmount}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
