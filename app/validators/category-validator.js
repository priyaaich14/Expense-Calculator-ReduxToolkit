const Category = require("../models/category-model")

const categoryValidationSchema = {
    name: {
      in: ['body'],
      exists: {
        errorMessage: 'Name is required'
      },
      notEmpty: {
        errorMessage: 'Name cannot be empty'
      },
      custom:{
            options:function(value){
              return Category.findOne({name:{$regex:`^${value}$`,$options:'i'}})
              .then((category) => {
                if(category){
                  throw new Error('category name already taken')
                }else {
                  return true
                }
              })
            }
      },
      trim: true
    }
  }
  const idCatValidationSchema = {
    id: {
      in: ['params'],
      isMongoId: {
        errorMessage: 'Invalid object Id format'
      }
    }
  }
  module.exports = {
    categoryValidationSchema,
    idCatValidationSchema
  }
  