import React from 'react'
import styled from 'styled-components'
import { Box } from 'styled'
import { Typography } from 'antd'
import { Label } from 'styled'
import { Link } from 'react-router-dom'

const Application = ({ application }) => {
  return (
    <Link to={`/applications/${application.id}`}>
      <ApplicationBox hoverable>
        <Title>{application.name}</Title>

        <Footer>
          <Statistic style={{ borderRight: '1px solid #efefef' }}>
            <Group>
              <Number>93%</Number>
            </Group>

            <Label style={{ textAlign: 'center' }}>Uptime</Label>
          </Statistic>

          <Statistic>
            <Group>
              <Number>32</Number>
            </Group>

            <Label style={{ textAlign: 'center' }}>Events</Label>
          </Statistic>
        </Footer>
      </ApplicationBox>
    </Link>
  )
}

export default Application

const ApplicationBox = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const Title = styled(Typography.Title).attrs({ level: 4 })`
  text-align: center;
  padding: 40px 0px;
  font-weight: bold !important;
`

const Footer = styled.div`
  display: flex;
`

const Statistic = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`

const Number = styled(Typography.Title).attrs({ level: 2 })`
  /* color: ${({ theme }) => theme.green} !important; */
  font-weight: 400 !important;
  margin-top: -10px;
  margin-bottom: 0 !important;
`

const Group = styled.div`
  display: flex;
  justify-content: center;
`
