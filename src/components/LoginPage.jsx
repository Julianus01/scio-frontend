import React from 'react'
import styled, { css } from 'styled-components'
import { Typography } from 'antd'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { authThunks } from 'state/ducks/authDuck'
import { bindActionCreators } from 'redux'
import { useTemporaryMessage } from 'hooks'

const { Title, Text } = Typography

const LoginPage = ({ authThunks }) => {
  const [error, showErrorMessage, hideErrorMessage] = useTemporaryMessage()

  const loginWithFacebook = async () => {
    try {
      await authThunks.loginWithFacebook()
      hideErrorMessage()
    } catch (error) {
      showErrorMessage(error.message)
    }
  }

  const loginWithGoogle = async () => {
    try {
      await authThunks.loginWithGoogle()
      hideErrorMessage()
    } catch (error) {
      showErrorMessage(error.message)
    }
  }

  return (
    <Container>
      <Card>
        <Title style={{ marginTop: 40, marginBottom: 40 }} level={2}>
          Sign In
        </Title>

        <ButtonsContainer>
          <SocialButton type='google' onClick={loginWithGoogle}>
            <SocialIcon type='google' />
            google
          </SocialButton>

          <SocialButton type='facebook' onClick={loginWithFacebook}>
            <SocialIcon type='facebook' />
            facebook
          </SocialButton>
        </ButtonsContainer>

        {error ? (
          <Text type='danger' style={{ textAlign: 'center' }}>
            {error}
          </Text>
        ) : null}
      </Card>
    </Container>
  )
}

const mapDispatch = dispatch => ({
  authThunks: bindActionCreators(authThunks, dispatch)
})

export default connect(
  null,
  mapDispatch
)(LoginPage)

// SC
const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Card = styled.div`
  background-color: white;
  max-width: 400px;
  width: 100%;
  border-radius: 30px;
  padding: 20px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadow.card};
`

const ButtonsContainer = styled.div`
  margin-bottom: 150px;
  width: 100%;
`

const SocialButton = styled.button`
  border-radius: 50px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 40px;
  border: 0;
  margin-bottom: 20px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  :hover {
    ${({ type }) =>
      type === 'google'
        ? css`
            background-color: #db3236;
            color: white;
          `
        : css`
            background-color: #3c5a99;
            color: white;
          `}
  }
`

const SocialIcon = styled(Icon)`
  font-size: 20px;
  margin-right: 20px;
`
