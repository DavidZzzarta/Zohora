import express from 'express'
import {
  CodeViewController,
  LoginController,
  RegistryController,
  LogoutController,
  CodeVerificationController,
  UpdateUserDataController,
  VerificationUpdateController,
  VerificationDeleteController,
  DeleteUserController,
  UserInformationController
} from '@src/api/controllers/user.controller.js'
import {
  GoogleController,
  GoogleRedirectMiddleware
} from '@src/api/controllers/oauth.controller.js'
import { TokenChecking } from '@src/api/middlewares/auth/token.middleware.js'
import { jsonGuard } from '../middlewares/security/json.middleware.js'

export const User = express.Router()

User.get('/', TokenChecking, UserInformationController)

User.get('/google', GoogleController)
User.get('/google/redirect', GoogleRedirectMiddleware, (req, res) => {
  res.redirect('/')
})

User.get('/otp', CodeViewController)

User.post('/login', jsonGuard, LoginController)

User.post('/', RegistryController)
User.post('/verification', jsonGuard, CodeVerificationController)

User.patch('/', TokenChecking, UpdateUserDataController)
User.patch(
  '/verification',
  jsonGuard,
  TokenChecking,
  VerificationUpdateController
)

User.delete('/', TokenChecking, DeleteUserController)
User.delete(
  '/verification',
  jsonGuard,
  TokenChecking,
  VerificationDeleteController
)

User.post('/logout', LogoutController)
