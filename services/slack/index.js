'use strict'

const commandSchema = require('./schema/command')
const actionSchema = require('./schema/action')
const SlackApi = require('./lib/slack-api')
const actionsMap = require('./lib/actions-map')

const actionButtons = Object.keys(actionsMap).map(action => {
  const { actionText } = actionsMap[action]
  return {
    name: 'update',
    text: actionText,
    type: 'button',
    value: action
  }
})

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
      text: 'What\'s your status update? :slightly_smiling_face:',
      attachments: [{
        text: 'Update your status',
        fallback: 'Update your status',
        color: '#2c963f',
        attachment_type: 'default',
        callback_id: 'status_update',
        actions: actionButtons
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
    const selected = slackRequestMessage.actions[0].value
    if (slackRequestMessage.callback_id === 'status_update' && actionsMap[selected]) {
      const {
        statusText,
        statusEmoji
      } = actionsMap[selected]
      const statusUpdateResponse = await SlackApi.setProfile({
        profile: {
          status_text: statusText,
          status_emoji: statusEmoji,
          status_expiration: 0
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
