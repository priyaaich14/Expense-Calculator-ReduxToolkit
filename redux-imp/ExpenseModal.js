// import React, { useState, useEffect } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateExpense, clearEditErrors } from './expensesSlice'; // Add a 'clearEditErrors' action similar to 'categories'

// export default function ExpenseModal({ expense, isOpen, onRequestClose }) {
//     const [expenseDate, setExpenseDate] = useState('');
//     const [title, setTitle] = useState('');
//     const [amount, setAmount] = useState('');
//     const [expenseCategory, setExpenseCategory] = useState('');
//     const [expenseDescription, setExpenseDescription] = useState('');
//     const [expenseClientErrors, setExpenseClientErrors] = useState({});

//     const { editErrors } = useSelector((state) => state.expenses); // Server-side errors from Redux store
//     const { data: categories } = useSelector((state) => state.categories); // To populate the category dropdown
//     const dispatch = useDispatch();

//     // Prefill the modal with the current expense data when editing
//     useEffect(() => {
//         if (expense) {
//             setExpenseDate(new Date(expense.expenseDate).toISOString().split('T')[0]);
//             setTitle(expense.title);
//             setAmount(expense.amount.toString());
//             setExpenseCategory(expense.category);
//             setExpenseDescription(expense.description);
//         }
//     }, [expense]);

//     // Clear edit-specific errors when the modal opens or closes
//     useEffect(() => {
//         if (isOpen) {
//             dispatch(clearEditErrors()); // Clear previous errors
//         }
//     }, [isOpen, dispatch]);

//     // Client-side validation for empty fields
//     const runExpenseClientValidation = () => {
//         const errors = {};
//         if (!expenseDate.trim()) {
//             errors.expenseDate = 'Date cannot be empty';
//         }
//         if (!title.trim()) {
//             errors.title = 'Title cannot be empty';
//         }
//         if (!amount.trim()) {
//             errors.amount = 'Amount cannot be empty';
//         }
//         if (!expenseCategory.trim()) {
//             errors.expenseCategory = 'Expense category cannot be empty';
//         }
//         setExpenseClientErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     // Handle form submission for updating the expense
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!runExpenseClientValidation()) return; // Stop if client validation fails

//         const formData = {
//             expenseDate,
//             title,
//             amount: Number(amount),
//             category: expenseCategory,
//             description: expenseDescription,
//         };

//         dispatch(updateExpense({ id: expense._id, formData })); // Dispatch the update expense action
//         onRequestClose(); // Close the modal on successful update
//     };

//     return (
//         <Modal show={isOpen} onHide={onRequestClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Edit Expense</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label>Date</label>
//                         <input
//                             type="date"
//                             className="form-control"
//                             value={expenseDate}
//                             onChange={(e) => setExpenseDate(e.target.value)}
//                         />
//                         {expenseClientErrors.expenseDate && <span className="text-danger">{expenseClientErrors.expenseDate}</span>}
//                     </div>

//                     <div className="form-group">
//                         <label>Title</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                         />
//                         {expenseClientErrors.title && <span className="text-danger">{expenseClientErrors.title}</span>}
//                     </div>

//                     <div className="form-group">
//                         <label>Amount</label>
//                         <input
//                             type="number"
//                             className="form-control"
//                             value={amount}
//                             onChange={(e) => setAmount(e.target.value)}
//                         />
//                         {expenseClientErrors.amount && <span className="text-danger">{expenseClientErrors.amount}</span>}
//                     </div>

//                     <div className="form-group">
//                         <label>Category</label>
//                         <select
//                             className="form-control"
//                             value={expenseCategory}
//                             onChange={(e) => setExpenseCategory(e.target.value)}
//                         >
//                             <option value="">Select Category</option>
//                             {categories.map(category => (
//                                 <option key={category._id} value={category._id}>
//                                     {category.name}
//                                 </option>
//                             ))}
//                         </select>
//                         {expenseClientErrors.expenseCategory && <span className="text-danger">{expenseClientErrors.expenseCategory}</span>}
//                     </div>

