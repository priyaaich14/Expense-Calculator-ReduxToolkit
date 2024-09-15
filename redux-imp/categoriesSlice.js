
// import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
// import axios from "./config/axios"


// const initialState={
//     data:[],
//     errors:null,
//     stats:'idle'
// }

// export const fetchCategories=createAsyncThunk('categories/fetchCategories',async()=>{
//     const response=await axios.get('/api/category')
//     console.log('thunk',response.data)
//     return response.data
// })

// export const addCategory=createAsyncThunk('categories/addCategory',async({formData,resetForm},{rejectWithValue})=>{
//     try{    
//         const response=await axios.post('/api/category',formData)
//         console.log(response.data)
//         resetForm()
//         return response.data

//     }catch(err){
//         if(err.response){
//             return rejectWithValue({
//                 serverErrors:err.response.data.errors
//             })
//         }
//    }
// })

// const categoriesSlice=createSlice({
//     name:'categories',
//     initialState:initialState,
//     extraReducers:(builder)=>{
//         builder.addCase(fetchCategories.fulfilled,(state,action)=>{
//             state.data=action.payload
//         })
//         builder.addCase(addCategory.fulfilled,(state,action)=>{
//             state.data.push(action.payload)
//             state.errors=null
//         })
//         builder.addCase(addCategory.rejected,(state,action)=>{
//             state.errors=action.payload
//         })
//     }
// })

// export default categoriesSlice.reducer
////////////////////////////////////////////////////////////////

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from './config/axios'

// const initialState = {
//     data: [],
//     errors: null, 
//     status: 'idle'
// }

// export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
//     const response = await axios.get('/api/categories'); 
//     // console.log('thunk',response.data)
//     return response.data 
// })

// export const addCategory = createAsyncThunk('categories/addCategory', async ({ formData, resetForm }, { rejectWithValue })=>{
//     try {
//         const response = await axios.post('/api/categories', formData)
//         resetForm()
//         return response.data 
//     } catch(err) {
//         if(err.response) {
//             console.log(err.response.data);
//             return rejectWithValue({
//                 serverErrors: err.response.data.errors
//             })
//         }
//     }
// })

// const categoriesSlice = createSlice({
//     name: 'categories',
//     initialState: initialState,
//     extraReducers: (builder) => {
//         builder.addCase(fetchCategories.fulfilled, (state, action) => {
//             state.data = action.payload
//         })
//         builder.addCase(addCategory.fulfilled, (state, action) => {
//             state.data.push(action.payload)
//             state.errors = null 
//         })
//         builder.addCase(addCategory.rejected, (state, action) => {
//             state.errors = action.payload
//         })

//     }
// })

// export default categoriesSlice.reducer; 

//////////////////////////////////////////////////////////

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from './config/axios';

// const initialState = {
//     data: [],
//     errors: null,
//     status: 'idle',
// };

// // Fetch categories async action
// export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
//     const response = await axios.get('/api/categories');
//     return response.data;
// });

// // Add a new category async action
// export const addCategory = createAsyncThunk('categories/addCategory', async ({ formData, resetForm }, { rejectWithValue }) => {
//     try {
//         const response = await axios.post('/api/categories', formData);
//         resetForm();
//         return response.data;
//     } catch (err) {
//         if (err.response) {
//             return rejectWithValue({
//                 serverErrors: err.response.data.errors,
//             });
//         }
//     }
// });

// // Update category async action
// export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ formData, id, resetForm }, { rejectWithValue }) => {
//     try {
//         const response = await axios.put(`/api/categories/${id}`, formData);
//         resetForm();
//         return response.data;
//     } catch (err) {
//         if (err.response) {
//             return rejectWithValue({
//                 serverErrors: err.response.data.errors,
//             });
//         }
//     }
// });

// // Delete category async action
// export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id, { rejectWithValue }) => {
//     try {
//         const response = await axios.delete(`/api/categories/${id}`);
//         return response.data;
//     } catch (err) {
//         return rejectWithValue(err.response.data);
//     }
// });

