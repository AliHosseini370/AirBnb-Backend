import express from 'express'
import { getDiscounts, getDiscount, createDiscount, updateDiscount, deleteDiscount } from '../controllers/discountController'

const router = express.Router()

//Get All Discrounts Of A Store
router.get('/:storeId/discounts', getDiscounts)

//Get And Check Dsicount
router.get('/discounts/:discountcode', getDiscount)

//Create Discount
router.post('/:storeId/discounts', createDiscount)

//Update And Patch Discount
router.patch('/discounts/:id', updateDiscount)

//Delete Discount
router.delete('/discounts/:id', deleteDiscount)



export default router