//                     <div className="form-group">
//                         <label>Description (Optional)</label>
//                         <textarea
//                             className="form-control"
//                             value={expenseDescription}
//                             onChange={(e) => setExpenseDescription(e.target.value)}
//                         />
//                     </div>

//                     {/* Show any server-side edit errors */}
//                     {editErrors && <div className="alert alert-danger mt-2">{editErrors}</div>}

//                     <Button type="submit" variant="primary" className="mt-3">
//                         Update Expense
//                     </Button>
//                 </form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={onRequestClose}>
//                     Close
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }


import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateExpense, clearEditErrors } from './expensesSlice';

export default function ExpenseModal({ expense, isOpen, onRequestClose }) {
    const [expenseDate, setExpenseDate] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseClientErrors, setExpenseClientErrors] = useState({});

    const { editErrors } = useSelector((state) => state.expenses); // Server-side errors
    const { data: categories } = useSelector((state) => state.categories); // To populate the category dropdown
    const dispatch = useDispatch();

    // Prefill the modal with the current expense data when editing
    useEffect(() => {
        if (expense) {
            setExpenseDate(new Date(expense.expenseDate).toISOString().split('T')[0]);
            setTitle(expense.title);
            setAmount(expense.amount.toString());
            setExpenseCategory(expense.category);
            setExpenseDescription(expense.description);
        }
    }, [expense]);

    // Clear edit-specific errors when the modal opens or closes
    useEffect(() => {
        if (isOpen) {
            dispatch(clearEditErrors()); // Clear previous errors
        }
    }, [isOpen, dispatch]);

    // Client-side validation for empty fields
    const runExpenseClientValidation = () => {
        const errors = {};
        if (!expenseDate.trim()) {
            errors.expenseDate = 'Date cannot be empty';
        } else if (new Date(expenseDate) > new Date()) {
            errors.expenseDate = 'Date cannot be greater than today';  // Client-side validation for date
        }
        if (!title.trim()) {
            errors.title = 'Title cannot be empty';
        }
        if (!amount.trim()) {
            errors.amount = 'Amount cannot be empty';
        }
        if (!expenseCategory.trim()) {
            errors.expenseCategory = 'Expense category cannot be empty';
        }
        setExpenseClientErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission for updating the expense
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!runExpenseClientValidation()) return; // Stop if client validation fails

        const formData = {
            expenseDate,
            title,
            amount: Number(amount),
            category: expenseCategory,
            description: expenseDescription,
        };

        dispatch(updateExpense({ id: expense._id, formData })); // Dispatch the update expense action
        onRequestClose(); // Close the modal on successful update
    };

    return (
        <Modal show={isOpen} onHide={onRequestClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={expenseDate}
                            onChange={(e) => setExpenseDate(e.target.value)}
                        />
                        {expenseClientErrors.expenseDate && <span className="text-danger">{expenseClientErrors.expenseDate}</span>}
                    </div>

                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {expenseClientErrors.title && <span className="text-danger">{expenseClientErrors.title}</span>}
                    </div>

                    <div className="form-group">
                        <label>Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        {expenseClientErrors.amount && <span className="text-danger">{expenseClientErrors.amount}</span>}
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            className="form-control"
                            value={expenseCategory}
                            onChange={(e) => setExpenseCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {expenseClientErrors.expenseCategory && <span className="text-danger">{expenseClientErrors.expenseCategory}</span>}
                    </div>

                    <div className="form-group">
                        <label>Description (Optional)</label>
                        <textarea
                            className="form-control"
                            value={expenseDescription}
                            onChange={(e) => setExpenseDescription(e.target.value)}
                        />
                    </div>

                    {/* Show any server-side edit errors */}
                    {Array.isArray(editErrors) && editErrors.map((error, index) => (
                        <div key={index} className="alert alert-danger mt-2">
                            {error.msg} {/* Render only the message field */}
                        </div>
                    ))}

                    <Button type="submit" variant="primary" className="mt-3">
                        Update Expense
                    </Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onRequestClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
