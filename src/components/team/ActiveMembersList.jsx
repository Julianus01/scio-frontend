import React from 'react'
import styled from 'styled-components'
import TeamMember from './TeamMember'

const ActiveMembersList = ({ members }) => {
  if (!members.length) return null

  return (
    <ListContainer>
      {members.map(member => (
        <TeamMemberContainer key={member}>
          <TeamMember member={member} />
        </TeamMemberContainer>
      ))}
    </ListContainer>
  )
}

export default ActiveMembersList

// SC
const ListContainer = styled.div`
  margin: -10px;
  display: grid;
  padding-top: 20px;
  grid-template-columns: 1fr 1fr 1fr;
`

const TeamMemberContainer = styled.div`
  padding: 10px;
`
