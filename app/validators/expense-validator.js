//const { Date } = require("date-fns")
const Category = require("../models/category-model")

const expenseValidationSchema = {
    expenseDate: {
      in: ['body'],
      // toDate: true,
      // isISO8601: true,
      // errorMessage: 'Invalid date format'
      exists: {
        errorMessage: 'Date is required'
      },
      notEmpty: {
        errorMessage: 'Date cannot be empty'
      }, 
      isDate:{
        options :{format : 'yyyy-mm-dd'}
      },
      custom:{
        options : function(value){
          if(new Date(value)> new Date()){
            throw new Error('Expense date cannot be greater than today') 
          }
          return true
        } 
      }
    },
    title: {
      in: ['body'],
      exists: {
        errorMessage: 'Title is required'
      },
      notEmpty: {
        errorMessage: 'Title cannot be empty'
      },
      trim: true
    },
    amount: {
      in: ['body'],
      exists: {
        errorMessage: 'Amount is required'
      },
      notEmpty: {
        errorMessage: 'Amount cannot be empty'
      },
      isNumeric: {
        errorMessage: 'Amount must be a number'
      },
      isFloat: {
        options: { min: 1 },
        errorMessage: 'Amount must be greater than 0'
      },
      trim:true
    },
    category: {
      in: ['body'],
      exists: {
        errorMessage: 'Category is required'
      },
      notEmpty: {
        errorMessage: 'Category cannot be empty'
      },
      isMongoId:{
        errorMessage:'invalid mongo id'
      },
      custom:{
        options: function(value){
          return Category.findById(value)
          .then((category) =>{
            if(!category){
              throw new Error('Category id does not exist in DB')
            }
            return true
          })
        }
      }
      },
    description: {
      in: ['body'],
      optional: true,
      trim: true
    }
  }
  const idExpValidationSchema = {
    id: {
      in: ['params'],
      isMongoId: {
        errorMessage: 'Invalid object Id format'
      }
    }
  }
  module.exports = {
    expenseValidationSchema,
    idExpValidationSchema
  }