import React from 'react'
import { Icon } from 'antd'
import styled from 'styled-components'

export default () => (
  <Container>
    <LoadingIcon />
  </Container>
)

const Container = styled.div`
  display: flex;
  flex: 1;
  margin-top: 30vh;
  justify-content: center;
`

const LoadingIcon = styled(Icon).attrs({
  type: 'loading',
})`
  color: ${({ theme }) => theme.primary};
  font-size: 50px;
`
