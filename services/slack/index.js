'use strict'

const commandSchema = require('./schema/command')
const actionSchema = require('./schema/action')

module.exports = async function (fastify, opts) {
  const commandOpts = {
    schema: {
      body: commandSchema
    }
  }

  fastify.post('/slack/command', commandOpts, async (request, reply) => {
    const slackRequestMessage = request.body
    return {
      response_type: 'in_channel',
      channel: slackRequestMessage.channel_id,
      text: 'Hello :slightly_smiling_face:',
      attachments: [{
        text: 'Update your status',
        fallback: 'Update your status',
        color: '#2c963f',
        attachment_type: 'default',
        callback_id: 'status_update',
        actions: [{
          name: 'status_update_menu',
          text: 'Choose your status update',
          type: 'select',
          options: [
            {
              text: 'PTO',
              value: 'pto'
            },
            {
              text: 'Out 4 lunch',
              value: 'lunch'
            },
            {
              text: 'Be right back',
              value: 'brb'
            }
          ]
        }]
      }]
    }
  })

  const actionOpts = {
    schema: {
      body: actionSchema
    }
  }

  fastify.post('/slack/actions', actionOpts, async (request, reply) => {
    const slackRequestMessage = JSON.parse(request.body.payload)
    if (slackRequestMessage.callback_id === 'status_update') {
      return {
        response_type: 'in_channel',
        text: `*Your status was updated*`,
        mrkdwn: true,
        mrkdwn_in: ['text']
      }
    }
    return {
      response_type: 'in_channel',
      text: 'Hmmm :thinking_face: I dont recognize that action'
    }
  })
}
