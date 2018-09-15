'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/example', async (request, reply) => {
    return 'this is an example'
  })
}
