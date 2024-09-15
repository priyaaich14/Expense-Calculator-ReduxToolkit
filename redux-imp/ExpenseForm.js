import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, updateExpense } from './expensesSlice';

export default function ExpenseForm({ editId, setEditId }) {
    const [expenseDate, setExpenseDate] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseClientErrors, setExpenseClientErrors] = useState({});

    const { data: categories } = useSelector(state => state.categories);
    // const { data: expenses, errors } = useSelector(state => state.expenses); // Removed the unused 'errors' variable to prevent the warning
    const { data: expenses } = useSelector(state => state.expenses);
    const dispatch = useDispatch();

    useEffect(() => {
        if (editId) {
            const expenseToEdit = expenses.find(expense => expense._id === editId);
            if (expenseToEdit) {
                setExpenseDate(new Date(expenseToEdit.expenseDate).toISOString().split('T')[0]);
                setTitle(expenseToEdit.title);
                setAmount(expenseToEdit.amount.toString());
                setExpenseCategory(expenseToEdit.category);
                setExpenseDescription(expenseToEdit.description);
            }
        } else {
            setExpenseDate('');
            setTitle('');
            setAmount('');
            setExpenseCategory('');
            setExpenseDescription('');
        }
    }, [editId, expenses]);

    const runExpenseClientValidation = () => {
        const errors = {};
        if (!expenseDate.trim()) {
            errors.expenseDate = 'Date cannot be empty';
        } else if (new Date(expenseDate) > new Date()) {
            errors.expenseDate = 'Date cannot be greater than today';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!runExpenseClientValidation()) return;

        const formData = {
            expenseDate,
            title,
            amount: Number(amount),
            category: expenseCategory,
            description: expenseDescription,
        };

        if (editId) {
            dispatch(updateExpense({ id: editId, formData }));
            setEditId(null);
        } else {
            dispatch(addExpense(formData));
        }

        setExpenseDate('');
        setTitle('');
        setAmount('');
        setExpenseCategory('');
        setExpenseDescription('');
    };

    return (
        <div>
            <h2>{editId ? 'Edit Expense' : 'Add Expense'}</h2>
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

                <button type="submit" className="btn btn-primary">
                    {editId ? 'Update Expense' : 'Add Expense'}
                </button>
            </form>
        </div>
    );
}
