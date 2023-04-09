const express = require('express')

const app = express()

const PORT = process.env.production || 5000

const { customerRouter } = require('./Routers')
const {formatResponse} = require("./Middlewares/FormatResponse")

app.use(express.json())

// Custom reponse formatter
app.use(formatResponse)

// Customer request handler
app.use(customerRouter)

// Not found
app.get('*', (req, res) => {
  res.status(404).send('Not Found')
})

app.listen(PORT, () => {
  console.log('Listening')
})
