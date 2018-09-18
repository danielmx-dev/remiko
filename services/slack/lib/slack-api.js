'use strict'

const axios = require('axios')
const config = require('../../../config')

const slackRequest = method => data => {
  return axios({
    method: 'POST',
    url: `https://slack.com/api/${method}`,
    headers: {
      'Authorization': `Bearer ${config.token}`
    },
    data
  })
}

const setProfile = slackRequest('users.profile.set')

module.exports = {
  setProfile
}
