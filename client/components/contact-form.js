import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchContacts} from '../store/contacts'

export class Contacts extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.fetchContacts(this.props.user)
  }
  render() {
    let contacts = this.props.contacts

    console.log('CONTACTS => ', contacts)
    return (
      <div>
        <h1>Your Contacts</h1>
        <div>
          {contacts.contacts.map(contact => (
            <div key={contact.contactName}>
              <p>{contact.contactName}</p>
              <p>{contact.number}</p>
              <p>{contact.message}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    contacts: state.contacts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchContacts: userId => dispatch(fetchContacts(userId))
  }
}

export default connect(mapState, mapDispatch)(Contacts)
