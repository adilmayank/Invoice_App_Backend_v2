require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const PORT = process.env.production || 5000

const {
  customerRouter,
  contactAgentRouter,
  paymentTermRouter,
  productRouter,
  quotationSummaryRouter,
  taxRouter,
} = require('./Routers')
const { formatResponse } = require('./Middlewares/FormatResponse')

app.use(express.json())

// Custom reponse formatter
app.use(formatResponse)

// Customer request handler
app.use(customerRouter)

// Contact agent request handler
app.use(contactAgentRouter)

// Payment term request handler
app.use(paymentTermRouter)

// Product request handler
app.use(productRouter)

// Tax request handler
app.use(taxRouter)

// Quotation summary request handler
app.use(quotationSummaryRouter)

// Not found
app.get('*', (req, res) => {
  res.status(404).send('Not Found')
})

async function dbConnect() {
  return new Promise((resolve, reject) => {
    resolve(
      mongoose.connect(
        `mongodb+srv://adilmayank5894:${process.env.MONGODB_PASSWORD_2}@cluster0.wkg7rt9.mongodb.net/?retryWrites=true&w=majority`
      )
    )
  })
}

app.listen(PORT, async () => {
  try {
    await dbConnect()
    console.log(`Connected to DB. Listening to port: ${PORT}`)
  } catch (error) {
    console.log(error)
  }
})
