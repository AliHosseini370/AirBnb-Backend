import exress from 'express'
import { getSizes, getSize, createSize, updateSize, deleteSize } from '../controllers/sizeController'

const router = exress.Router()


//get all Sizes of a store
router.get('/:storeId/sizes', getSizes)

//get a Size
router.get('/sizes/:id', getSize)

//create a Size
router.post('/:storeId/sizes', createSize)

//Patch/Update a Size
router.patch('/sizes/:id', updateSize)

//Delete Size
router.delete('/sizes/:id', deleteSize)

export default router