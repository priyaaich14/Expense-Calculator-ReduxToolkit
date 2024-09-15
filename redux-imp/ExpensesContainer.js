// import { useSelector, useDispatch } from "react-redux";
//  import { useEffect } from "react";
//  import { fetchExpenses } from "./expensesSlice";

// export default function CategoriesContainer(){
//     const {data : expenses } = useSelector ((state) => {
//         return state.expenses
//     })
//     const dispatch = useDispatch()
//     useEffect(() => {
//         dispatch(fetchExpenses())
//     },[dispatch])
//     return (
//         <div>
//             <h2>Listing Expenses - { expenses.length }</h2>
//         </div>
//     )
// }


///////////////////////////////////////////////

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchExpenses } from './expensesSlice';
import { fetchCategories } from './categoriesSlice';  // Make sure you're fetching categories as well
import ExpenseTable from './ExpenseTable';
import ExpenseForm from './ExpenseForm';

export default function ExpensesContainer() {
    const { data: expenses } = useSelector(state => state.expenses);
    const { data: categories } = useSelector(state => state.categories);  // Getting categories from state
    const dispatch = useDispatch();
    
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        dispatch(fetchExpenses());
        dispatch(fetchCategories());  // Fetch categories to map them to names
    }, [dispatch]);

    return (
        <div className="row">
            <div className="col-md-8">
                <ExpenseTable expenses={expenses} categories={categories} setEditId={setEditId} />
            </div>
            <div className="col-md-4">
                <ExpenseForm editId={editId} setEditId={setEditId} />
            </div>
        </div>
    );
}
