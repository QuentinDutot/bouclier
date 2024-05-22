// biome-ignore lint/performance/noBarrelFile: ...
export { getClientIp } from 'request-ip'
export { MemoryBanManager } from './managers/BanManager'
export { ConsoleLogManager } from './managers/LogManager'

const sensitivePaths = ['.git', '.env', 'mysql', 'phpMyAdmin', 'vendor', 'node_modules', 'Dockerfile']

export const checkPath = (path: string) => {
  if (!path.startsWith('/')) {
    throw new Error('Path must start with /')
  }

  const pathParts = path.split('/').filter(Boolean)

  const isSensitive = sensitivePaths.some((sensitivePath) => pathParts.includes(sensitivePath))

  return isSensitive
}
