import React from 'react'
import styled from 'styled-components'
import { Card, Icon, Menu, Dropdown, Avatar } from 'antd'
import { withRouter } from 'react-router-dom'
import { Typography } from 'antd'
import { connect } from 'react-redux'
import { authThunks, authSelectors } from 'state/ducks/authDuck'
import { bindActionCreators, compose } from 'redux'

const getMenuOverlay = logout => (
  <Menu>
    <Menu.Item key='0'>
      <div role='button' onClick={logout}>
        <MenuIcon type='logout' />
        Logout
      </div>
    </Menu.Item>
  </Menu>
)

const Navbar = ({ user, authThunks, history }) => {
  const logout = async () => {
    await authThunks.logout()
    history.push('/')
  }

  return (
    <Container>
      <Dropdown
        placement='bottomRight'
        overlay={getMenuOverlay(logout)}
        trigger={['click']}
      >
        <div style={{ display: 'flex', cursor: 'pointer' }}>
          <UserInformationContainer>
            <Typography>{user.displayName}</Typography>
            <Pill />
          </UserInformationContainer>

          <Avatar shape='square' size='large' icon='user' src={user.photoURL} />
        </div>
      </Dropdown>
    </Container>
  )
}

const mapState = state => ({
  user: authSelectors.getUser(state)
})

const mapDispatch = dispatch => ({
  authThunks: bindActionCreators(authThunks, dispatch)
})

export default compose(
  withRouter,
  connect(
    mapState,
    mapDispatch
  )
)(Navbar)

// SC
const Container = styled(Card).attrs({ bordered: false })`
  width: 100%;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  min-height: 120px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0 50px;

  .ant-card-body {
    padding: 0px;
  }
`

const UserInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 20px;
  font-weight: 600;
`

const Pill = styled.div`
  border-radius: 50px;
  width: 50px;
  height: 5px;
  margin-top: 2px;
  background-color: ${({ theme }) => theme.primary};
  box-shadow: ${({ theme }) => theme.shadow.card};
`

const MenuIcon = styled(Icon)`
  margin-right: 8px;
`
