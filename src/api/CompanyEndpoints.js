import axios from 'axios'

export default class CompanyEndpoints {
  static getCompany = userId => axios.get(`/companies/${userId}`)

  static createCompany = (userId, companyName) => axios.post(`/companies/create/${userId}`, { name: companyName })

  static getApplications = companyId => axios.get(`/companies/${companyId}/applications`)

  static getTeamMembers = companyId => axios.get(`/companies/${companyId}/users`)
}
