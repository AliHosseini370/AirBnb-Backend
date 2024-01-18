import express from "express";
import { getStores, getStore, createStore, updateStore, deleteStore } from '../controllers/storeController'


const router = express.Router()


//get all store
router.get('/', getStores)

//get a single store
router.get('/:id', getStore)

//create new store
router.post('/', createStore)

//update a store
router.patch('/:id', updateStore)

//delete a store
router.delete('/:id', deleteStore)

export default router