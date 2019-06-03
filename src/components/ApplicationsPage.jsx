import React, { useState, useEffect } from 'react'
import { Typography, Icon } from 'antd'
import styled from 'styled-components'
import { Label, PillButton } from 'styled'
import Application from './application/Application'
import CreateApplicationModal from './application/CreateApplicationModal'
import { applicationThunks, applicationSelectors } from 'state/ducks/applicationDuck'
import { companySelectors } from 'state/ducks/companyDuck'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const ApplicationsPage = ({ company, applications, applicationThunks }) => {
  const [state, setState] = useState({ showCreateModal: false })

  const triggerCreateModal = () => setState({ ...state, showCreateModal: !state.showCreateModal })

  useEffect(() => {
    const getApplications = async () => {
      await applicationThunks.getApplications(company.id)
    }

    getApplications()
  }, [])

  return (
    <Container>
      <Header>
        <BadgeContainer>
          <AppIcon />
        </BadgeContainer>

        <HeaderInfo>
          <Typography.Title style={{ marginBottom: 4 }} level={2}>
            Applications
          </Typography.Title>

          <Label style={{ marginLeft: 2 }}>{applications.count} apps registered</Label>
        </HeaderInfo>

        <PillButton onClick={triggerCreateModal} style={{ marginLeft: 'auto' }}>
          New Application
        </PillButton>
      </Header>

      <Content>
        {applications.items.map(application => (
          <ApplicationContainer key={application.id}>
            <Application application={application} />
          </ApplicationContainer>
        ))}
      </Content>

      <CreateApplicationModal visible={state.showCreateModal} onCancel={triggerCreateModal} />
    </Container>
  )
}

export default connect(
  state => ({
    applications: {
      items: applicationSelectors.getItems(state),
      count: applicationSelectors.getCount(state)
    },
    company: companySelectors.getCompany(state)
  }),
  dispatch => ({
    applicationThunks: bindActionCreators(applicationThunks, dispatch)
  })
)(ApplicationsPage)

// SC
const Container = styled.section`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  align-items: flex-start;
`

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -5px;
`

const BadgeContainer = styled.div`
  border-radius: 15px;
  height: fit-content;
  padding: 20px 22px;
  background-image: ${({ theme }) => theme.gradient};
  box-shadow: ${({ theme }) => theme.shadow.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 25px;
`

const AppIcon = styled(Icon).attrs({ type: 'appstore' })`
  color: white;
  font-size: 20px;
`

const Content = styled.div`
  padding-top: 50px;
  flex: 1;
  display: grid;
  margin: -10px;
  grid-template-columns: 1fr 1fr 1fr;
`

const ApplicationContainer = styled.div`
  padding: 10px;
`
