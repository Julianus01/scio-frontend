import React from 'react'
import { Redirect } from 'react-router-dom'
import NoNavRoute from './NoNavRoute'
import { connect } from 'react-redux'
import { authSelectors } from 'state/ducks/authDuck'

const RedirectAuthed = ({ user, ...rest }) => {
  if (user) return <Redirect to='/dashboard' />

  return <NoNavRoute {...rest} />
}

const mapState = state => ({
  user: authSelectors.getUser(state)
})

export default connect(mapState)(RedirectAuthed)
