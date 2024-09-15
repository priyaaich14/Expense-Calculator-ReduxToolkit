import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { editCategory, clearEditErrors, setEditErrors } from './categoriesSlice'; // Import setEditErrors

export default function CategoryModal({ category, isOpen, onRequestClose }) {
  const [categoryName, setCategoryName] = useState(''); // Controlled input for category name
  const dispatch = useDispatch();
  const { editErrors } = useSelector((state) => state.categories); // Get edit-specific errors from the state

  // Prefill the modal with the current category name when editing
  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
    }
  }, [category]);

  // Clear edit-specific errors when the modal opens or closes
  useEffect(() => {
    if (isOpen) {
      dispatch(clearEditErrors()); // Clear previous errors
    }
  }, [isOpen, dispatch]);

  // Handle form submission for editing the category
  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation: If the category name is empty, show a manual error
    if (categoryName.trim() === '') {
      dispatch(setEditErrors({ name: 'Category name cannot be empty' })); // Dispatch client-side error
      return;
    }

    const formData = { name: categoryName };

    // Dispatch the editCategory action to the Redux store
    dispatch(
      editCategory({
        id: category._id,
        formData,
        resetForm: onRequestClose, // Close the modal on success
      })
    );
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            {/* Show any edit-specific error messages */}
            {editErrors && editErrors.name && (
              <div className="alert alert-danger mt-2">{editErrors.name}</div>
            )}
          </div>
          <Button type="submit" variant="primary" className="mt-3">
            Update Category
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
