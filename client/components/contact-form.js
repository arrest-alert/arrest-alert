import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchContacts, putContact, removeContact} from '../store/contacts'
import {number} from 'prop-types'

export class Contacts extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.fetchContacts(this.props.user)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state.buttonClick = false
    this.state.contactName = ''
    this.state.number = ''
    this.state.message = ''
    this.state.edit = false
    this.state.activeEdit = false
  }

  handleClick = () => {
    this.setState({
      buttonClick: !this.state.buttonClick
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    let contactInfo = {
      message: this.state.message,
      contactName: this.state.contactName,
      number: this.state.number
    }
    let userId = this.props.user
    console.log('Contact Info => ', contactInfo)
    this.props.putContact(userId, contactInfo)
    this.setState({
      message: '',
      contactName: '',
      number: '',
      buttonClick: false
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRemove = contactId => {
    console.log('contact ID =>', contactId)
    this.props.removeContact(contactId)
  }

  handleEdit = contactId => {
    this.setState({
      edit: !this.state.edit,
      activeEdit: !this.state.activeEdit
    })
  }

  render() {
    let contacts = this.props.contacts
    return (
      <div className="contacts">
        <h4>Your Contacts</h4>
        <div>
          {contacts.contacts.map(contact => (
            <div key={contact.contactName} className="contact-list">
              <p
                className={
                  this.state.activeEdit
                    ? 'contact-name edit-fields'
                    : 'contact-name'
                }
                contentEditable={this.state.edit}
              >
                {contact.contactName}
              </p>
              <p
                className={this.state.activeEdit ? 'edit-fields' : null}
                contentEditable={this.state.edit}
              >
                {contact.number}
              </p>
              <p
                className={
                  this.state.activeEdit ? 'message edit-fields' : 'message'
                }
                contentEditable={this.state.edit}
              >
                {contact.message}
              </p>
              <button
                type="button"
                onClick={() => this.handleRemove(contact.id)}
              >
                <p>remove</p>
              </button>
              <button type="button" onClick={() => this.handleEdit(contact.id)}>
                <p>edit</p>
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={this.handleClick}>
          Add
        </button>
        {this.state.buttonClick ? (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="contactName"
                onChange={this.handleChange}
                className="field"
                value={this.state.contactName}
              />
            </label>

            <label>
              Number:
              <input
                type="text"
                name="number"
                onChange={this.handleChange}
                className="field"
                value={this.state.number}
              />
            </label>

            <label>
              Custom Message (opt):
              <input
                type="text"
                name="message"
                onChange={this.handleChange}
                className="field"
                value={this.state.message}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        ) : null}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
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
    fetchContacts: userId => dispatch(fetchContacts(userId)),
    putContact: (userId, contactInfo) =>
      dispatch(putContact(userId, contactInfo)),
    removeContact: contactId => dispatch(removeContact(contactId))
  }
}

export default connect(mapState, mapDispatch)(Contacts)
