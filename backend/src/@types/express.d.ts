import type { User } from '../core/types/user.types.js'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export {} 