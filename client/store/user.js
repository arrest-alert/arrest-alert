import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATED_NAME = 'UPDATED_NAME'
const UPDATED_EMAIL = 'UPDATED_EMAIL'

/**
 * INITIAL STATE
 */
const defaultUser = {
  fullName: '',
  email: ''
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updatedName = fullName => ({type: UPDATED_NAME, fullName})
const updatedEmail = email => ({type: UPDATED_EMAIL, email})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const updateName = (userId, fullName) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${userId}`, fullName)
    dispatch(updatedName(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const updateEmail = (userId, email) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${userId}`, email)
    dispatch(updatedEmail(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const auth = (email, password, fullName, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password, fullName})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATED_NAME:
      return {
        ...state, fullName: action.fullName.fullName
      }
    case UPDATED_EMAIL:
      return {...state, email: action.email.email}
    default:
      return state
  }
}
