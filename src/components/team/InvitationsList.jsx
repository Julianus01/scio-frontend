import React from 'react'
import styled from 'styled-components'
import Invitation from './Invitation'
import EmptyInvitations from './EmptyInvitations'
import { branch, compose, renderComponent } from 'recompose'

const InvitationsList = ({ invitations }) => {
  return (
    <ListContainer>
      {invitations.map(invitation => (
        <InvitationContainer key={invitation.uuid}>
          <Invitation invitation={invitation} />
        </InvitationContainer>
      ))}
    </ListContainer>
  )
}

export default compose(
  branch(props => props.invitations.length === 0, renderComponent(EmptyInvitations))
)(InvitationsList)

const ListContainer = styled.div`
  margin: -10px -40px;
  padding: 0 30px;
  padding-top: 20px;
  padding-bottom: 40px;
  flex: 1;
  overflow-y: auto;
`

const InvitationContainer = styled.div`
  padding: 10px;
`
