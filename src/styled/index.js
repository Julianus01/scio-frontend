import React from 'react'

import { Icon, Input, Button, Modal, Typography } from 'antd'
import styled, { css } from 'styled-components'

const IconInCircle = styled(Icon).attrs(({ type }) => ({
  type
}))`
  color: #1890ff;
  font-size: ${({ size }) => (size ? size : '18px')};
`

const CircleIconContainer = styled.div`
  background-color: ${({ theme }) => theme.primary_extra_light};
  border-radius: 50%;
  padding: 13px;
  display: inline-table;
  width: fit-content;
`

export const CircleIcon = ({ size, type }) => (
  <CircleIconContainer size={size}>
    <IconInCircle size={size} type={type} theme="filled" />
  </CircleIconContainer>
)

const BorderlessInputContainer = styled.div`
  display: flex;
  align-items: center;
`

const BorderlessInputStyled = styled(Input)`
  border: 0;
  font-weight: bold;
  font-size: ${({ fontSize }) => fontSize && fontSize};
  padding-left: 0;
  padding-right: 0;

  :focus {
    box-shadow: none;
  }

  &:disabled {
    background-color: transparent;
  }
`

export const BorderlessInput = ({ icon, style, ...restProps }) => (
  <BorderlessInputContainer style={style}>
    {icon}
    <BorderlessInputStyled {...restProps} />
  </BorderlessInputContainer>
)

export const PillButton = styled(Button)`
  font-weight: 600;
  border-radius: 50px;
  padding: 10px 20px;
  min-width: 140px;
  border: 0;

  ${({ theme, type }) => {
    switch (type) {
      case 'danger': {
        return css`
          background-color: ${theme.danger};
          box-shadow: ${({ loading, theme }) => (loading ? null : theme.shadow.danger)};

          :hover,
          :active,
          :focus {
            background-color: ${({ theme }) => theme.danger};
            color: white;
            box-shadow: none;
          }
        `
      }

      default: {
        return css`
          background-color: ${theme.primary};
          box-shadow: ${({ loading, theme }) => (loading ? null : theme.shadow.primary)};

          :hover,
          :active,
          :focus {
            background-color: ${({ theme }) => theme.primary};
            color: white;
            box-shadow: none;
          }
        `
      }
    }
  }};
  height: auto;
  color: white;
`

export const FlatButton = styled(Button)`
  font-weight: 600;
  border-radius: 50px;
  padding: 10px 20px;
  min-width: 140px;
  border: 0;
  height: auto;
  background: white;
  box-shadow: none;

  :hover,
  :active,
  :focus {
    background-color: white;
    color: ${({ theme }) => theme.danger};
    box-shadow: 0;
    outline: 0;
  }
`

const StyledModal = styled(Modal).attrs({
  footer: null
})`
  .ant-modal-footer {
    text-align: left;
    border: 0;
  }

  .ant-modal-close {
    display: none;
  }

  .ant-modal-content {
    box-shadow: ${({ theme }) => theme.shadow.card};
    border-radius: 15px;
  }
`

export { StyledModal as Modal }

export const Box = styled.div`
  display: flex;
  padding: 25px;
  border-radius: 15px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: ${({ theme }) => theme.shadow.light};
  transition: box-shadow 0.3s;

  ${({ hoverable }) =>
    hoverable &&
    css`
      cursor: pointer;
      &:hover {
        box-shadow: ${({ theme }) => theme.shadow.card};
      }
    `}
`

export const Label = styled(Typography)`
  color: ${({ theme }) => theme.label};
  transition: all 0.3s ease-in-out;
`
