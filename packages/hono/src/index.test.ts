import { describe, expect, test } from 'bun:test'
import { Hono } from 'hono'
import { hello } from './'

describe('hono middleware', () => {
  const server = new Hono()

  server.use('/hello/*', hello())
  server.get('/hello/foo', (c) => c.text('foo'))

  server.use('/x/*', hello('X'))
  server.get('/x/foo', (c) => c.text('foo'))

  test('Should be hello message', async () => {
    const res = await server.request('http://localhost/hello/foo')
    expect(res).not.toBeNull()
    expect(res.status).toBe(200)
    expect(res.headers.get('X-Message')).toBe('Hello!')
  })

  test('Should be X', async () => {
    const res = await server.request('http://localhost/x/foo')
    expect(res).not.toBeNull()
    expect(res.status).toBe(200)
    expect(res.headers.get('X-Message')).toBe('X')
  })
})
