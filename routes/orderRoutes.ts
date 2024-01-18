import express from 'express'
import { getOrders, getOrder, createPayment, updateOrder, deleteOrder } from '../controllers/orderController'

const router = express.Router()


//get all orders of a store
router.get('/:storeId/orders', getOrders)


//get a single order
router.get('/orders/:id', getOrder)


//create a new order in a store
router.post('/:storeId/orders', createPayment)

//callback route
router.get('/orders/callback')

//Update / Patch store
router.patch('/orders/:id', updateOrder)

//Delete order
router.delete('/orders/:id', deleteOrder)

export default router