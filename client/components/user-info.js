import React from 'react'
import {connect} from 'react-redux'
import {updateEmail, updateName} from '../store/user'

export class UserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nameClicked: false,
      emailClicked: false,
      fullName: '',
      email: ''
    }
    this.toggleName = this.toggleName.bind(this)
    this.toggleEmail = this.toggleEmail.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitName = this.handleSubmitName.bind(this)
    this.handleSubmitEmail = this.handleSubmitEmail.bind(this)
  }

  toggleName() {
    return this.setState({
      nameClicked: !this.state.nameClicked
    })
  }

  toggleEmail() {
    return this.setState({
      emailClicked: !this.state.emailClicked
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmitName(event) {
    event.preventDefault()
    const userId = this.props.user.id
    const fullName = {fullName: this.state.fullName}
    this.props.updateName(userId, fullName)
    this.setState({
      fullName: ''
    })
  }

  handleSubmitEmail(event) {
    event.preventDefault()
    const userId = this.props.user.id
    const email = {email: this.state.email}
    this.props.updateEmail(userId, email)
    this.setState({
      email: ''
    })
  }

  render() {
    let user = this.props.user
    const {fullName, email} = this.state
    return (
      <div id="myAccount">
        <div>
          {user && (
            <div key={user.id}>
              <br />
              <h2 className="acct-details">
                <div className="name-header">Name</div>{' '}
                <div className="name">{user.fullName}</div>{' '}
                <button
                  type="button"
                  onClick={this.toggleName}
                  className="edit"
                >
                  Edit
                </button>
                {this.state.nameClicked ? (
                  <form onSubmit={this.handleSubmitName}>
                    <label>
                      Name:
                      <input
                        type="text"
                        name="fullName"
                        onChange={this.handleChange}
                        value={fullName}
                        className="field"
                      />
                    </label>
                    <button type="submit">Update</button>
                  </form>
                ) : null}
              </h2>
              <h2 className="acct-details">
                <div className="name-header">Email</div>{' '}
                <div className="name">{user.email}</div>{' '}
                <button
                  type="button"
                  onClick={this.toggleEmail}
                  className="edit"
                >
                  Edit
                </button>
                {this.state.emailClicked ? (
                  <form onSubmit={this.handleSubmitEmail}>
                    <label>
                      Email:
                      <input
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                        value={email}
                        className="field"
                      />
                    </label>

                    <button type="submit">Update</button>
                  </form>
                ) : null}
              </h2>
            </div>
          )}
        </div>
      </div>
    )
  }
}
const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateName: (userId, fullName) => dispatch(updateName(userId, fullName)),
    updateEmail: (userId, email) => dispatch(updateEmail(userId, email))
  }
}

export default connect(mapState, mapDispatch)(UserInfo)
