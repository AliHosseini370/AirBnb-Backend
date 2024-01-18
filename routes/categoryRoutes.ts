import express from 'express'
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController'

const router = express.Router()

//Get all Products of a store
router.get('/:storeId/categories', getCategories)

//Get a product
router.get('/categories/:id', getCategory)

//Create product
router.post('/:storeId/categories', createCategory)

//Update And Patch Product
router.patch('/categories/:id', updateCategory)

//Delete Product
router.delete('/categories/:id', deleteCategory)

export default router