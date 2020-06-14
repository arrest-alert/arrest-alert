import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CONTACTS = 'GET_CONTACTS'

/**
 * ACTION CREATORS
 */
const getContacts = contacts => ({type: GET_CONTACTS, contacts})

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
    default:
      return state
  }
}
