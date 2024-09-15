// // import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'//create asyncthunk is middleware
// // import axios from './config/axios'

// // const initialState ={
// //     data:[],
// //     errors:null,
// //     status:'idle'
// // }
// //  export const fetchExpenses= createAsyncThunk('expenses/fetchExpenses', async()=>{
// //     const response = await axios.get('/api/expenses')
// //     // console.log('thunk', response.data)
// //     return response.data
// //  })

// // const expensesSlice= createSlice({
// //     name:'expenses',
// //     initialState:initialState,
// //     extraReducers : (builder) =>{
// //         builder.addCase(fetchExpenses.fulfilled,(state, action)=>{
// //             state.data = action.payload
// //         })
// //     }
// // })
// // export default expensesSlice.reducer

// ///////////////////////////////////////////////////////

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from './config/axios';

// const initialState = {
//     data: [],
//     errors: null,
//     status: 'idle',
// };

// export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async () => {
//     const response = await axios.get('/api/expenses');
//     return response.data;
// });

// export const addExpense = createAsyncThunk('expenses/addExpense', async (formData) => {
//     const response = await axios.post('/api/expenses', formData);
//     return response.data;
// });

// export const updateExpense = createAsyncThunk('expenses/updateExpense', async ({ id, formData }) => {
//     const response = await axios.put(`/api/expenses/${id}`, formData);
//     return response.data;
// });

// export const deleteExpense = createAsyncThunk('expenses/deleteExpense', async (id) => {
//     const response = await axios.delete(`/api/expenses/${id}`);
//     return response.data;
// });

// const expensesSlice = createSlice({
//     name: 'expenses',
//     initialState,
//     extraReducers: (builder) => {
//         builder.addCase(fetchExpenses.fulfilled, (state, action) => {
//             state.data = action.payload;
//         });
//         builder.addCase(addExpense.fulfilled, (state, action) => {
//             state.data.push(action.payload);
//         });
//         builder.addCase(updateExpense.fulfilled, (state, action) => {
//             const index = state.data.findIndex(exp => exp._id === action.payload._id);
//             state.data[index] = action.payload;
//         });
//         builder.addCase(deleteExpense.fulfilled, (state, action) => {
//             state.data = state.data.filter(exp => exp._id !== action.payload._id);
//         });
//     },
// });

// export default expensesSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './config/axios';

const initialState = {
    data: [],
    addErrors: null,
    editErrors: null, // Add edit-specific errors
    status: 'idle',
};

export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async () => {
    const response = await axios.get('/api/expenses');
    return response.data;
});

export const addExpense = createAsyncThunk('expenses/addExpense', async (formData) => {
    const response = await axios.post('/api/expenses', formData);
    return response.data;
});

export const updateExpense = createAsyncThunk('expenses/updateExpense', async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/expenses/${id}`, formData);
        return response.data;
    } catch (err) {
        if (err.response) {
            return rejectWithValue(err.response.data.errors);
        }
    }
});

export const deleteExpense = createAsyncThunk('expenses/deleteExpense', async (id) => {
    const response = await axios.delete(`/api/expenses/${id}`);
    return response.data;
});

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        clearEditErrors: (state) => {
            state.editErrors = null; // Clear edit-specific errors
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchExpenses.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(addExpense.fulfilled, (state, action) => {
            state.data.push(action.payload);
        });
        builder.addCase(updateExpense.fulfilled, (state, action) => {
            const index = state.data.findIndex(exp => exp._id === action.payload._id);
            state.data[index] = action.payload;
            state.editErrors = null; // Clear errors on success
        });
        builder.addCase(updateExpense.rejected, (state, action) => {
            state.editErrors = action.payload; // Capture server-side errors
        });
        builder.addCase(deleteExpense.fulfilled, (state, action) => {
            state.data = state.data.filter(exp => exp._id !== action.payload._id);
        });
    },
});

export const { clearEditErrors } = expensesSlice.actions;
export default expensesSlice.reducer;

