import React from 'react'
import { Redirect } from 'react-router-dom'
import NavRoute from './NavRoute'
import { connect } from 'react-redux'
import { authSelectors }  from 'state/ducks/authDuck'
import { companySelectors }  from 'state/ducks/companyDuck'
import LoadingPage from '../components/shared/LoadingPage'

const AuthRoute = ({ user, company, companyMeta, ...rest }) => {
  if (!user) return <Redirect to='/' />
  if (companyMeta.isFetching) return <LoadingPage />
  if (!company.id) return <Redirect to='/create-company' />

  return <NavRoute {...rest} />
}
const mapState = state => ({
  user: authSelectors.getUser(state),
  company: companySelectors.getCompany(state),
  companyMeta: companySelectors.getCompanyMeta(state),
})

export default connect(mapState)(AuthRoute)
