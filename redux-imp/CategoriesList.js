// export default function CategoriesList(){

//     return (
//         <div>
//             <h2>Cartogries list</h2>
//         </div>
//     )
// }

//////////////////////////////////////////////////////////

// import { useDispatch, useSelector } from 'react-redux';
// import { deleteCategory } from './categoriesSlice';

// export default function CategoriesList({ setEditCategoryId }) {
//     const { data: categories } = useSelector((state) => state.categories);
//     const dispatch = useDispatch();

//     const handleDelete = (category) => {
//         const userConfirm = window.confirm('Are you sure?');
//         if (userConfirm) {
//             dispatch(deleteCategory(category._id));
//         }
//     };

//     const handleEdit = (category) => {
//         setEditCategoryId(category._id);
//     };

//     return (
//         <div>
//             <h2>Listing Categories - {categories.length}</h2>
//             {categories.length > 0 && (
//                 <div className="table-responsive">
//                     <table className="table table-bordered table-striped">
//                         <thead className="thead-dark">
//                             <tr>
//                                 <th>Category Name</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {categories.map((category) => (
//                                 <tr key={category._id}>
//                                     <td>{category.name}</td>
//                                     <td>
//                                         <div className="float-end">
//                                             <button
//                                                 className="btn btn-primary btn-sm mr-2"
//                                                 onClick={() => handleEdit(category)}
//                                             >
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 className="btn btn-danger btn-sm"
//                                                 onClick={() => handleDelete(category)}
//                                             >
//                                                 Remove
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }


////////////////////////////////////////////////////////////////

// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteCategory } from './categoriesSlice';
// import ExpenseModal from './ExpenseModal';

// export default function CategoriesList({ setEditCategoryId }) {
//     const { data: categories } = useSelector((state) => state.categories);
//     const { data: expenses } = useSelector((state) => state.expenses);  
//     const dispatch = useDispatch();
    
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     const handleDelete = (category) => {
//         const userConfirm = window.confirm('Are you sure?');
//         if (userConfirm) {
//             dispatch(deleteCategory(category._id));
//         }
//     };

//     const handleEdit = (category) => {
//         setEditCategoryId(category._id);
//     };

//     const handleShow = (category) => {
//         setSelectedCategory(category);
//         setShowModal(true);
//     };

//     const closeModal = () => setShowModal(false);

//     return (
//         <div>
//             {/* <h2>Listing Categories - {categories.length}</h2>  Remove any extra instances of this header */}
//             {categories.length > 0 && (
//                 <div className="table-responsive">
//                     <table className="table table-bordered table-striped">
//                         <thead className="thead-dark">
//                             <tr>
//                                 <th>Category Name</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {categories.map((category) => (
//                                 <tr key={category._id}>
//                                     <td>{category.name}</td>
//                                     <td>
//                                         <div className="float-end">
//                                             <button
//                                                 className="btn btn-info btn-sm mr-2"
//                                                 onClick={() => handleShow(category)}
//                                             >
//                                                 Show
//                                             </button>
//                                             <button
//                                                 className="btn btn-primary btn-sm mr-2"
//                                                 onClick={() => handleEdit(category)}
//                                             >
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 className="btn btn-danger btn-sm"
//                                                 onClick={() => handleDelete(category)}
//                                             >
//                                                 Remove
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//             {selectedCategory && (
//                 <ExpenseModal
//                     show={showModal}
//                     handleClose={closeModal}
//                     category={selectedCategory}
//                     expenses={expenses.filter(exp => exp.category === selectedCategory._id)}  
//                 />
//             )}
//         </div>
//     );
// }

////////////////////////////////////////////////////////////////

// import React, { useState} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteCategory } from './categoriesSlice';
// import CategoryModal from './CategoryModal';



// export default function CategoryList() {
//     const { data: categories } = useSelector((state) => state.categories);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const dispatch = useDispatch();
  
//     // Confirm deletion of category
//     const handleDelete = (id) => {
//       const confirm = window.confirm('Are you sure you want to delete this category?');
//       if (confirm) {
//         dispatch(deleteCategory(id)); // Dispatch the deleteCategory action
//       }
//     };
  
//     // Open modal for editing and track the last focused element
//     const handleEdit = (category) => {
//       setSelectedCategory(category);  // Set the selected category for editing
//       setModalIsOpen(true);  // Open the modal
//     };
  
//     // Close the modal
//     const handleModalClose = () => {
//       setModalIsOpen(false);
//     };
  
//     return (
//       <div>
//         <h2>Listing Categories - {categories.length}</h2>
//         {categories.length > 0 && (
//           <table className="table table-bordered table-striped">
//             <thead>
//               <tr>
//                 <th>Category Name</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories.map((category) => (
//                 <tr key={category._id}>
//                   <td>{category.name}</td>
//                   <td>
//                     <div className="float-end">
//                       <button
//                         className="btn btn-primary btn-sm mr-2"
//                         onClick={() => handleEdit(category)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => handleDelete(category._id)}
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
  
//         {/* Category Modal for Editing */}
//         {modalIsOpen && (
//           <CategoryModal
//             category={selectedCategory}
//             isOpen={modalIsOpen}
//             onRequestClose={handleModalClose}  // Close the modal
//           />
//         )}
//       </div>
//     );
//   }


// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteCategory } from './categoriesSlice'; // Now properly imported
// import CategoryModal from './CategoryModal';

// export default function CategoryList() {
//   const { data: categories } = useSelector((state) => state.categories);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const dispatch = useDispatch();

//   // Confirm deletion of category
//   const handleDelete = (id) => {
//     const confirm = window.confirm('Are you sure you want to delete this category?');
//     if (confirm) {
//       dispatch(deleteCategory(id)); // Dispatch the deleteCategory action
//     }
//   };

//   // Open modal for editing
//   const handleEdit = (category) => {
//     setSelectedCategory(category); // Set the selected category for editing
//     setModalIsOpen(true); // Open the modal
//   };

//   // Close the modal
//   const handleModalClose = () => {
//     setModalIsOpen(false);
//   };

//   return (
//     <div>
//       <h2>Listing Categories - {categories.length}</h2>
//       {categories.length > 0 && (
//         <table className="table table-bordered table-striped">
//           <thead>
//             <tr>
//               <th>Category Name</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((category) => (
//               <tr key={category._id}>
//                 <td>{category.name}</td>
//                 <td>
//                   <div className="float-end">
//                     <button
//                       className="btn btn-primary btn-sm mr-2"
//                       onClick={() => handleEdit(category)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDelete(category._id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Category Modal for Editing */}
//       {modalIsOpen && (
//         <CategoryModal
//           category={selectedCategory}
//           isOpen={modalIsOpen}
//           onRequestClose={handleModalClose} // Close the modal
//         />
//       )}
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory } from './categoriesSlice'; // Now properly imported
import CategoryModal from './CategoryModal';
import CategoryShowModal from './CategoryShowModal'; // Import the new modal

