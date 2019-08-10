const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 3000
const users = require('./routes/routes')


// middelwares
app.use(cors())
app.use(bodyParser.json())

app.use('/users',users)

app.listen(port ,()=> console.log('litening ...'))