import express from 'express'
import { getMessage, sendMessage } from '../controllers/message.controller.js'

const router = express.Router()
router.route('/send/:id',sendMessage)
router.route('/get/:id',getMessage)

export default router