'use strict'

module.exports = function (fastify, opts, next) {
  fastify.get('/example', async (request, reply) => {
    return 'this is an example'
  })

  next()
}

// It you prefer async/await, use the following
//
// module.exports = async function (fastify, opts) {
//   fastify.get('/example', async function (request, reply) {
//     return 'this is an example'
//   })
// }
