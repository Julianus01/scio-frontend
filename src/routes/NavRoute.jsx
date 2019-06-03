import React from 'react'
import { Route } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import styled, { css } from 'styled-components'
import Sidebar from '../components/Sidebar'

export default ({ boxed, sidebar = true, navbar = true, ...restProps }) => {
  return (
    <Container>
      {sidebar && <Sidebar />}

      <Content>
        {navbar && <Navbar />}

        <PageContainer boxed={boxed}>
          <Route test='bullshit' {...restProps} />
        </PageContainer>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`

const Content = styled.section`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
`

const PageContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 0 50px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  ${({ boxed }) =>
    boxed &&
    css`
      max-width: 1200px;
    `}
`
