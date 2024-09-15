const mongoose = require('mongoose')

const configureDB = ()=>{
mongoose.connect('mongodb://127.0.0.1:27017/category-expense-app-mvc-mar24')
  .then((db) => {
    console.log('Connected to DB',db.connections[0].name)
  })
  .catch((err) => {
    console.log('Error connecting to DB', err)
  })
}

module.exports = configureDB