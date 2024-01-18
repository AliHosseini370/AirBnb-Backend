const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const listingRoutes = require('./routes/listingRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const reviewRoutes = require('./routes/reviewRoutes')

const app = express()

app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/listings', listingRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/reviews', reviewRoutes)


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to Mongo DB and listening on port', process.env.PORT)
        })
    })
    .catch( (error) => {
        console.log(error)
    })