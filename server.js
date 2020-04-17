const express = require('express')
const {db} = require('./writedb')
const todoroute = require('./routes/todotask')


const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/',express.static(__dirname+ '/public'))
app.use('/todo', todoroute)
const PORT = process.env.PORT||2222;
db.sync()
  .then(() => {
    app.listen(PORT)
  })
  .catch((err) => {
    console.error(err)
  })