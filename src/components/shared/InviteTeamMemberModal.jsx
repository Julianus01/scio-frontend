import React, { useState } from 'react'
import { Modal, BorderlessInput, PillButton } from 'styled'
import styled from 'styled-components'
import { notification as Notification } from 'antd'
import { teamMemberThunks } from 'state/ducks/teamMemberDuck'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const EMAIL_REGEX = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const InviteTeamMemberModal = ({ user, company, teamMemberThunks, visible, onCancel }) => {
  const [email, setEmail] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const onInputChange = event => {
    setEmail(event.target.value)
    validateEmail(event.target.value) ? setDisabled(false) : setDisabled(true)
  }

  const validateEmail = email => {
    if (email.length < 6) return false
    return EMAIL_REGEX.test(String(email).toLowerCase())
  }

  const onEnterPressed = event => {
    if (event.key === 'Enter' && validateEmail(email)) {
      sendInvitationEmail(email)()
    }
  }

  const sendInvitationEmail = email => async () => {
    try {
      setLoading(true)
      await teamMemberThunks.createInvitation(company.id, user.id, email)
      Notification.success({
        message: 'Invitation sent',
        description: `Team member invitation has been sent to ${email}`
      })

      setLoading(false)
      setEmail('')
      onCancel()
    } catch (error) {
      setLoading(false)
      Notification.error({
        message: error.message
      })
      setEmail('')
      onCancel()
    }
  }

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <Content>
        <EmailInput
          autoFocus
          disabled={loading}
          value={email}
          onChange={onInputChange}
          onKeyPress={onEnterPressed}
          placeholder="Invitee email..."
        />

        <PillButton loading={loading} onClick={sendInvitationEmail(email)} disabled={disabled}>
          send
        </PillButton>
      </Content>
    </Modal>
  )
}

export default connect(
  null,
  dispatch => ({
    teamMemberThunks: bindActionCreators(teamMemberThunks, dispatch)
  })
)(InviteTeamMemberModal)

// SC
const Content = styled.div`
  display: flex;
`

const EmailInput = styled(BorderlessInput)`
  width: 300px;
`
