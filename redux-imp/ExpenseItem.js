
// import React from 'react';

// export default function ExpenseItem({ expense, getCategoryName, handleEdit, handleRemove }) {
//     const formatDate = (dateString) => {
//         const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
//         return new Date(dateString).toLocaleDateString('en-US', options);
//     };

//     return (
//         <tr>
//             <td>{formatDate(expense.expenseDate)}</td>
//             <td>{expense.title}</td>
//             <td>{expense.amount}</td>
//             <td>{getCategoryName(expense)}</td> {/* Category Name */}
//             <td>{expense.description}</td>
//             <td>
//                 {/* Float buttons to the right */}
//                 <div className="float-end">
//                     <button className="btn btn-primary btn-sm mr-2" onClick={handleEdit}>
//                         Edit
//                     </button>
//                     <button className="btn btn-danger btn-sm" onClick={handleRemove}>
//                         Delete
//                     </button>
//                 </div>
//             </td>
//         </tr>
//     );
// }


import React from 'react';

export default function ExpenseItem({ expense, getCategoryName, handleEdit, handleRemove }) {
    const formatDate = (dateString) => {
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <tr>
            <td>{formatDate(expense.expenseDate)}</td>
            <td>{expense.title}</td>
            <td>{expense.amount}</td>
            <td>{getCategoryName(expense)}</td> {/* Category Name */}
            <td>{expense.description}</td>
            <td>
                {/* Flexbox container to align buttons side by side */}
                <div className="d-flex justify-content-start">
                    <button className="btn btn-primary btn-sm mr-2" onClick={handleEdit}>
                        Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={handleRemove}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}
