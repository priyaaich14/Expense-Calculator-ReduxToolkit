const mongoose = require('mongoose')

const { Schema, model } = mongoose

const expenseSchema = new Schema({
    expenseDate: {
      type: Date,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category'
    },
    description: {
      type: String
    }
  }, { timestamps: true })
  
  const Expense = model('Expense', expenseSchema)

  module.exports = Expense