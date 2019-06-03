import React, { memo } from 'react'
import styled from 'styled-components'
import { Avatar, Typography } from 'antd'
import { withRouter } from 'react-router'
import { Box } from 'styled'
import { compose } from 'redux'

const TeamMember = ({ history, member }) => {
  const goToProfile = () => history.push('/team/profile')

  return (
    <Box hoverable onClick={goToProfile}>
      <AvatarContainer>
        <Avatar
          src={member.photoURL}
          style={{ marginRight: 20 }}
          size={50}
          icon='user'
        />

        {member.isAdmin && (
          <Absolute>
            <AdminBadge />
          </Absolute>
        )}
      </AvatarContainer>

      <DetailsContainer>
        <UserName>{member.displayName}</UserName>
        <Label>{member.email}</Label>
      </DetailsContainer>
    </Box>
  )
}

export default compose(
  memo,
  withRouter
)(TeamMember)

// SC
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const UserName = styled(Typography)`
  font-weight: 600;
`

const Label = styled(Typography)`
  color: ${({ theme }) => theme.label};
  font-weight: 500;
`

const AvatarContainer = styled.div`
  position: relative;
`

const Absolute = styled.div`
  position: absolute;
  top: -6px;
  left: -6px;
`

const AdminBadge = () => {
  return (
    <BadgeContainerOuter>
      <BadgeContainerInner>
        <Badge className='fas fa-crown' />
      </BadgeContainerInner>
    </BadgeContainerOuter>
  )
}

const BadgeContainerOuter = styled.div`
  border-radius: 50%;
  padding: 2px;
  background-color: white;
`

const BadgeContainerInner = styled.div`
  border-radius: 50%;
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primary};
`

const Badge = styled.i`
  color: white;
  position: absolute;
  font-size: 8px;
  padding-bottom: 2px;
`
