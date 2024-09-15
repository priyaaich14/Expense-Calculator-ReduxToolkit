const Category = require('../models/category-model')
const {validationResult} = require('express-validator')
const categoryCltr = {}
const { format } = require('date-fns')

categoryCltr.list = (req, res) => {
    Category.find()
      .then((categories) => {
        // Convert tasks dates to IST format before sending response
        const categoriesWithIST = categories.map(category => convertToIST(category))
        res.json(categoriesWithIST)
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  }

  categoryCltr.create = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
  
    const { name } = req.body
    const category = new Category({ name })
  
    category.save()
      .then((savedCategory) => {
        res.status(201).json(convertToIST(savedCategory))
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  }

  categoryCltr.show = (req,res) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { id } = req.params
    Category.findById(id)
    .then((category) =>{
      if(!category){
        return res.status(404).json({ error: 'Category not found' })
      }
      res.json(convertToIST(category))
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
  }

  categoryCltr.remove = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
  
    const { id } = req.params;
    Category.findByIdAndDelete(id)
      .then((deletedCategory) => {
        if (!deletedCategory) {
          return res.status(404).json({ error: 'Category not found' })
        }
        res.json(deletedCategory)
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  }

  categoryCltr.update = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
  
    const { id } = req.params
    const { name } = req.body
  
    Category.findByIdAndUpdate(id, { name }, { new: true })
      .then((updatedCategory) => {
        if (!updatedCategory) {
          return res.status(404).json({ error: 'Category not found' })
        }
        res.json(convertToIST(updatedCategory))
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
  
  module.exports = categoryCltr