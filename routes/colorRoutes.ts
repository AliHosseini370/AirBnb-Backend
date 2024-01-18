import exress from 'express'
import { getColors, getColor, createColor, updateColor, deleteColor } from '../controllers/colorController'


const router = exress.Router()


//get all colors of a store
router.get('/:storeId/colors', getColors)

//get a color
router.get('/colors/:id', getColor)

//create a color
router.post('/:storeId/colors', createColor)

//Patch/Update a color
router.patch('/colors/:id', updateColor)

//Delete color
router.delete('/colors/:id', deleteColor)

export default router