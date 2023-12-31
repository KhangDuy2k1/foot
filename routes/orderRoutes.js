import express from 'express'
import {
  deleteOrder,
  changeStatus,
  getAllOrders,
  getDetailByUserId,
  getOrderDetail,
  getOrdersByUserId,
  order,
} from '../controller/ordersController.js'
const router = express.Router()

router.get('/getall', getAllOrders)
router.get('/detail/:orderid', getOrderDetail)
router.delete('/delete', deleteOrder)
router.post('/add', order)
router.get('/getorderbyuserid/:userid', getOrdersByUserId)
router.post('/getdetailbyuserid', getDetailByUserId)

router.put('/update/status/:orderid', changeStatus)

export default router
