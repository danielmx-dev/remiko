'use strict'

const axios = require('axios')
const config = require('../../../config')

const slackRequest = ({ apiMethod, httpMethod = 'POST' }) => async ({ data, query }) => {
  const response = await axios({
    method: httpMethod,
    url: `https://slack.com/api/${apiMethod}`,
    headers: {
      'Authorization': `Bearer ${config.token}`
    },
    query,
    data
  })

  if (response.status !== 200) {
    throw new Error(`Slack Api Error: ${response.data.error}`)
  }

  return response.data
}

const setProfile = slackRequest({
  apiMethod: 'users.profile.set'
})

const readProfile = slackRequest({
  httpMethod: 'GET',
  apiMethod: 'users.profile.get'
})

module.exports = {
  setProfile,
  readProfile
}
