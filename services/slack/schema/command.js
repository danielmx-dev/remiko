module.exports = {
  type: 'object',
  properties: {
    token: { type: 'string' },
    team_id: { type: 'string' },
    team_domain: { type: 'string' },
    channel_id: { type: 'string' },
    channel_name: { type: 'string' },
    user_id: { type: 'string' },
    user_name: { type: 'string' },
    command: { type: 'string' },
    text: { type: 'string' },
    response_url: { type: 'string' },
    trigger_id: { type: 'string' }
  }
}