// // Category slice definition
// const categoriesSlice = createSlice({
//     name: 'categories',
//     initialState,
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchCategories.fulfilled, (state, action) => {
//                 //console.log('Fetched categories:', action.payload);
//                 state.data = action.payload;
//             })
//             .addCase(addCategory.fulfilled, (state, action) => {
//                 state.data.push(action.payload);
//                 state.errors = null;
//             })
//             .addCase(addCategory.rejected, (state, action) => {
//                 state.errors = action.payload;
//             })
//             .addCase(updateCategory.fulfilled, (state, action) => {
//                 const index = state.data.findIndex(cat => cat._id === action.payload._id);
//                 if (index !== -1) {
//                     state.data[index] = action.payload;
//                 }
//                 state.errors = null;
//             })
//             .addCase(updateCategory.rejected, (state, action) => {
//                 state.errors = action.payload;
//             })
//             .addCase(deleteCategory.fulfilled, (state, action) => {
//                 state.data = state.data.filter(cat => cat._id !== action.payload._id);
//                 state.errors = null;
//             })
//             .addCase(deleteCategory.rejected, (state, action) => {
//                 state.errors = action.payload;
//             });
//     },
// });

// export default categoriesSlice.reducer;


//////////////////////////////////////////////

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from './config/axios'; // Adjust the import path for axios

// const initialState = {
//   data: [], // Holds the list of categories
//   addErrors: null, // Holds errors for adding a category
//   editErrors: null, // Holds errors for editing a category
//   status: 'idle', // Holds the status of async actions
// };

// // Fetch categories
// export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
//   const response = await axios.get('/api/categories');
//   return response.data;
// });

// // Add a category
// export const addCategory = createAsyncThunk('categories/addCategory', async ({ formData, resetForm }, { rejectWithValue }) => {
//   try {
//     const response = await axios.post('/api/categories', formData);
//     resetForm(); // Clear the form on success
//     return response.data; // Return the newly added category
//   } catch (err) {
//     if (err.response) {
//       return rejectWithValue({
//         name: err.response.data.errors.name,
//       });
//     }
//   }
// });

// // Edit a category
// export const editCategory = createAsyncThunk('categories/editCategory', async ({ id, formData, resetForm }, { rejectWithValue }) => {
//   try {
//     const response = await axios.put(`/api/categories/${id}`, formData);
//     resetForm(); // Close the modal on success
//     return response.data; // Return the updated category
//   } catch (err) {
//     if (err.response) {
//       return rejectWithValue({
//         name: err.response.data.errors.name,
//       });
//     }
//   }
// });

// // Delete a category
// export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id, { rejectWithValue }) => {
//   try {
//     const response = await axios.delete(`/api/categories/${id}`);
//     return response.data; // Return the deleted category
//   } catch (err) {
//     if (err.response) {
//       return rejectWithValue({
//         error: 'Failed to delete category',
//       });
//     }
//   }
// });

// const categoriesSlice = createSlice({
//   name: 'categories',
//   initialState,
//   reducers: {
//     clearAddErrors: (state) => {
//       state.addErrors = null; // Clear add category errors
//     },
//     clearEditErrors: (state) => {
//       state.editErrors = null; // Clear edit category errors
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchCategories.fulfilled, (state, action) => {
//       state.data = action.payload;
//     });
//     builder.addCase(addCategory.fulfilled, (state, action) => {
//       state.data.push(action.payload); // Immediately add the new category to the list
//       state.addErrors = null; // Clear errors on success
//     });
//     builder.addCase(addCategory.rejected, (state, action) => {
//       state.addErrors = action.payload; // Store add category error
//     });
//     builder.addCase(editCategory.fulfilled, (state, action) => {
//       const index = state.data.findIndex(category => category._id === action.payload._id);
//       if (index !== -1) {
//         state.data[index] = action.payload; // Update the edited category in the list
//       }
//       state.editErrors = null; // Clear errors on success
//     });
//     builder.addCase(editCategory.rejected, (state, action) => {
//       state.editErrors = action.payload; // Store edit category error
//     });
//     builder.addCase(deleteCategory.fulfilled, (state, action) => {
//       state.data = state.data.filter(category => category._id !== action.payload._id); // Remove deleted category from the list
//     });
//   },
// });

// export const { clearAddErrors, clearEditErrors } = categoriesSlice.actions;
// export default categoriesSlice.reducer;


// Import the necessary libraries
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './config/axios'; // Adjust the path for axios as per your project

const initialState = {
  data: [],
  addErrors: null,
  editErrors: null,
  deleteErrors: null,
  status: 'idle',
};

// Fetch categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('/api/categories');
  return response.data;
});
// Add a category (handles server-side errors)
export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async ({ formData, resetForm }, { rejectWithValue }) => {
      try {
        const response = await axios.post('/api/categories', formData);
        resetForm(); // Clear the form on success
        return response.data; // Return the newly added category
      } catch (err) {
        if (err.response) {
          // Extract the message from the errors array in the response
          const errorMessage = err.response.data.errors?.[0]?.msg || 'Failed to add category';
          return rejectWithValue({
            name: errorMessage, // Use the extracted message for display
          });
        }
      }
    }
  );
  

// Edit a category
// export const editCategory = createAsyncThunk('categories/editCategory', async ({ id, formData, resetForm }, { rejectWithValue }) => {
//   try {
//     const response = await axios.put(`/api/categories/${id}`, formData);
//     resetForm();
//     return response.data;
//   } catch (err) {
//     if (err.response) {
//       return rejectWithValue({
//         name: err.response.data.errors.name,
//       });
//     }
//   }
// });

export const editCategory = createAsyncThunk(
    'categories/editCategory',
    async ({ id, formData, resetForm }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`/api/categories/${id}`, formData);
        resetForm(); // Close the modal on success
        return response.data;
      } catch (err) {
        if (err.response) {
          const errorMessage = err.response.data.errors?.[0]?.msg || 'Failed to edit category';
          return rejectWithValue({
            name: errorMessage,
          });
        }
      }
    }
  );

// Delete a category
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/api/categories/${id}`);
    return response.data; // Return the deleted category data
  } catch (err) {
    if (err.response) {
      return rejectWithValue({
        error: 'Failed to delete category',
      });
    }
  }
});

// Create the slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearAddErrors: (state) => {
      state.addErrors = null;
    },
    setAddErrors: (state, action) => {
        state.addErrors = action.payload; // Set add category errors (for client-side validation)
      },
    clearEditErrors: (state) => {
      state.editErrors = null;
    },
    setEditErrors: (state, action) => {
        state.editErrors = action.payload; // Set edit-specific errors
      },
    clearDeleteErrors: (state) => {
      state.deleteErrors = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetch categories
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    // Handle add category
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.addErrors = null;
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.addErrors = action.payload;
    });

    // Handle edit category
    builder.addCase(editCategory.fulfilled, (state, action) => {
      const index = state.data.findIndex((category) => category._id === action.payload._id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
      state.editErrors = null;
    });
    builder.addCase(editCategory.rejected, (state, action) => {
      state.editErrors = action.payload;
    });

    // Handle delete category
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.data = state.data.filter((category) => category._id !== action.payload._id);
      state.deleteErrors = null; // Clear delete errors on success
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.deleteErrors = action.payload; // Store delete-specific errors
    });
  },
});

export const { clearAddErrors,  setAddErrors, clearEditErrors, setEditErrors, clearDeleteErrors } = categoriesSlice.actions;
export default categoriesSlice.reducer;
