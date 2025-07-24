import { readFileSync } from 'node:fs'
import { NODE_ENV } from '@src/core/config/app.config.js'
import Paths from './config/paths.config.js'

function getVersion(): string {
  if (NODE_ENV === 'development') return 'DEVELOPMENT-VERSION'
  const packagePath = Paths.mainPackage
  const packageJsonContent = JSON.parse(readFileSync(packagePath, 'utf8'))
  return packageJsonContent.version
}

export const version = getVersion()
