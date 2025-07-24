import express from 'express'
import { User } from './user.routes.js'
import { Information } from './info.routes.js'
/*import { publicFilesConfig } from '@src/core/config/app.config.js'*/
import { TokenChecking } from '@src/api/middlewares/auth/token.middleware.js'
import {
  TransactionController,
  AccountController,
  DeleteTransactionController,
  DeleteAccountController,
  GetTransactionsController,
  GetAccountsController
} from '@src/api/controllers/financial.controller.js'
import { version } from '@src/core/version.js'
import { jsonGuard } from '../middlewares/security/json.middleware.js'
import Paths from '@src/core/config/paths.config.js'

/**
 * Simple handle router of all the project
 */
export const MainRoutes = express.Router()

// Main page

MainRoutes.use(express.static(Paths.frontend))
MainRoutes.use('/authentication', express.static(Paths.frontend))

MainRoutes.get('/version', (_req: express.Request, res: express.Response) => {
  res.status(200).send(version)
})

MainRoutes.use(express.static(Paths.public))

MainRoutes.get(
  '/transaction/:account_id',
  TokenChecking,
  GetTransactionsController
)
MainRoutes.get('/account', TokenChecking, GetAccountsController)

MainRoutes.post('/transaction', jsonGuard, TokenChecking, TransactionController)
MainRoutes.post('/account', jsonGuard, TokenChecking, AccountController)
MainRoutes.patch(
  '/transaction/:transaction_id',
  TokenChecking,
  DeleteTransactionController
)
MainRoutes.delete(
  '/account/:account_id',
  TokenChecking,
  DeleteAccountController
)

MainRoutes.use('/auth', User)
MainRoutes.use('/information', Information)
