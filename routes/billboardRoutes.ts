import express from 'express'
import { getBillBoards, getBillBoard, createBillBoard, updateBillBoard, deleteBillBoard } from '../controllers/billboardController'

const router = express.Router()


//get all billboards
router.get('/:storeId/billboards', getBillBoards)

//get a billboard
router.get('/billboards/:id', getBillBoard)

//create a billboard
router.post('/:storeId/billboards', createBillBoard)

//Update and Patch
router.patch('/billboards/:id', updateBillBoard)

//Delete
router.delete('/billboards/:id', deleteBillBoard)

export default router