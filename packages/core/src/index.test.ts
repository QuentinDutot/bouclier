import { describe, expect, test } from 'bun:test'
import { checkPath } from './'

describe('checkPath', () => {
  test('should return true for a path containing .git', () => {
    expect(checkPath('/.git/config')).toBe(true)
  })

  test('should return true for a path containing .env', () => {
    expect(checkPath('/.env')).toBe(true)
  })

  test('should return true for a path containing mysql', () => {
    expect(checkPath('/mysql/sqlmanager/index.php')).toBe(true)
  })

  test('should return true for a path containing phpMyAdmin', () => {
    expect(checkPath('/administrator/phpMyAdmin/index.php')).toBe(true)
  })

  test('should return true for a path containing vendor', () => {
    expect(checkPath('/vendor')).toBe(true)
  })

  test('should return true for a path containing node_modules', () => {
    expect(checkPath('/node_modules')).toBe(true)
  })

  test('should return true for a path containing Dockerfile', () => {
    expect(checkPath('/Dockerfile')).toBe(true)
  })

  test('should return false for a non-sensitive path', () => {
    expect(checkPath('/')).toBe(false)
    expect(checkPath('/contact')).toBe(false)
  })

  test('should handle invalid URLs gracefully', () => {
    expect(checkPath('invalid-url')).toThrow()
  })
})
