import axios from 'axios'

export default class TeamMemberEndpoints {
  static getInvitations = companyId => axios.get(`/invitations/pending/${companyId}`)

  static createInvitation = (companyId, userId, inviteeEmail) =>
    axios.post(`/invitations/${userId}`, {
      companyId,
      inviteeEmail
    })

  static cancelInvitation = invitationUuid => axios.post(`/invitations/cancel/${invitationUuid}`)

  static resendInvitation = invitationUuid => axios.post(`/invitations/resend/${invitationUuid}`)
}
