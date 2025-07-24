import {
  PG_NAME,
  PG_PASSWORD,
  PG_HOST,
  PG_USER,
  PG_PORT,
  NODE_ENV,
  PG_URL
} from '@src/core/config/app.config.js'
import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize'
import { Logger } from '@src/api/middlewares/logger/access.logger.js'
import { DatabaseError } from '@src/core/utils/error/app.error.js'
import {
  ConsecutiveBreaker,
  ExponentialBackoff,
  retry,
  handleAll,
  circuitBreaker,
  wrap
} from 'cockatiel'

export let sequelize: Sequelize

if (NODE_ENV !== 'production') {
  sequelize = new Sequelize(PG_NAME, PG_USER, PG_PASSWORD, {
    host: PG_HOST,
    port: PG_PORT,
    dialect: 'postgres',
    logging: Logger.log
  })
} else {
  sequelize = new Sequelize(PG_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })
}

export const TransactionSchema = sequelize.define(
  'transactions',
  {
    account_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    transaction_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    transaction_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  },
  {
    tableName: 'transactions',
    timestamps: true,
    indexes: [
      {
        fields: ['account_id']
      },
      {
        fields: ['transaction_date']
      }
    ]
  }
)

export const AccountsSchema = sequelize.define(
  'accounts',
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    account_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(60)
    },
    description: {
      type: DataTypes.STRING(60)
    },
    current_balance: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  },
  {
    tableName: 'accounts',
    timestamps: false,
    indexes: [
      {
        fields: ['user_id']
      }
    ]
  }
)

export const UserSchema = sequelize.define(
  'users',
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    google_id: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: true
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        min: 6
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(255),
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password_hash: {
      type: DataTypes.STRING(60)
    },
    sign: {
      type: DataTypes.STRING(6),
      defaultValue: 'CO',
      allowNull: false
    }
  },
  {
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['google_id']
      },
      {
        unique: true,
        fields: ['email']
      }
    ]
  }
)

// Foreign keys
UserSchema.hasMany(AccountsSchema, { foreignKey: 'user_id' })

AccountsSchema.hasMany(TransactionSchema, { foreignKey: 'account_id' })

async function columnExists<T extends Model>({
  model,
  columnName
}: {
  model: ModelStatic<T>
  columnName: string
}) {
  if (!model.sequelize) throw new DatabaseError('Model does not exist')
  try {
    const tableDescription = await model.sequelize
      .getQueryInterface()
      .describeTable(model.getTableName())

    if (columnName in tableDescription) return
    else Logger.error(`Column: ${columnName} does not exist`)
    return
  } catch (e) {
    Logger.error('Column does not exist')
    return false
  }
}

async function verifyAllColumns() {
  let userData = [
    'user_id',
    'google_id',
    'username',
    'email',
    'password_hash',
    'sign',
    'createdAt',
    'updatedAt'
  ]
  let accountsData = [
    'user_id',
    'account_id',
    'name',
    'description',
    'current_balance'
  ]
  let transactionsData = [
    'account_id',
    'transaction_id',
    'amount',
    'transaction_date',
    'description',
    'createdAt',
    'updatedAt'
  ]

  userData.forEach(columnName =>
    columnExists({ model: UserSchema, columnName }).then(r => r)
  )
  accountsData.forEach(columnName =>
    columnExists({ model: AccountsSchema, columnName }).then(r => r)
  )
  transactionsData.forEach(columnName =>
    columnExists({ model: TransactionSchema, columnName }).then(r => r)
  )
}

/**
 * main connection to the database
 *
 * @example
 * await connect()
 */
export const connect = async () => {
  try {
    Logger.log('Trying to connect to the database.')
    const retryPolicy = retry(handleAll, {
      maxAttempts: 3,
      backoff: new ExponentialBackoff()
    })
    const circuitBreakerPolicy = circuitBreaker(handleAll, {
      halfOpenAfter: 5 * 1000,
      breaker: new ConsecutiveBreaker(5)
    })
    const retryWithBreaker = wrap(retryPolicy, circuitBreakerPolicy)
    await retryWithBreaker.execute(() => sequelize.authenticate())
    //sequelize
    Logger.log(
      'Connection to the database verified, all the credentials and all the columns are correct.'
    )
    if (NODE_ENV === 'development') {
      await sequelize.sync({ alter: true })
      await verifyAllColumns()
      Logger.log('All the models synchronized and altered successfully.')
    }
  } catch (e: unknown) {
    Logger.error(e)
    throw new DatabaseError('Error in connection to the database', 401)
  }
}

export const disconnect = async () => {
  try {
    await sequelize.close()
  } catch (e) {
    Logger.error(String(e))
  }
}
