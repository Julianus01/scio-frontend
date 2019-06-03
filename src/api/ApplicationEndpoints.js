import axios from 'axios'

export default class ApplicationEndpoints {
  static createApplication = (name, companyId, userId) =>
    axios.post(`/applications/create`, { name, companyId, userId })

  static getApplication = applicationId => axios.get(`/applications/${applicationId}`)

  static deleteApplication = (userId, companyId, applicationId) =>
    axios.delete(`/applications/${applicationId}`, { data: { userId, companyId } })
}
