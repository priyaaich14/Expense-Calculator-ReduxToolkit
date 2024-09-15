const express = require('express')
const cors = require('cors')
const { checkSchema } = require('express-validator')
const configureDB = require('./config/db')
const categoryCltr = require('./app/controllers/category-cltr')
const expenseCltr = require('./app/controllers/expense-cltr')
const {categoryValidationSchema,idCatValidationSchema} = require('./app/validators/category-validator')
const {expenseValidationSchema,idExpValidationSchema} = require('./app/validators/expense-validator')
const port = 3033

const app = express()
app.use(express.json())
app.use(cors())
configureDB()

// Create Category
app.post('/api/categories', checkSchema(categoryValidationSchema), categoryCltr.create)
// Get all Categories
app.get('/api/categories', categoryCltr.list)
// Delete Category
app.delete('/api/categories/:id', checkSchema(idCatValidationSchema), categoryCltr.remove)
// Update Category
app.put('/api/categories/:id', checkSchema({ ...idCatValidationSchema, ...categoryValidationSchema }), categoryCltr.update)
//Show Category
app.get('/api/categories/:id',checkSchema(idCatValidationSchema), categoryCltr.show)
// Create Expense
app.post('/api/expenses', checkSchema(expenseValidationSchema), expenseCltr.create)
// Get all Expenses
app.get('/api/expenses', expenseCltr.list)
//Show Expense
app.get('/api/expenses/:id',checkSchema(idExpValidationSchema), expenseCltr.show)
// Delete Expense
app.delete('/api/expenses/:id', checkSchema(idExpValidationSchema), expenseCltr.remove)
// Update Expense
app.put('/api/expenses/:id', checkSchema({ ...idExpValidationSchema, ...expenseValidationSchema }), expenseCltr.update)

app.listen(port, () => {
  console.log('Server running on port', port)
})
