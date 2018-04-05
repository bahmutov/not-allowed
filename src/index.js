'use strict'

const a2s = require('arguments-as-string')

function notAllowed () {
  const args = a2s(...arguments)
  const message = `Not allowed to call this function with arguments
    ${args}
  `
  throw new Error(message)
}

module.exports = notAllowed
