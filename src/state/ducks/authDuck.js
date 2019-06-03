import createReducer from '../utils/createReducer'
import { createSelector } from 'reselect'
import firebase from 'firebase'

// Types
const types = {
  LOGIN_WITH_GMAIL_REQUEST: '[auth] LOGIN_WITH_GMAIL / REQUEST',
  LOGIN_WITH_GMAIL_SUCCESS: '[auth] LOGIN_WITH_GMAIL / SUCCESS',

  LOGIN_WITH_FACEBOOK_REQUEST: '[auth] LOGIN_WITH_FACEBOOK / REQUEST',
  LOGIN_WITH_FACEBOOK_SUCCESS: '[auth] LOGIN_WITH_FACEBOOK / SUCCESS',

  LOGOUT_REQUEST: '[auth] LOGOUT / REQUEST',
  LOGOUT_SUCCESS: '[auth] LOGOUT / SUCCESS',

  INIT_USER_FROM_LOCAL_STORAGE: '[auth] INIT_USER_FROM_LOCAL_STORAGE',
  AUTH_STATE_CHANGED: '[auth] AUTH_STATE_CHANGED'
}

const initialState = {
  user: null,
}

// Reducer
const reducer = createReducer(initialState)({
  [types.AUTH_STATE_CHANGED]: (state, { payload: { user } }) => ({
    ...state,
    user
  }),

  [types.INIT_USER_FROM_LOCAL_STORAGE]: (state, action) => ({
    ...state,
    ...action.payload.auth
  }),

  [types.LOGOUT_SUCCESS]: (state, _) => ({
    ...state,
    ...initialState
  })
})

// Thunks
const thunks = {
  loginWithGoogle: () => async dispatch => {
    try {
      dispatch({ type: types.LOGIN_WITH_GMAIL_REQUEST })
      const googleProvider = new firebase.auth.GoogleAuthProvider()
      await firebase.auth().signInWithPopup(googleProvider)
      dispatch({ type: types.LOGIN_WITH_GMAIL_SUCCESS })
    } catch (error) {
      return Promise.reject(error)
    }
  },

  loginWithFacebook: () => async dispatch => {
    try {
      dispatch({ type: types.LOGIN_WITH_FACEBOOK_REQUEST })
      const facebookProvider = new firebase.auth.FacebookAuthProvider()
      await firebase.auth().signInWithPopup(facebookProvider)
      dispatch({ type: types.LOGIN_WITH_FACEBOOK_SUCCESS })
    } catch (error) {
      return Promise.reject(error)
    }
  },

  logout: () => async dispatch => {
    try {
      dispatch({ type: types.LOGOUT_REQUEST })
      await firebase.auth().signOut()
      dispatch({ type: types.LOGOUT_SUCCESS })
    } catch (error) {
      return Promise.reject(error)
    }
  },

  authStateChanged: user => dispatch => {
    dispatch({
      type: types.AUTH_STATE_CHANGED,
      payload: { user }
    })
  }
}

const selectors = {
  getUser: createSelector(
    state => state.auth.user,
    user => user
  )
}

export { types as authTypes }
export { thunks as authThunks }
export { selectors as authSelectors }
export default reducer
