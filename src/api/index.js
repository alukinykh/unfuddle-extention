// @flow

import axios from 'axios'
import store from 'store'

const authConfig = 'authConfig'

export const setAuthConfig = data => store.set(authConfig, data)
export const getAuthConfig = () => store.get(authConfig)
export const removeAuthConfig = () => store.remove(authConfig)

export const prepareRequest = (method, url, data, credentials = getAuthConfig()) => axios.request({
  url,
  method,
  baseURL: `https://${credentials.subdomain}.unfuddle.com/api/v1`,
  auth: {
    username: credentials.username,
    password: credentials.password
  },
  data
})

export const getProjects = async (data) => {
  const resp = await prepareRequest('get', '/projects.json', null, data)
  return resp
}

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
