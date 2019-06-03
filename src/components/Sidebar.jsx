import React from 'react'
import { Menu, Icon } from 'antd'
import styled from 'styled-components'
import { Typography } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import { companySelectors }  from 'state/ducks/companyDuck'
import { connect } from 'react-redux'
import { compose } from 'redux'

const getSelectedMenuKeyBasedOnPath = location => {
  const { pathname } = location
  const pathWithoutFirstSlash = pathname.slice(1)

  if (pathWithoutFirstSlash.includes('/'))
    return pathWithoutFirstSlash.slice(0, pathWithoutFirstSlash.indexOf('/'))

  return pathWithoutFirstSlash
}

const Sidebar = ({ history, company }) => {
  const selectedMenuItemKey = getSelectedMenuKeyBasedOnPath(history.location)

  return (
    <Container>
      <LogoContainer>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {company.id ? company.name : null}
        </Typography.Title>
      </LogoContainer>

      <ResponsiveMenu selectedKeys={[selectedMenuItemKey]} mode='inline'>
        <Menu.Item key='dashboard'>
          <Icon type='layout' />
          <Link to='/dashboard'>Dashboard</Link>
        </Menu.Item>

        <Menu.Item key='applications'>
          <Icon type='appstore' />
          <Link to='/applications'>Applications</Link>
        </Menu.Item>

        <Menu.Item key='events'>
          <Icon type='calendar' />
          <Link to='/events'>Events</Link>
        </Menu.Item>

        <Menu.Item key='team'>
          <Icon type='team' />
          <Link to='/team'>Team Members</Link>
        </Menu.Item>

        <Menu.Item key='subscribers'>
          <Icon type='mail' />
          <Link to='/subscribers'>Subscribers</Link>
        </Menu.Item>

        <Menu.Item key='company'>
          <Icon type='bank' />
          <Link to='/company'>Company</Link>
        </Menu.Item>

        <Menu.Item key='statuspage'>
          <Icon type='book' />
          <Link to='/statuspage'>Status Page</Link>
        </Menu.Item>
      </ResponsiveMenu>
    </Container>
  )
}

export default compose(
  withRouter,
  connect(state => ({ company: companySelectors.getCompany(state) }))
)(Sidebar)

// SC
const Container = styled.div`
  height: 100%;
  background: rgb(250, 250, 251);
  background-image: linear-gradient(
    to right bottom,
    #f0f1fa,
    #f4f4fb,
    #f8f8fc,
    #fcfbfe,
    #ffffff
  );
  display: flex;
  flex-direction: column;
  z-index: 1;

  .ant-menu-inline {
    border-right: 0;
  }

  .ant-menu {
    background: transparent;
  }

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: transparent;
  }

  li {
    display: flex;
    align-items: center;
    height: 60px !important;
    font-size: 600;
    padding-left: 100px !important;

    @media (max-width: 1824px) {
      padding-left: 50px !important;
    }

    a {
      font-weight: bold;
    }

    .anticon {
      font-size: 20px;
    }
  }
`

const ResponsiveMenu = styled(Menu)`
  width: 350px;

  @media (max-width: 1824px) {
    width: 250px;
  }
`

const LogoContainer = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`
