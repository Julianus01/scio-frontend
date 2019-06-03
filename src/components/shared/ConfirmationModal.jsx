import React, { useState } from 'react'
import { Modal, PillButton } from 'styled'
import styled from 'styled-components'
import { Typography } from 'antd'

const ConfirmationModal = ({ visible, message, onCancel, confirmAction }) => {
  const [loading, setLoading] = useState(false)

  const performAction = async () => {
    setLoading(true)
    await confirmAction()
    setLoading(false)
    onCancel()
  }

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <Content>
        <Description>{message ? message : 'Are you sure?'}</Description>

        <PillButton type="danger" loading={loading} onClick={performAction}>
          Delete
        </PillButton>
      </Content>
    </Modal>
  )
}

export default ConfirmationModal

// SC
const Content = styled.div`
  display: flex;
  align-items: center;
`

const Description = styled(Typography)`
  margin-right: 80px;
`
