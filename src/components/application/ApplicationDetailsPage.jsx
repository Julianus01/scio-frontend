import React, { useState, useEffect } from 'react'
import ApplicationEndpoints from 'api/ApplicationEndpoints'
import styled from 'styled-components'
import { Typography, Button, notification as Notification } from 'antd'
import _ from 'lodash'
import { applicationThunks } from 'state/ducks/applicationDuck'
import { companySelectors } from 'state/ducks/companyDuck'
import { authSelectors } from 'state/ducks/authDuck'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ConfirmationModal from 'components/shared/ConfirmationModal'

const ApplicationDetailsPage = ({ match, history, applicationThunks, user, company }) => {
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [showConfirmationModal, setConfirmationModal] = useState(false)

  useEffect(() => {
    const getApplication = async () => {
      const {
        data: { application }
      } = await ApplicationEndpoints.getApplication(match.params.applicationId)

      setApplication(application)
      setLoading(false)
    }

    getApplication()
  }, [])

  const deleteApplication = async () => {
    try {
      setDeleteLoading(true)
      await applicationThunks.deleteApplication(user.id, company.id, application.id)
      history.push('/applications')
    } catch (error) {
      setDeleteLoading(false)
      Notification.error({
        message: error.message
      })
    }
  }

  const toggleConfirmationModal = () => {
    setConfirmationModal(!showConfirmationModal)
  }

  if (loading) return <div>Loading...</div>

  if (_.isEmpty(application)) return <div>Resource does not exist</div>

  return (
    <Container>
      <Header>
        <Typography.Title style={{ marginBottom: 4 }} level={2}>
          {application.name}
        </Typography.Title>
      </Header>

      <Footer>
        <Button loading={deleteLoading} type="danger" onClick={toggleConfirmationModal}>
          Delete
        </Button>
      </Footer>

      <ConfirmationModal visible={showConfirmationModal} confirmAction={deleteApplication} onCancel={toggleConfirmationModal} />
    </Container>
  )
}

export default connect(
  state => ({
    user: authSelectors.getUser(state),
    company: companySelectors.getCompany(state)
  }),
  dispatch => ({
    applicationThunks: bindActionCreators(applicationThunks, dispatch)
  })
)(ApplicationDetailsPage)

// SC
const Container = styled.section`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  align-items: flex-start;
`

const Footer = styled.div`
  display: flex;
`
