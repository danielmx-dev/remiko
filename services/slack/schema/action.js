module.exports = {
  type: 'object',
  properties: {
    type: { type: 'string' },
    actions: { type: 'array' },
    callback_id: { type: 'string' },
    team: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        domain: { type: 'string' }
      }
    },
    channel: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' }
      }
    },
    user: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' }
      }
    },
    action_ts: { type: 'string' },
    message_ts: { type: 'string' },
    attachment_id: { type: 'string' },
    token: { type: 'string' },
    is_app_unfurl: { type: 'boolean' },
    original_message: { type: 'object' },
    response_url: { type: 'object' },
    trigger_id: { type: 'object' }
  }
}
