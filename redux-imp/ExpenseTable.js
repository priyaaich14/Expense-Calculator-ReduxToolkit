// import React from 'react';
// import ExpenseItem from './ExpenseItem';
// import { useDispatch } from 'react-redux';
// import { deleteExpense } from './expensesSlice';

// export default function ExpenseTable({ expenses, categories, setEditId }) {  // Pass categories as a prop
//     const dispatch = useDispatch();

//     const getCategoryName = (expense) => {
//         const category = categories.find(cat => cat._id === expense.category);
//         return category ? category.name : 'Unknown Category';
//     };

//     const handleEdit = (expense) => {
//         setEditId(expense._id);
//     };

//     const handleRemove = (expense) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
//         if (confirmDelete) {
//             dispatch(deleteExpense(expense._id));
//         }
//     };

//     const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

//     return (
//         <div>
//             <h2>Listing Expenses - {expenses.length}</h2>
//             {expenses.length === 0 ? (
//                 <p>No expenses found.</p>
//             ) : (
//                 <div className="table-responsive">
//                     <table className="table table-bordered table-striped">
//                         <thead className="thead-dark">
//                             <tr>
//                                 <th>Date</th>
//                                 <th>Title</th>
//                                 <th>Amount</th>
//                                 <th>Category</th>
//                                 <th>Description</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {expenses.map(expense => (
//                                 <ExpenseItem
//                                     key={expense._id}
//                                     expense={expense}
//                                     getCategoryName={getCategoryName}
//                                     handleEdit={() => handleEdit(expense)}
//                                     handleRemove={() => handleRemove(expense)}
//                                 />
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//             <div className="mt-3">
//                 <h4><strong>Total Amount: {totalAmount}</strong></h4>
//             </div>
//         </div>
//     );
// }


import React, { useState } from 'react';
import ExpenseItem from './ExpenseItem';
import ExpenseModal from './ExpenseModal'; // Import the modal component
import { useDispatch } from 'react-redux';
import { deleteExpense } from './expensesSlice';

export default function ExpenseTable({ expenses, categories, setEditId }) {
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility
    const [selectedExpense, setSelectedExpense] = useState(null); // State for currently selected expense

    const getCategoryName = (expense) => {
        const category = categories.find(cat => cat._id === expense.category);
        return category ? category.name : 'Unknown Category';
    };

    const handleEdit = (expense) => {
        setSelectedExpense(expense); // Set the selected expense for editing
        setModalIsOpen(true); // Open the modal
    };

    const handleRemove = (expense) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
        if (confirmDelete) {
            dispatch(deleteExpense(expense._id));
        }
    };

    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

    return (
        <div>
            <h2>Listing Expenses - {expenses.length}</h2>
            {expenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map(expense => (
                                <ExpenseItem
                                    key={expense._id}
                                    expense={expense}
                                    getCategoryName={getCategoryName}
                                    handleEdit={() => handleEdit(expense)} // Pass handleEdit for modal
                                    handleRemove={() => handleRemove(expense)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="mt-3">
                <h4><strong>Total Amount: {totalAmount}</strong></h4>
            </div>

            {/* Render the modal when editing an expense */}
            {modalIsOpen && (
                <ExpenseModal
                    expense={selectedExpense}
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)} // Close modal
                />
            )}
        </div>
    );
}
