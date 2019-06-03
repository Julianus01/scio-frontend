import React, { useState } from 'react'
import styled from 'styled-components'
import { BorderlessInput, PillButton } from 'styled'
import { message as Message, Typography } from 'antd'

import { connect } from 'react-redux'
import { companyThunks } from 'state/ducks/companyDuck'
import { authSelectors } from 'state/ducks/authDuck'
import { bindActionCreators } from 'redux'

const CreateCompanyPage = ({ user, history, companyThunks }) => {
  const [companyName, setCompanyName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onInputChange = event => {
    setCompanyName(event.target.value)
  }

  const createCompany = async () => {
    try {
      setIsLoading(true)
      await companyThunks.createCompany(user.id, companyName)
      history.push('/')
    } catch (error) {
      Message.error(error.message)
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <TextContainer>
        <Description>
          Type in your company name and we will <em>get started.</em>
        </Description>
      </TextContainer>

      <Input
        maxLength={20}
        value={companyName}
        onChange={onInputChange}
        placeholder='Type Company name...'
      />

      <PillButton
        loading={isLoading}
        disabled={companyName.length < 3}
        style={{ marginTop: 'auto', marginBottom: 40 }}
        onClick={createCompany}
      >
        Create
      </PillButton>
    </Container>
  )
}

const mapState = state => ({
  user: authSelectors.getUser(state)
})

const mapDispatch = dispatch => ({
  companyThunks: bindActionCreators(companyThunks, dispatch)
})

export default connect(
  mapState,
  mapDispatch
)(CreateCompanyPage)

// SC
const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`

const Input = styled(BorderlessInput)`
  font-size: 40px;
  text-align: center;
  height: auto;

  ::placeholder {
    color: ${({ theme }) => theme.label};
  }
`

const TextContainer = styled.div`
  /* margin-top: 10vh; */
  margin-bottom: 20vh;
`

const Description = styled(Typography)`
  /* color: ${({ theme }) => theme.text}; */
  margin-bottom: 50px;
  text-align: center;
  max-width: 300px;

  em {
    color: ${({ theme }) => theme.text};
    font-style: normal;
  }
`
