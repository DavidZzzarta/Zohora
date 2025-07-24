import { AccountsSchema, TransactionSchema } from './db.js'
import { DatabaseError } from '@src/core/utils/error/app.error.js'
import crypto from 'node:crypto'

export class AccountsModel {
  static async create({
    user_id,
    name,
    current_balance = 0,
    description = 'checking account'
  }: {
    user_id: string | undefined
    name: string | undefined
    description?: string
    current_balance?: number
  }) {
    if (!user_id || !name || !description)
      throw new DatabaseError('Data missing')
    let account_id = crypto.randomUUID()
    await AccountsSchema.create({
      user_id,
      name,
      description,
      current_balance: 0,
      account_id
    })
    await TransactionsModel.create({
      account_id,
      amount: current_balance,
      description: 'Primer transaccion'
    })
    return { message: 'account created', current_balance, account_id }
  }

  static async remove({ account_id }: { account_id: string }) {
    if (!account_id) throw new DatabaseError('Data missing')
    await AccountsSchema.destroy({
      where: {
        account_id
      }
    })
    return { message: 'account removed successfully' }
  }

  static async getFinancialDataById(user_id: string) {
    if (!user_id) throw new DatabaseError('Data missing')
    const accts = await AccountsSchema.findAll({
      where: { user_id }
    })
    return { accounts: accts.map(acct => acct.dataValues) }
  }

  static async getAccountBalance({
    account_id
  }: {
    account_id: string
  }): Promise<number> {
    if (!account_id) throw new DatabaseError('Data missing')
    const bal = await AccountsSchema.findOne({
      where: { account_id }
    })
    if (!bal) throw new DatabaseError('Data is wrong')
    return Number(bal.dataValues.current_balance)
  }

  static async UpdateAccountBalance({
    account_id,
    amount,
    transaction_id
  }: {
    account_id?: string
    amount?: number
    transaction_id?: string
  }) {
    const trans = transaction_id
      ? await TransactionSchema.findOne({ where: { transaction_id } })
      : undefined
    account_id = trans ? trans.dataValues.account_id : account_id
    amount = trans ? trans.dataValues.amount * -1 : amount

    if (!account_id) throw new DatabaseError('Data is wrong')
    if (!amount) throw new DatabaseError('Data is wrong')

    const balance = await AccountsModel.getAccountBalance({ account_id })
    const current_balance = balance + amount

    await AccountsSchema.update(
      { current_balance },
      {
        where: { account_id }
      }
    )
    return
  }
}

export class TransactionsModel {
  static async create({
    account_id,
    amount = 0,
    description = ''
  }: {
    account_id: string
    amount: number
    description: string
  }) {
    if (!account_id || !amount) throw new DatabaseError('Data missing')
    let transaction_id = crypto.randomUUID()
    const trans = await TransactionSchema.create({
      account_id,
      amount,
      description,
      transaction_date: new Date(),
      transaction_id
    })

    await AccountsModel.UpdateAccountBalance({ account_id, amount })

    return trans
  }

  static async remove({ transaction_id }: { transaction_id: string }) {
    if (!transaction_id) throw new DatabaseError('Data missing')
    await AccountsModel.UpdateAccountBalance({ transaction_id })
    await TransactionSchema.destroy({
      where: {
        transaction_id
      }
    })
    return { message: 'transaction removed successfully' }
  }

  static async getTransactionsByAccountId(account_id: string) {
    if (!account_id) throw new DatabaseError('Data missing')
    const trans = await TransactionSchema.findAll({
      where: { account_id },
      order: [['createdAt', 'DESC']]
    })
    return { transactions: trans.map(trans => trans.dataValues) }
  }
}

export const samePerson = async ({
  idBe,
  idCe,
  type
}: {
  idBe: string
  idCe: string
  type: string
}) => {
  if (!idBe || !idCe || !type) throw new DatabaseError('Data missing')

  const trans =
    type === 'transaction_id'
      ? await TransactionSchema.findOne({ where: { transaction_id: idCe } })
      : undefined
  const account_id = trans ? trans.dataValues.account_id : idCe

  const acct = await AccountsSchema.findOne({
    where: { account_id }
  })
  if (!acct) throw new DatabaseError('invalid ID')
  if (acct.dataValues.user_id === idBe) return
  else throw new DatabaseError('Invalid ID')
}
