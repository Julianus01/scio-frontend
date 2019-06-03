import createReducer from '../utils/createReducer'
import { createSelector } from 'reselect'
import CompanyEndpoints from 'api/CompanyEndpoints'

// Types
const types = {
  GET_COMPANY_REQUEST: '[company] GET_COMPANY / REQUEST',
  GET_COMPANY_SUCCESS: '[company] GET_COMPANY / SUCCESS',
  GET_COMPANY_ERROR: '[company] GET_COMPANY / ERROR',

  CREATE_COMPANY_REQUEST: '[company] CREATE_COMPANY / REQUEST',
  CREATE_COMPANY_SUCCESS: '[company] CREATE_COMPANY / SUCCESS',
  CREATE_COMPANY_ERROR: '[company] CREATE_COMPANY / ERROR',
}

const initialState = {
  item: null,
  isFetching: false
}

const setFetchingState = (state, isFetching) => ({
  ...state,
  isFetching
})

// Reducer
const reducer = createReducer(initialState)({
  [types.GET_COMPANY_REQUEST]: (state, _) => setFetchingState(state, true),
  [types.GET_COMPANY_SUCCESS]: (state, { payload: { company } }) => ({
    ...state,
    item: { ...company },
    isFetching: false
  }),
  [types.GET_COMPANY_ERROR]: (state, _) => setFetchingState(state, false),

  [types.CREATE_COMPANY_SUCCESS]: (state, { payload: { company } }) => ({
    ...state,
    item: { ...company }
  }),
})

// Thunks
const thunks = {
  getCompany: userId => async dispatch => {
    try {
      dispatch({ type: types.GET_COMPANY_REQUEST })
      const { data } = await CompanyEndpoints.getCompany(userId)

      dispatch({
        type: types.GET_COMPANY_SUCCESS,
        payload: { company: data }
      })
    } catch (error) {
      dispatch({ type: types.GET_COMPANY_ERROR, payload: { error } })
      return Promise.reject(error)
    }
  },

  createCompany: (userId, companyName) => async dispatch => {
    try {
      dispatch({ type: types.CREATE_COMPANY_REQUEST })

      const {
        data: { company }
      } = await CompanyEndpoints.createCompany(userId, companyName)

      dispatch({
        type: types.CREATE_COMPANY_SUCCESS,
        payload: { company }
      })
    } catch (error) {
      dispatch({ type: types.CREATE_COMPANY_ERROR, payload: { error } })
      return Promise.reject(error)
    }
  },
}

// Selectors
const selectors = {
  getCompany: createSelector(
    state => state.company.item,
    company => company
  ),

  getCompanyMeta: createSelector(
    state => state.company,
    ({ item, ...rest }) => ({ ...rest })
  )
}

export { types as companyTypes }
export { thunks as companyThunks }
export { selectors as companySelectors }
export default reducer
