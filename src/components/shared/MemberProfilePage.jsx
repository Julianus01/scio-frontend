import React from 'react'
import { Avatar, Typography } from 'antd'
import styled from 'styled-components'

const MemberProfilePage = () => {
  return (
    <Container>
      <ProfileContainer>
        <div style={{ position: 'relative' }}>
          <Absolute>
            <AdminBadge />
          </Absolute>

          <Avatar
            src='https://lh4.googleusercontent.com/-D81kEKNDyn8/AAAAAAAAAAI/AAAAAAAAhF0/1Lfbd4Z458M/photo.jpg'
            icon='user'
            type='square'
            size={180}
            style={{ marginBottom: 40 }}
          />
        </div>

        <Info>
          <Typography.Title
            level={2}
            style={{ fontWeight: 'bold', marginBottom: 0 }}
          >
            Iulian Crisan
          </Typography.Title>
          <Email style={{ marginLeft: 1 }}>iuliancrisan01@gmail.com</Email>
        </Info>
      </ProfileContainer>

      <Content />
    </Container>
  )
}

export default MemberProfilePage

// SC
const Container = styled.div`
  display: flex;
  flex: 1;
`

const Content = styled.div`
  flex: 1;
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`

const Absolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

const Email = styled(Typography)`
  color: ${({ theme }) => theme.primary};
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
  padding: 4px;
  background-color: white;
`

const BadgeContainerInner = styled.div`
  border-radius: 50%;
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primary};
`

const Badge = styled.i`
  color: white;
  position: absolute;
  font-size: 16px;
  padding-bottom: 2px;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`
