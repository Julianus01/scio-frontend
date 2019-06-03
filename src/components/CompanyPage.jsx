import React from 'react'
import { Typography } from 'antd'
import styled from 'styled-components'
import CreateCompanyPage from './company/CreateCompanyPage'
import { connect } from 'react-redux'
import { authSelectors } from 'state/ducks/authDuck'
import { companyThunks, companySelectors } from 'state/ducks/companyDuck'
import { bindActionCreators } from 'redux'

const { Title } = Typography

const CompanyPage = ({ user, company, companyThunks }) => {
  if (!company.id) return <CreateCompanyPage />

  return (
    <Container>
      <Title>Company</Title>
    </Container>
  )
}

const mapState = state => ({
  user: authSelectors.getUser(state),
  company: companySelectors.getCompany(state)
})

const mapDispatch = dispatch => ({
  companyThunks: bindActionCreators(companyThunks, dispatch)
})

export default connect(
  mapState,
  mapDispatch
)(CompanyPage)

// SC
const Container = styled.section`
  display: flex;
`
