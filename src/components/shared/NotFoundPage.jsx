import React from 'react'
import styled from 'styled-components'

const NotFoundPage = () => (
  <Container>
    <h1>404</h1>
    <h4>Page not found</h4>
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export default NotFoundPage
