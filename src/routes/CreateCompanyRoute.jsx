import React from 'react'
import styled from 'styled-components'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { authSelectors } from 'state/ducks/authDuck'
import { companySelectors } from 'state/ducks/companyDuck'
import Navbar from '../components/shared/Navbar'

const CreateCompanyRoute = ({ user, company, companyMeta, ...restProps }) => {
  if (companyMeta.isFetching) return null

  if (!user || company.id) return <Redirect to='/' />

  return (
    <Container>
      <Navbar />

      <Route {...restProps} />
    </Container>
  )
}

export default connect(state => ({
  user: authSelectors.getUser(state),
  company: companySelectors.getCompany(state),
  companyMeta: companySelectors.getCompanyMeta(state)
}))(CreateCompanyRoute)

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`
