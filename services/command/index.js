'use strict'

module.exports = async function (fastify, opts) {
  fastify.all('/command', async (request, reply) => {
    fastify.log.info('body', request.body)
    return { success: true }
  })
}
