import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import storeRoutes from './routes/storeRoutes'
import productRoutes from './routes/productRoutes'
import billboardRoutes from './routes/billboardRoutes'
import categoryRoutes from './routes/categoryRoutes'
import colorRoutes from './routes/colorRoutes'
import sizeRoutes from './routes/sizeRoutes'
import discountRoutes from './routes/discountRoutes'
import orderRoutes from './routes/orderRoutes'

const app = express()

app.use(express.json())
app.use('/api/store', storeRoutes)
app.use('/api/', productRoutes)
app.use('/api/', billboardRoutes)
app.use('/api/', categoryRoutes)
app.use('/api/', colorRoutes)
app.use('/api/', sizeRoutes)
app.use('/api/', discountRoutes)
app.use('/api/', orderRoutes)



mongoose.connect(process.env.MONGO_URL as string)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to Mongo DB and listening on port', process.env.PORT)
        })
    })
    .catch( (error: any) => {
        console.log(error)
    })
