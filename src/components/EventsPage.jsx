import React from 'react'
import { Typography, Icon } from 'antd'
import { Label, PillButton } from 'styled'
import styled from 'styled-components'

const EventsPage = () => {
  return (
    <Container>
      <Header>
        <BadgeContainer>
          <AppIcon />
        </BadgeContainer>

        <HeaderInfo>
          <Typography.Title style={{ marginBottom: 4 }} level={2}>
            Events
          </Typography.Title>

          <Label style={{ marginLeft: 2 }}>30 events last month</Label>
        </HeaderInfo>

        <PillButton style={{ marginLeft: 'auto' }}>New Event</PillButton>
      </Header>
    </Container>
  )
}

export default EventsPage

const Container = styled.section`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  align-items: flex-start;
`

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -5px;
`

const BadgeContainer = styled.div`
  border-radius: 15px;
  height: fit-content;
  padding: 20px 22px;
  background-image: ${({ theme }) => theme.gradient};
  box-shadow: ${({ theme }) => theme.shadow.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 25px;
`

const AppIcon = styled(Icon).attrs({ type: 'appstore' })`
  color: white;
  font-size: 20px;
`
