import express from 'express'
import { InfoController } from '../controllers/info.controller.js'
export const Information = express.Router()

Information.get('/terms', InfoController)
Information.get('/cookies', InfoController)
Information.get('/policy', InfoController)
