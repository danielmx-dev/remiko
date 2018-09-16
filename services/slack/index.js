'use strict'

const commandSchema = require('./schema/command')
const actionSchema = require('./schema/action')
const axios = require('axios')
const config = require('../../config')

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
          name: 'update',
          text: 'PTO',
          type: 'button',
          value: 'pto'
        }, {
          name: 'update',
          text: 'BRB',
          type: 'button',
          value: 'brb'
        }, {
          name: 'update',
          text: 'Out4lunch',
          type: 'button',
          value: 'lunch'
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
      const statusUpdateResponse = await axios({
        method: 'POST',
        url: 'https://slack.com/api/users.profile.set',
        headers: {
          'Authorization': `Bearer ${config.token}`
        },
        data: {
          'profile': {
            'status_text': 'riding a train',
            'status_emoji': ':mountain_railway:',
            'status_expiration': 0
          }
        }
      })
      fastify.log.info(statusUpdateResponse.status)
      fastify.log.info(statusUpdateResponse.data)
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
