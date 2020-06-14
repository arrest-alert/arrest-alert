import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserInfo from './user-info'
import Contacts from './contact-form'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  console.log('PROPS =>', props)
  return (
    <div>
      <h3>Welcome, {email}</h3>
      <UserInfo />
      <Contacts user={props.id} />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    id: state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  id: PropTypes.number
}
