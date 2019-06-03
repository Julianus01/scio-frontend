import axios from 'axios'
import firebase from 'firebase'

const base_url = 'http://localhost:3001/scio-api'

const applyAccessTokenOnRequests = () => {
  axios.interceptors.request.use(
    async config => {
      if (config.baseURL === base_url && !config.headers.Authorization) {
        const token = await firebase.auth().currentUser.getIdToken()
        if (token) {
          config.headers.Authorization = `${token}`
        }
      }

      return config
    },
    error => Promise.reject(error)
  )
}

const applyBaseUrl = () => {
  axios.defaults.baseURL = base_url
}

const applyErrorHandler = () => {
  axios.interceptors.response.use(
    response => response,
    error => Promise.reject(error.response.data)
  )
}

export default () => {
  applyErrorHandler()
  applyAccessTokenOnRequests()
  applyBaseUrl()
}
