import createReducer from '../utils/createReducer'
import { createSelector } from 'reselect'
import ApplicationEndpoints from 'api/ApplicationEndpoints'
import CompanyEndpoints from 'api/CompanyEndpoints'
import _ from 'lodash'

// Types
export const types = {
  GET_APPLICATIONS_REQUEST: '[application] GET_APPLICATIONS / REQUEST',
  GET_APPLICATIONS_SUCCESS: '[application] GET_APPLICATIONS / SUCCESS',
  GET_APPLICATIONS_ERROR: '[application] GET_APPLICATIONS / ERROR',

  CREATE_APPLICATION_REQUEST: '[application] CREATE_APPLICATION / REQUEST',
  CREATE_APPLICATION_SUCCESS: '[application] CREATE_APPLICATION / SUCCESS',
  CREATE_APPLICATION_ERROR: '[application] CREATE_APPLICATION / ERROR',

  DELETE_APPLICATION_REQUEST: '[application] DELETE_APPLICATION / REQUEST',
  DELETE_APPLICATION_SUCCESS: '[application] DELETE_APPLICATION / SUCCESS',
  DELETE_APPLICATION_ERROR: '[application] DELETE_APPLICATION / ERROR'
}

const initialState = {
  items: [],
  count: 0
}

// Reducer
const reducer = createReducer(initialState)({
  [types.GET_APPLICATIONS_SUCCESS]: (state, { payload: { applications } }) => ({
    ...state,
    items: applications,
    count: applications.length
  }),

  [types.CREATE_APPLICATION_SUCCESS]: (state, { payload: { application } }) => ({
    ...state,
    items: [application, ...state.items],
    count: state.count + 1
  }),

  [types.DELETE_APPLICATION_SUCCESS]: (state, { payload: { applicationId } }) => ({
    ...state,
    items: _.filter(state.items, application => application.id !== applicationId)
  })
})

// Thunks
const thunks = {
  getApplications: companyId => async dispatch => {
    try {
      dispatch({ type: types.GET_APPLICATIONS_REQUEST })

      const {
        data: { applications }
      } = await CompanyEndpoints.getApplications(companyId)

      dispatch({ type: types.GET_APPLICATIONS_SUCCESS, payload: { applications } })
    } catch (error) {
      dispatch({ type: types.GET_APPLICATIONS_ERROR, payload: { error } })
      return Promise.reject(error)
    }
  },

  createApplication: (name, companyId, userId) => async dispatch => {
    try {
      dispatch({ type: types.CREATE_APPLICATION_REQUEST })

      const {
        data: { application }
      } = await ApplicationEndpoints.createApplication(name, companyId, userId)

      dispatch({ type: types.CREATE_APPLICATION_SUCCESS, payload: { application } })
    } catch (error) {
      dispatch({ type: types.CREATE_APPLICATION_ERROR })
      return Promise.reject(error)
    }
  },

  deleteApplication: (userId, companyId, applicationId) => async dispatch => {
    dispatch({ type: types.DELETE_APPLICATION_REQUEST })
    await ApplicationEndpoints.deleteApplication(userId, companyId, applicationId)
    dispatch({ type: types.DELETE_APPLICATION_SUCCESS, payload: { applicationId } })
  }
}

// Selectors
const selectors = {
  getItems: createSelector(
    state => state.applications.items,
    applications => applications
  ),

  getCount: createSelector(
    state => state.applications.count,
    count => count
  )
}

export { types as applicationTypes }
export { thunks as applicationThunks }
export { selectors as applicationSelectors }
export default reducer
