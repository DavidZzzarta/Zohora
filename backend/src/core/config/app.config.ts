import process from 'node:process'
import { z } from 'zod'
import { Logger } from '@src/api/middlewares/logger/access.logger.js'
import express from 'express'
import Paths from '@src/core/config/paths.config.js'
import fs from 'node:fs'

// .env file path settings
if (Paths.env && fs.existsSync(Paths.env)) {
  Logger.log('Loading .env file')
  process.loadEnvFile(Paths.env)
} else if (process.env.NODE_ENV === 'production') {
  Logger.log('Loading environment variables from production')
} else {
  Logger.log('Loading environment variables from test')
  process.loadEnvFile(Paths.envExample)
}

/**
 * Environment variable validation scheme using Zod
 */
const envSchema = z.object({
  EMAIL_KEY: z.string(),
  PG_NAME: z.string().default('zohora'),
  PG_PASSWORD: z.string(),
  PG_HOST: z.string().default('localhost'),
  PG_USER: z.string().default('postgres'),
  PG_PORT: z.coerce.number().int().positive().default(5432),
  SALT_ROUNDS: z.coerce.number().int().positive().default(10),
  PORT: z.coerce.number().int().positive().default(8080),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  SECRET_JWT_KEY: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_REDIRECT: z.string(),
  SESSION_SECRET: z.string(),
  PG_URL: z.string(),
  REDIS_URL: z.string()
})

const env: Record<string, any> = process.env
const { success, error, data } = envSchema.safeParse(env)
if (!success) {
  Logger.error(`Error en las variables de entorno: ${error}`)
  process.exit(1)
}

export const {
  EMAIL_KEY,
  PG_NAME,
  PG_PASSWORD,
  PG_HOST,
  PG_USER,
  PG_PORT,
  SALT_ROUNDS,
  PORT,
  NODE_ENV,
  SECRET_JWT_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SESSION_SECRET,
  PG_URL,
  REDIS_URL,
  GOOGLE_CLIENT_REDIRECT
} = data

/**
 * Session cookie settings
 */
export const cookieSessionSettings: object = {
  httpOnly: true,
  sameSite: 'strict',
  maxAge: 1000 * 60 * 60, // 1 hora
  secure: NODE_ENV === 'production'
}
