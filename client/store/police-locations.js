import axios from 'axios'
require('../../secrets')

const apiKey = process.env.GOOGLE_API_KEY

export const GET_PRECINCT = 'GET_PRECINCT'

export const fetch_locations = locations => ({
  type: 'GET_PRECINCT',
  locations
})

export const getPoliceLocation = coordinates => {
  return async dispatch => {
    try {
      console.log(coordinates, 'coordinates')
      const theUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        coordinates.lat
      },${coordinates.lng}&radius=1500&type=police&key=${apiKey}`
      let {data} = await axios.get(theUrl)
      console.log(data, 'DATA')
      dispatch(fetch_locations(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//
const initialState = {
  precincts: []
}

export default function policeLocation(state = initialState, action) {
  switch (action.type) {
    case GET_PRECINCT:
      return {
        ...state,
        precincts: action.locations.results
      }
    default:
      return state
  }
}
