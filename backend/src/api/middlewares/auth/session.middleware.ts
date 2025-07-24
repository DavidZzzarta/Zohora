import session from 'express-session'
import { SESSION_SECRET } from '@src/core/config/app.config.js'
import memorystoreFactory from 'memorystore'
const MemoryStore = memorystoreFactory(session)

export const sessionSetup = () => {
  return session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({
      checkPeriod: 86400000
    })
  })
}
