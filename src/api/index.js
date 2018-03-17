// @flow

import axios from 'axios'
import store from 'store'

const authConfig = 'authConfig'

export const setAuthConfig = data => store.set(authConfig, data)
export const getAuthConfig = () => store.get(authConfig)
export const removeAuthConfig = () => store.remove(authConfig)

export const prepareRequest = (method, url, data) => {
  const authConfig = getAuthConfig()
  return axios.request({
    url,
    method,
    baseURL: `https://${authConfig.subdomain}.unfuddle.com/api/v1`,
    auth: {
      username: authConfig.username,
      password: authConfig.password
    },
    data
  })
}

export const getProjects = async () => await prepareRequest('get', '/projects.json')

export const getProject = async id => {
  const resp = await prepareRequest('get', `/projects/${id}/milestones.json`)
  console.log(resp.data)
  return resp.data
}

export const getTickets = async (project_id, id) => {
  const resp = await prepareRequest(
    'get',
    `/projects/${project_id}/milestones/${id}/active_tickets.json`
  )
  console.log(resp.data)
  return resp.data
}

export const report = async id => {
  const resp = await prepareRequest(
    'get',
    `projects/${id}/overall_progress.json`
  )
  console.log(resp.data)
  return resp.data
}
