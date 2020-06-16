import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CONTACTS = 'GET_CONTACTS'
const ADD_CONTACT = 'ADD_CONTACT'
const DELETE_CONTACT = 'DELETE_CONTACT'

/**
 * ACTION CREATORS
 */
const getContacts = contacts => ({type: GET_CONTACTS, contacts})
const addContact = newContact => ({type: ADD_CONTACT, newContact})
const deleteContact = contact => ({type: DELETE_CONTACT, contact})

export function fetchContacts(userId) {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/contacts/${userId}`)
      dispatch(getContacts(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export function putContact(userId, newContact) {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/contacts/${userId}`, newContact)
      dispatch(addContact(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export function removeContact(contactId) {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/contacts/${contactId}`)
      console.log('REMOVE THUNK DATA =>', data)
      dispatch(deleteContact(data))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = {contacts: []}, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.contacts
      }
    case ADD_CONTACT:
      return {
        ...state,
        contacts: state.contacts.push(action.newContact)
      }
    case DELETE_CONTACT:
      console.log('STATE.CONTACTS => ', state.contacts)
      console.log('ACTION.CONTACT =>', action.contact)
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.contact
        )
      }
    default:
      return state
  }
}