export default function CategoryList() {
  const { data: categories } = useSelector((state) => state.categories);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showModalIsOpen, setShowModalIsOpen] = useState(false); // New state for the show modal
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();

  // Confirm deletion of category
  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this category?');
    if (confirm) {
      dispatch(deleteCategory(id)); // Dispatch the deleteCategory action
    }
  };

  // Open modal for editing
  const handleEdit = (category) => {
    setSelectedCategory(category); // Set the selected category for editing
    setModalIsOpen(true); // Open the modal
  };

  // Open modal for showing category details
  const handleShow = (category) => {
    setSelectedCategory(category); // Set the selected category for showing details
    setShowModalIsOpen(true); // Open the show modal
  };

  // Close modals
  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleShowModalClose = () => {
    setShowModalIsOpen(false);
  };

  return (
    <div>
      <h2>Listing Categories - {categories.length}</h2>
      {categories.length > 0 && (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>
                  <div className="float-end">
                    <button
                      className="btn btn-info btn-sm mr-2"
                      onClick={() => handleShow(category)}
                    >
                      Show
                    </button>
                    <button
                      className="btn btn-primary btn-sm mr-2"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(category._id)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Category Modal for Editing */}
      {modalIsOpen && (
        <CategoryModal
          category={selectedCategory}
          isOpen={modalIsOpen}
          onRequestClose={handleModalClose} // Close the modal
        />
      )}

      {/* Category Show Modal */}
      {showModalIsOpen && (
        <CategoryShowModal
          category={selectedCategory}
          isOpen={showModalIsOpen}
          onRequestClose={handleShowModalClose} // Close the modal
        />
      )}
    </div>
  );
}
