import createReducer from '../utils/createReducer'
import { createSelector } from 'reselect'
import CompanyEndpoints from 'api/CompanyEndpoints'
import TeamMemberEndpoints from 'api/TeamMemberEndpoints'
import _ from 'lodash'

// Types
const types = {
  GET_TEAM_MEMBERS_REQUEST: '[teamMember] GET_TEAM_MEMBERS / REQUEST',
  GET_TEAM_MEMBERS_SUCCESS: '[teamMember] GET_TEAM_MEMBERS / SUCCESS',
  GET_TEAM_MEMBERS_ERROR: '[teamMember] GET_TEAM_MEMBERS / ERROR',

  GET_INVITATIONS_REQUEST: '[teamMember] GET_INVITATIONS / REQUEST',
  GET_INVITATIONS_SUCCESS: '[teamMember] GET_INVITATIONS / SUCCESS',
  GET_INVITATIONS_ERROR: '[teamMember] GET_INVITATIONS / ERROR',

  CREATE_INVITATION_REQUEST: '[teamMember] CREATE_INVITATION / REQUEST',
  CREATE_INVITATION_SUCCESS: '[teamMember] CREATE_INVITATION / SUCCESS',
  CREATE_INVITATION_ERROR: '[teamMember] CREATE_INVITATION / ERROR',

  CANCEL_INVITATION_REQUEST: '[teamMember] CANCEL_INVITATION / REQUEST',
  CANCEL_INVITATION_SUCCESS: '[teamMember] CANCEL_INVITATION / SUCCESS',
  CANCEL_INVITATION_ERROR: '[teamMember] CANCEL_INVITATION / ERROR',

  RESEND_INVITATION_REQUEST: '[teamMember] RESEND_INVITATION / REQUEST',
  RESEND_INVITATION_SUCCESS: '[teamMember] RESEND_INVITATION / SUCCESS',
  RESEND_INVITATION_ERROR: '[teamMember] RESEND_INVITATION / ERROR'
}

const initialState = {
  members: [],
  invitations: []
}

// Reducer
const reducer = createReducer(initialState)({
  [types.GET_TEAM_MEMBERS_SUCCESS]: (state, { payload: { members } }) => ({
    ...state,
    members
  }),

  [types.GET_INVITATIONS_SUCCESS]: (state, { payload: { invitations } }) => ({
    ...state,
    invitations
  }),

  [types.CREATE_INVITATION_SUCCESS]: (state, { payload: { invitation } }) => ({
    ...state,
    invitations: [invitation, ...state.invitations]
  }),

  [types.CANCEL_INVITATION_SUCCESS]: (state, { payload: { invitationUuid } }) => ({
    ...state,
    invitations: _.filter(state.invitations, invitation => invitation.uuid !== invitationUuid)
  })
})

// Thunks
const thunks = {
  getTeamMembers: companyId => async dispatch => {
    dispatch({ type: types.GET_TEAM_MEMBERS_REQUEST })

    const {
      data: { users }
    } = await CompanyEndpoints.getTeamMembers(companyId)

    dispatch({ type: types.GET_TEAM_MEMBERS_SUCCESS, payload: { members: users } })
  },

  getInvitations: companyId => async dispatch => {
    dispatch({ type: types.GET_INVITATIONS_REQUEST })
    const response = await TeamMemberEndpoints.getInvitations(companyId)
    dispatch({
      type: types.GET_INVITATIONS_SUCCESS,
      payload: { invitations: response.data.invitations }
    })
  },

  createInvitation: (companyId, userId, inviteeEmail) => async dispatch => {
    dispatch({ type: types.CREATE_INVITATION_REQUEST })
    const response = await TeamMemberEndpoints.createInvitation(companyId, userId, inviteeEmail)
    dispatch({
      type: types.CREATE_INVITATION_SUCCESS,
      payload: { invitation: response.data.invitation }
    })
  },

  cancelInvitation: invitationUuid => async dispatch => {
    dispatch({ type: types.CANCEL_INVITATION_REQUEST })
    await TeamMemberEndpoints.cancelInvitation(invitationUuid)
    dispatch({ type: types.CANCEL_INVITATION_SUCCESS, payload: { invitationUuid } })
  },

  resendInvitation: invitationUuid => async dispatch => {
    dispatch({ type: types.RESEND_INVITATION_REQUEST })
    await TeamMemberEndpoints.resendInvitation(invitationUuid)
    dispatch({ type: types.RESEND_INVITATION_SUCCESS })
  }
}

// Selectors
const selectors = {
  getMembers: createSelector(
    state => state.teamMembers.members,
    members => members
  ),

  getInvitations: createSelector(
    state => state.teamMembers.invitations,
    invitations => invitations
  )
}

export { types as teamMemberTypes }
export { thunks as teamMemberThunks }
export { selectors as teamMemberSelectors }
export default reducer
