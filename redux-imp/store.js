import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from './categoriesSlice'
import expensesReducer from './expensesSlice'

const store = configureStore({
    reducer :{
        categories : categoriesReducer,
        expenses : expensesReducer
    }
})

export default store