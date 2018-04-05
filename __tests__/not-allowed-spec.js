'use strict'

/* eslint-env jest */
const notAllowed = require('..')

describe('not-allowed', () => {
  it('is a function', () => {
    expect(typeof notAllowed).toBe('function')
  })

  it('throws error', () => {
    expect(notAllowed).toThrowErrorMatchingSnapshot()
  })

  it('throws error with arguments', () => {
    const fn = () => notAllowed('foo', 'bar', 42)
    expect(fn).toThrowErrorMatchingSnapshot()
  })
})
