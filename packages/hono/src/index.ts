import { createMiddleware } from 'hono/factory'
import { getClientIp, checkPath, MemoryBanManager, ConsoleLogManager } from '@bouclier/core'

const bouclier = () => {
  const consoleLog = new ConsoleLogManager()
  const memoryBan = new MemoryBanManager()

  return createMiddleware(async (context, next) => {
    const request: Parameters<typeof getClientIp>[0] = {
      headers: context.req.raw.headers.toJSON(),
    }

    const ip = getClientIp(request)
    if (!ip) {
      consoleLog.error('could not get the client ip from the request - middleware skipped')
      await next()
      return
    }

    const banned = memoryBan.hasBan(ip)
    if (banned) {
      consoleLog.info(`a banned visitor tried to access ${context.req.path}`)
      context.text('Forbidden', 403)
      return
    }

    const isSensitive = checkPath(context.req.path)
    if (isSensitive) {
      memoryBan.addBan(ip)
      consoleLog.info(`a visitor got banned trying to access ${context.req.path}`)
      context.text('Forbidden', 403)
      return
    }

    await next()
  })
}

export default bouclier
