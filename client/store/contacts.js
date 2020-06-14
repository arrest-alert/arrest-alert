import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CONTACTS = 'GET_CONTACTS'
const ADD_CONTACT = 'ADD_CONTACT'

/**
 * ACTION CREATORS
 */
const getContacts = contacts => ({type: GET_CONTACTS, contacts})
const addContact = newContact => ({type: ADD_CONTACT, newContact})

export function fetchContacts(userId) {
  return async dispatch => {
    // try {
    const {data} = await axios.get(`/api/contacts/${userId}`)
    dispatch(getContacts(data))
    // }
    // catch (error) {
    // console.error(error)
    // }
  }
}

export function putContact(userId, newContact) {
  return async dispatch => {
    // try {
    const {data} = await axios.post(`/api/contacts/${userId}`, newContact)
    dispatch(addContact(data))
    // }
    // catch (error) {
    // console.error(error)
    // }
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
    default:
      return state
  }
}
