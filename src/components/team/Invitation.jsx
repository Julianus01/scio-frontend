import React, { useState } from 'react'
import styled from 'styled-components'
import { Avatar, Typography, Icon, Popover, notification as Notification } from 'antd'
import { Box } from 'styled'
import { useTemporaryMessage } from 'hooks'
import { teamMemberThunks } from 'state/ducks/teamMemberDuck'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const { Text } = Typography

const Invitation = ({ invitation, teamMemberThunks }) => {
  const [resendLoading, setResendLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [successMessage, showSuccessMessage, hideSuccessMessage] = useTemporaryMessage()
  const [errorMessage, showErrorMessage, hideErrorMessage] = useTemporaryMessage()

  const resendInvitation = async () => {
    try {
      setResendLoading(true)
      await teamMemberThunks.resendInvitation(invitation.uuid)
      setResendLoading(false)

      hideMessages()
      showSuccessMessage('Invitation has been resent :)')
    } catch (error) {
      hideMessages()
      showErrorMessage('Couldn`t resend the invitation :(')
      setResendLoading(false)
    }
  }

  const cancelInvitation = async () => {
    try {
      setDeleteLoading(true)
      await teamMemberThunks.cancelInvitation(invitation.uuid)
      Notification.success({
        message: 'Invitation deleted',
        description: `Invitation towards ${invitation.inviteeEmail} has been canceled`
      })
    } catch (error) {
      console.log(error)
      hideMessages()
      showErrorMessage('Couldn`t delete it :(')
      setDeleteLoading(false)
    }
  }

  const hideMessages = () => {
    hideSuccessMessage()
    hideErrorMessage()
  }

  return (
    <Box>
      <AvatarContainer>
        <Avatar style={{ marginRight: 20 }} size={50} icon="user-add" />
      </AvatarContainer>

      <DetailsContainer>
        <Label>{invitation.inviteeEmail}</Label>
      </DetailsContainer>

      <ActionsContainer>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errorMessage && <Typography.Text type="danger">{errorMessage}</Typography.Text>}

        <div style={{ display: 'flex' }}>
          {resendLoading ? (
            <LoadingIcon />
          ) : (
            <Popover content={<Text>Resend Invitation</Text>}>
              <FaIcon className="fas fa-paper-plane" onClick={resendInvitation} />
            </Popover>
          )}

          {deleteLoading ? (
            <LoadingIcon />
          ) : (
            <Popover content={<Text type="danger">Delete</Text>}>
              <FaIcon className="fas fa-times" onClick={cancelInvitation} />
            </Popover>
          )}
        </div>
      </ActionsContainer>
    </Box>
  )
}

export default connect(
  null,
  dispatch => ({
    teamMemberThunks: bindActionCreators(teamMemberThunks, dispatch)
  })
)(Invitation)

// SC
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Label = styled(Typography)`
  color: ${({ theme }) => theme.label};
  font-weight: 500;
`

const SuccessMessage = styled(Typography)`
  color: ${({ theme }) => theme.primary};
`

const AvatarContainer = styled.div`
  position: relative;
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  i {
    margin-left: 25px;
  }
`

const FaIcon = styled.i.attrs(({ className }) => ({
  className
}))`
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  font-size: 22px;
  color: ${({ theme }) => theme.label};

  :hover {
    color: ${({ theme }) => theme.primary};
  }
`

const LoadingIcon = styled(Icon).attrs({
  type: 'loading'
})`
  font-size: 22px;
  color: ${({ theme }) => theme.primary};
`
