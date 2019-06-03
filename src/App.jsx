import React, { useEffect, useState } from 'react'
import UserEndpoints from './api/UserEndpoints'
import { BrowserRouter as Router } from 'react-router-dom'
import LoadingPage from './components/shared/LoadingPage'
import Routes from './routes'
import firebase from 'firebase'
import { authThunks } from './state/ducks/authDuck'
import { companyThunks } from './state/ducks/companyDuck'
import { message as Message } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const App = ({ authThunks, companyThunks }) => {
  const [loading, setLoading] = useState(true)

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged(async fbUser => {
        try {
          setLoading(true)

          if (fbUser) {
            const {
              data: { user }
            } = await UserEndpoints.saveOrUpdateSocialAccountOnServer(fbUser)

            authThunks.authStateChanged(user)
            await companyThunks.getCompany(user.id)
            loading && setLoading(false)
          } else {
            authThunks.authStateChanged(null)
            loading && setLoading(false)
          }
        } catch (error) {
          authThunks.logout()
          Message.error(error.message)
        }
      }),
    []
  )

  if (loading) return <LoadingPage />

  return (
    <Router>
      <Routes />
    </Router>
  )
}

export default connect(
  null,
  dispatch => ({
    authThunks: bindActionCreators(authThunks, dispatch),
    companyThunks: bindActionCreators(companyThunks, dispatch)
  })
)(App)
