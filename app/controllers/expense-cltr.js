const Expense = require ('../models/expense-model')
const {validationResult} = require('express-validator')
const expenseCltr = {}
const { format } = require('date-fns')

expenseCltr.list = (req, res) => {
    Expense.find()
      .then((expenses) => {
        // Convert tasks dates to IST format before sending response
        const expensesWithIST = expenses.map(expense => convertToIST(expense))
        res.json(expensesWithIST)
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  }

  expenseCltr.create = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
  
    const { expenseDate, title, amount, category, description } = req.body
    const expense = new Expense({expenseDate, title, amount, category, description })
  
    expense.save()
      .then((savedExpense) => {
        res.status(201).json(convertToIST(savedExpense))
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  }

  expenseCltr.show = (req,res) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { id } = req.params
    Expense.findById(id)
    .then((exp) =>{
      if(!exp){
        return res.status(404).json({ error: 'Expense not found' })
      }
      res.json(convertToIST(exp))
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
  }

  expenseCltr.remove = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
  
    const { id } = req.params
    Expense.findByIdAndDelete(id)
      .then((deletedExpense) => {
        if (!deletedExpense) {
          return res.status(404).json({ error: 'Expense not found' })
        }
        res.json(deletedExpense)
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  }

  expenseCltr.update = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
  
    const { id } = req.params
    const {expenseDate, title, amount, category, description } = req.body
  
    Expense.findByIdAndUpdate(id, {expenseDate, title, amount, category, description }, { new: true })
      .then((updatedExpense) => {
        if (!updatedExpense) {
          return res.status(404).json({ error: 'Expense not found' })
        }
        res.json(convertToIST(updatedExpense))
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  }
  
// Function to convert timestamps to IST format
function convertToIST(expense) {
    const istDateFormat = 'yyyy-MM-dd HH:mm:ss' // Desired IST format string
    return {
      ...expense.toObject(),
      createdAt: format(expense.createdAt, istDateFormat),
      updatedAt: format(expense.updatedAt, istDateFormat)
    }
  }
  

module.exports = expenseCltr