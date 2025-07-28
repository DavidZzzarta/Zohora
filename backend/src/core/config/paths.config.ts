import { join } from 'node:path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootPath = join(__dirname, '../', '../', '../', '../')

class Paths {
  public static readonly public = join(rootPath, 'public')
  public static readonly frontend = join(rootPath, 'frontend', 'build')
  public static readonly views = join(rootPath, 'backend', 'src', 'views')
  public static readonly mainPackage = join(rootPath, 'package.json')
  public static readonly envExample = join(
    rootPath,
    'backend',
    'src',
    'core',
    'config',
    '.env.example'
  )
  public static readonly env = join(
    rootPath,
    'backend',
    'src',
    'core',
    'config',
    '.env'
  )
}

export default Paths
