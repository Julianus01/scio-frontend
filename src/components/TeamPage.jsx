import React, { useState, useEffect } from 'react'
import { Radio, Icon } from 'antd'
import styled from 'styled-components'
import ActiveMembersList from './team/ActiveMembersList'
import InvitationsList from './team/InvitationsList'
import { PillButton, BorderlessInput } from 'styled'
import InviteTeamMemberModal from './shared/InviteTeamMemberModal'
import { companySelectors } from 'state/ducks/companyDuck'
import { authSelectors } from 'state/ducks/authDuck'
import { connect } from 'react-redux'
import { teamMemberThunks, teamMemberSelectors } from 'state/ducks/teamMemberDuck'
import { bindActionCreators } from 'redux'

const TeamPage = ({ user, company, teamMembers, teamMemberThunks }) => {
  const [selectedTab, setSelectedTab] = useState('active')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const getTeamMembers = async () => {
      teamMemberThunks.getTeamMembers(company.id)
      teamMemberThunks.getInvitations(company.id)
    }

    getTeamMembers()
  }, [])

  const changeTab = tab => () => setSelectedTab(tab)
  const triggerModal = () => setIsModalOpen(!isModalOpen)

  return (
    <Container>
      <Header>
        <Radio.Group defaultValue="active" buttonStyle="solid">
          <RadioButton onClick={changeTab('active')} value="active">
            2 Active
          </RadioButton>
          <RadioButton onClick={changeTab('invitations')} value="invitations">
            12 Invitations
          </RadioButton>
        </Radio.Group>

        <ActionsContainer>
          <BorderlessInput
            icon={<Icon style={{ color: 'rgb(191, 191, 191)', marginRight: 8 }} type="search" />}
            placeholder="Search..."
          />
          <PillButton onClick={triggerModal} icon="user-add">
            Invite new member
          </PillButton>
        </ActionsContainer>
      </Header>

      <Content>
        {selectedTab === 'active' && <ActiveMembersList members={teamMembers.members} />}
        {selectedTab === 'invitations' && <InvitationsList invitations={teamMembers.invitations} />}
      </Content>

      <InviteTeamMemberModal user={user} company={company} visible={isModalOpen} onCancel={triggerModal} />
    </Container>
  )
}

export default connect(
  state => ({
    user: authSelectors.getUser(state),
    company: companySelectors.getCompany(state),
    teamMembers: {
      members: teamMemberSelectors.getMembers(state),
      invitations: teamMemberSelectors.getInvitations(state)
    }
  }),
  dispatch => ({
    teamMemberThunks: bindActionCreators(teamMemberThunks, dispatch)
  })
)(TeamPage)

// SC
const Container = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Header = styled.div`
  display: flex;
  margin-bottom: 20px;
`

const RadioButton = styled(Radio.Button)`
  font-weight: 600;
  border: none !important;
  border-radius: 50px !important;
  margin: 0 8px;
  box-shadow: none !important;
  height: auto;

  ::before {
    content: none !important;
  }
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const ActionsContainer = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`
