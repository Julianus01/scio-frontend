import React, { useState } from 'react'
import { Modal, BorderlessInput, PillButton, Label } from 'styled'
import styled from 'styled-components'
import { notification as Notification, Typography } from 'antd'
import { companySelectors } from 'state/ducks/companyDuck'
import { authSelectors } from 'state/ducks/authDuck'
import { applicationThunks } from 'state/ducks/applicationDuck'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useTemporaryMessage } from 'hooks'

const CreateApplicationModal = ({ user, company, visible, onCancel, applicationThunks }) => {
  const [state, setState] = useState({ form: { name: '' }, loading: false })
  const [error, showErrorMessage, hideErrorMessage] = useTemporaryMessage()

  const onInputChange = field => event =>
    setState({
      ...state,
      form: {
        ...state.form,
        [field]: event.target.value
      }
    })

  const onEnterPressed = event => {
    if (event.key === 'Enter' && validateApplication()) {
      createApplication()
    }
  }

  const validateApplication = () => (state.form.name.length < 3 ? false : true)

  const createApplication = async () => {
    try {
      hideErrorMessage()
      setState({ ...state, loading: true })
      await applicationThunks.createApplication(state.form.name, company.id, user.id)
      showSuccessNotification(state.form)
      onCancel()
      setState({ form: { name: '' }, loading: false })
    } catch (error) {
      showErrorMessage(error.message)
      setState({ ...state, loading: false })
    }
  }

  const showSuccessNotification = application => {
    Notification.success({
      message: `Application '${application.name}' created :)`
    })
  }

  const closeModal = () => {
    hideErrorMessage()
    onCancel()
  }

  return (
    <Modal visible={visible} onCancel={closeModal}>
      <Content>
        <Group>
          <Label style={{ opacity: state.form.name ? 1 : 0.2 }}>Name</Label>

          <BorderlessInput
            autoFocus
            onKeyPress={onEnterPressed}
            value={state.form.name}
            onChange={onInputChange('name')}
            placeholder="Name..."
          />
        </Group>

        <ErrorMessage style={{ opacity: error ? 1 : 0 }}>{error}</ErrorMessage>

        <PillButton
          loading={state.loading}
          onClick={createApplication}
          disabled={state.form.name.length < 3}
        >
          Create
        </PillButton>
      </Content>
    </Modal>
  )
}

export default connect(
  state => ({
    company: companySelectors.getCompany(state),
    user: authSelectors.getUser(state)
  }),
  dispatch => ({
    applicationThunks: bindActionCreators(applicationThunks, dispatch)
  })
)(CreateApplicationModal)

// SC
const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const Group = styled.div`
  margin-bottom: 20px;
`

const ErrorMessage = styled(Typography.Text).attrs({ type: 'danger' })`
  height: 21px;
  margin-bottom: 10px;
  transition: opacity 0.3s ease-in-out;
`
