import React from 'react'
import { Typography } from 'antd'
import styled from 'styled-components'

const { Title } = Typography

const StatusPage = () => {
  return (
    <Container>
      <Title>Status Page</Title>
    </Container>
  )
}

const Container = styled.section`
  display: flex;
`

export default StatusPage
