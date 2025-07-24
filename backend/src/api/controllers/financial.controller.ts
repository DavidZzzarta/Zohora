import express from 'express'
import { AccountsModel } from '@src/core/database/financial.model.js'
import { TransactionsModel } from '@src/core/database/financial.model.js'
import {
  validateAccount,
  validateTransaction
} from '@src/core/utils/validators/validator.utils.js'
import { samePerson } from '@src/core/database/financial.model.js'
import { User } from '@src/core/types/user.types'

/**
 * ## GET /transaction/:account_id
 * It will show the transactions of the current account
 */
export const GetTransactionsController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!req.user) return
    const user: User = req.user

    const { account_id } = req.params
    await samePerson({
      idBe: user.user_id ?? '',
      idCe: account_id,
      type: 'account_id'
    })
    const transactions =
      await TransactionsModel.getTransactionsByAccountId(account_id)
    res.status(200).send(transactions)
  } catch (e) {
    res.status(400).send({
      error: 'Error trying to show the user information.'
    })
  }
}

/**
 * ## POST /transaction
 * It will ad a transaction
 *
 * @param {string} req.body.account_id - Any ID account
 * @param {number} req.body.amount - The amount of the current transaction
 * @param {string} req.body.description - The description, is not required
 * @param {date} req.body.transaction_date - The current date
 *
 * @returns **200** It will ad the transaction as we expect
 * @throws **400**Some error maybe adding the transaction, or with the
 */
export const TransactionController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!req.user) return
    const user: User = req.user
    const { account_id, amount, description } = req.body
    let newTransaction = { account_id, amount: Number(amount), description }
    validateTransaction(newTransaction)
    await samePerson({
      idBe: user.user_id ?? '',
      idCe: account_id,
      type: 'account_id'
    })
    const transaction = await TransactionsModel.create(newTransaction)
    res
      .status(200)
      .send({ transaction, message: 'transaction created successfully' })
  } catch (e) {
    res.status(400).send({
      error: 'Error trying to create the transaction.'
    })
  }
}

/**
 * ## GET /account
 * It will show the list of the accounts
 */
export const GetAccountsController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!req.user) return
    const user: User = req.user
    const accounts = await AccountsModel.getFinancialDataById(
      user.user_id ?? ''
    )
    res.status(200).send(accounts)
  } catch (e) {
    res.status(400).send({
      error: 'Error trying to show the user information.'
    })
  }
}

/**
 * ## POST /account
 * It will ad a transaction
 *
 * @param {string} req.body.name - The name of the account.
 * @param {string} req.body.description - The description of the account, like 'Checking account'
 * @param {number} req.body.current_balance - The current balance regarding the transactions too
 *
 * @returns **200** It will add the account
 * @throws **400**Some error maybe adding the account or with the database
 */
export const AccountController = async (
  req: express.Request,
  res: express.Response
) => {
  if (!req.user) return
  const user: User = req.user
  try {
    const { name, description, current_balance } = req.body
    const newAccount = {
      user_id: user.user_id,
      name,
      description,
      current_balance
    }
    validateAccount({
      name,
      description,
      current_balance: Number(current_balance)
    })
    const account = await AccountsModel.create(newAccount)
    res.status(200).send({ account })
  } catch (e) {
    res.status(400).send({
      error: 'Error trying to create the account, try again.'
    })
  }
}

/**
 * ## DELETE /account/:account_id
 * It will delete the account
 */
export const DeleteAccountController = async (
  req: express.Request,
  res: express.Response
) => {
  if (!req.user) return
  const user: User = req.user
  try {
    const { account_id } = req.params
    await samePerson({
      idBe: user.user_id ?? '',
      idCe: account_id,
      type: 'account_id'
    })
    await AccountsModel.remove({ account_id })
    res.status(200).send({ message: 'account removed successfully' })
  } catch (e) {
    res.status(400).send({
      error: 'Error trying to delete the user information.'
    })
  }
}

/**
 * ## PATCH /transaction/:transaction_id
 * It will delete one transaction
 */
export const DeleteTransactionController = async (
  req: express.Request,
  res: express.Response
) => {
  if (!req.user) return
  const user: User = req.user
  try {
    const { transaction_id } = req.params
    await samePerson({
      idBe: user.user_id ?? '',
      idCe: transaction_id,
      type: 'transaction_id'
    })
    await TransactionsModel.remove({ transaction_id })
    res.status(200).send({ message: 'transaction removed successfully' })
  } catch (e) {
    res.status(400).send({
      error: 'Error trying to delete the user information.'
    })
  }
}
