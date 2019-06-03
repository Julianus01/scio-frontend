import React from 'react'
import { Typography } from 'antd'
import styled from 'styled-components'
import { companySelectors } from 'state/ducks/companyDuck'
import { connect } from 'react-redux'

const { Title } = Typography

const DashboardPage = ({ company, companyMeta }) => {
  if (companyMeta.isFetching) return null

  return (
    <Container>
      <Title>Dashboard</Title>
    </Container>
  )
}

const mapState = state => ({
  company: companySelectors.getCompany(state),
  companyMeta: companySelectors.getCompanyMeta(state)
})

export default connect(mapState)(DashboardPage)

const Container = styled.section`
  display: flex;
`
