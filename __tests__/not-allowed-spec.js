'use strict'

/* eslint-env jest */
const notAllowed = require('..')

describe('not-allowed', () => {
  it('is a function', () => {
    expect(typeof notAllowed).toBe('function')
  })
})
