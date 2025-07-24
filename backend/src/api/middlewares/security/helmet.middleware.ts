import { HelmetOptions } from 'helmet'

let defaultSrc = [
  "'self'",
  'https://ka-f.fontawesome.com',
  'https://restcountries.com/'
]
let scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  'https://unpkg.com',
  'https://cdn.jsdelivr.net'
]
let styleSrc = ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net']
let objectSrc = ["'none'"]

export const HelmetConfig: HelmetOptions = {
  contentSecurityPolicy: {
    useDefaults: false,
    directives: {
      defaultSrc,
      scriptSrc,
      styleSrc,
      objectSrc,
      upgradeInsecureRequests: []
    }
  },
  hsts: {
    includeSubDomains: true,
    preload: true,
    maxAge: 31536000
  },
  frameguard: {
    action: 'deny'
  }
}
