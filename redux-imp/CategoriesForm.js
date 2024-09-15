// import { useState } from 'react' 
// import { addCategory } from './categoriesSlice'
// import { useDispatch } from 'react-redux'
// export default function CategoryForm(){
//     const [categoryName, setCategoryName] = useState('')
//     const [categoryClientErrors, setCategoryClientErrors] = useState({})
//     const categoryErrors = {}
//   const dispatch = useDispatch()

//     const runCategoryClientValidations = () => {
//         if(categoryName.trim().length === 0) {
//             categoryErrors.name = 'name cannot be empty'
//         }
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         const formData = {
//             name: categoryName
//         }

//         runCategoryClientValidations()

//         if(Object.keys(categoryErrors).length === 0) {            
//             //console.log(formData)
//             dispatch(addCategory(formData))
//         } else {
//             setCategoryClientErrors(categoryErrors)
//         }
//     }

//     return (
//         <div>
//             <h2>Add Category</h2>
//             {/* { categoryServerErrors.length > 0 && (
//                 <div>
//                     <h3>Server Errors</h3> 
//                     <ul>
//                         { categoryServerErrors.map((ele, i) => {
//                             return <li key={i}>{ ele.msg } </li>
//                         })}
//                     </ul>
//                 </div> 
//             )} */}

//             <form onSubmit={handleSubmit}>
//             <div className="form-group">
//                 <label htmlFor="name">Enter Name</label>
//                 <input 
//                     type="text"
//                     className="form-control"
//                     id="name"
//                     value={categoryName}
//                     onChange={(e) => setCategoryName(e.target.value)}
//                 />
//                 {categoryClientErrors.name && (
//                     <div className="text-danger">
//                         {categoryClientErrors.name}
//                     </div>
//                 )}
//             </div>
//             <button type="submit" className="btn btn-primary">Submit</button>
//         </form>
//     </div>
//     )
// }

//////////////////////////////////////////////////////////////////////////

// import { useState } from 'react' 
// import { addCategory } from './categoriesSlice'; 
// import { useSelector, useDispatch } from 'react-redux'; 
// export default function CategoryForm(){
//     const { errors } = useSelector((state) => {
//         return state.categories
//     })
//     const [categoryName, setCategoryName] = useState('')
//     const [categoryClientErrors, setCategoryClientErrors] = useState({})
//     const categoryErrors = {}
//     const dispatch = useDispatch() 


//     const runCategoryClientValidations = () => {
//         if(categoryName.trim().length === 0) {
//             categoryErrors.name = 'name cannot be empty'
//         }
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         const formData = {
//             name: categoryName
//         }

//         runCategoryClientValidations()

//         const resetForm = () => {
//             setCategoryName('')
//         }

//         if(Object.keys(categoryErrors).length === 0) {            
//             dispatch(addCategory({ formData, resetForm }))
//         } else {
//             setCategoryClientErrors(categoryErrors)
//         }
//     }

//     return (
//         <div>
//             <h2>Add Category</h2>
//             { errors &&  (
//                 <div className="alert alert-danger">
//                     <b>Server Errors</b> 
//                     <ul>
//                         { errors.serverErrors.map((ele, i) => {
//                             return <li key={i}>{ ele.msg } </li>
//                         })}
//                     </ul>
//                 </div> 
//             )}
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label className="form-label" htmlFor="name">Enter Name</label><br />
//                     <input 
//                         type="text" 
//                         value={categoryName} 
//                         id="name"
//                         onChange={(e) => {
//                             setCategoryName(e.target.value) 
//                         }} 
//                         className="form-control"
//                     /> 
//                     { categoryClientErrors.name && <p className="text-danger">{ categoryClientErrors.name }</p>}
//                 </div>
//                 <input type="submit" className="btn btn-primary mt-3"/>
//             </form>
//         </div>
//     )
// }


/////////////////////////////////////////////////////////

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addCategory, updateCategory } from './categoriesSlice';

// export default function CategoriesForm({ editCategoryId, setEditCategoryId }) {
//     const { data: categories, errors } = useSelector((state) => state.categories);
//     const [categoryName, setCategoryName] = useState('');
//     const [categoryClientErrors, setCategoryClientErrors] = useState({});
//     const dispatch = useDispatch();
//     const categoryErrors = {};

//     // Populate the form with the selected category name in edit mode
//     useEffect(() => {
//         if (editCategoryId) {
//             const categoryToEdit = categories.find(cat => cat._id === editCategoryId);
//             if (categoryToEdit) {
//                 setCategoryName(categoryToEdit.name);
//             }
//         } else {
//             setCategoryName('');
//         }
//     }, [editCategoryId, categories]);

//     const runCategoryClientValidations = () => {
//         if (categoryName.trim().length === 0) {
//             categoryErrors.name = 'Name cannot be empty';
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formData = { name: categoryName };

//         runCategoryClientValidations();

//         const resetForm = () => {
//             setCategoryName('');
//             setCategoryClientErrors({}); // Reset client-side errors
//         };

//         if (Object.keys(categoryErrors).length === 0) {
//             if (editCategoryId) {
//                 dispatch(updateCategory({ formData, id: editCategoryId, resetForm }));
//                 setEditCategoryId(null);
//             } else {
//                 dispatch(addCategory({ formData, resetForm }));
//             }
//         } else {
//             setCategoryClientErrors(categoryErrors); // Set validation errors if found
//         }
//     };

//     return (
//         <div>
//             <h2>{editCategoryId ? 'Edit Category' : 'Add Category'}</h2>
//             {errors && (
//                 <div className="alert alert-danger">
//                     <b>Server Errors</b>
//                     <ul>
//                         {errors.serverErrors.map((err, i) => (
//                             <li key={i}>{err.msg}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="name">Enter Name</label><br />
//                     <input
//                         type="text"
//                         value={categoryName}
//                         id="name"
//                         onChange={(e) => {
//                             setCategoryName(e.target.value);
//                             setCategoryClientErrors({}); // Clear client-side errors on input change
//                         }}
//                         className="form-control"
//                     />
//                     {categoryClientErrors.name && <p className="text-danger">{categoryClientErrors.name}</p>}
//                 </div>
//                 <input type="submit" className="btn btn-primary mt-3" value={editCategoryId ? 'Update Category' : 'Add Category'} />
//             </form>
//         </div>
//     );
// }


// ///////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addCategory, clearAddErrors } from './categoriesSlice';

// export default function CategoryForm() {
//   const [categoryName, setCategoryName] = useState(''); // Controlled input for category name
//   const dispatch = useDispatch();
//   const { addErrors } = useSelector((state) => state.categories); // Get add-specific errors from the state

//   // Clear the addErrors when the component mounts or when categoryName changes
//   useEffect(() => {
//     dispatch(clearAddErrors()); // Clear previous errors when form is rendered
//   }, [dispatch, categoryName]);

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (categoryName.trim() === '') {
//       // Display error if the name is empty
//       return dispatch(clearAddErrors({ name: 'Category name cannot be empty' }));
//     }

//     const formData = { name: categoryName };

//     // Dispatch the addCategory action to the Redux store
//     dispatch(
//       addCategory({
//         formData,
//         resetForm: () => setCategoryName(''), // Clear form input on success
//       })
//     );
//   };

//   return (
//     <div>
//       <h2>Add Category</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="categoryName">Category Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="categoryName"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)} // Update the state as user types
//           />
//           {/* Show any add-specific error messages */}
//           {addErrors && addErrors.name && (
//             <small className="text-danger">{addErrors.name}</small>
//           )}
//         </div>
//         <button type="submit" className="btn btn-primary mt-3">
//           Add Category
//         </button>
//       </form>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, clearAddErrors, setAddErrors } from './categoriesSlice'; // Import setAddErrors

export default function CategoryForm() {
  const [categoryName, setCategoryName] = useState(''); // Controlled input for category name
  const dispatch = useDispatch();
  const { addErrors } = useSelector((state) => state.categories); // Get add-specific errors from the state

  // Clear the addErrors when the component mounts or when categoryName changes
  useEffect(() => {
    dispatch(clearAddErrors()); // Clear previous errors when form is rendered
  }, [dispatch]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation: If the category name is empty, show a manual error
    if (categoryName.trim() === '') {
      console.log('Dispatching empty field error');
      dispatch(setAddErrors({ name: 'Category name cannot be empty' })); // Dispatch the client-side error
      return;
    }

    const formData = { name: categoryName };

    // Dispatch the addCategory action to the Redux store
    dispatch(
      addCategory({
        formData,
        resetForm: () => setCategoryName(''), // Clear form input on success
      })
    );
  };

  return (
    <div>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)} // Update the state as user types
          />
          
          {/* Show any add-specific error messages */}
          {addErrors && addErrors.name && (
            <div className="alert alert-danger mt-2">{addErrors.name}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add Category
        </button>
      </form>
    </div>
  );
}
