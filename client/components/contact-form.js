import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchContacts} from '../store/contacts'

export class Contacts extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.fetchContacts(this.props.user)
    this.state.buttonClick = false
  }

  handleClick = () => {
    this.setState({
      buttonClick: !this.state.buttonClick
    })
    console.log('this.state.buttonCLICK =>', this.state.buttonClick)
  }

  render() {
    let contacts = this.props.contacts

    console.log('CONTACTS => ', contacts)
    return (
      <div className="contacts">
        <h4>Your Contacts</h4>
        <div>
          {contacts.contacts.map(contact => (
            <div key={contact.contactName}>
              <p>{contact.contactName}</p>
              <p>{contact.number}</p>
              <p>{contact.message}</p>
            </div>
          ))}
        </div>
        <button type="button" onClick={this.handleClick}>
          Add
        </button>
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
