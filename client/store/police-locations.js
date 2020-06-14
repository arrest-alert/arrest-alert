import axios from 'axios'

export const GET_PRECINCT = 'GET_PRECINCT'

export const fetch_locations = locations => ({
  type: 'GET_PRECINCT',
  locations
})

export const getPoliceLocation = coordinates => {
  return async dispatch => {
    try {
      console.log(coordinates, 'When is this happening?')
      const theUrl =
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.796504,-73.9677392&radius=1500&type=police&key=AIzaSyCgs5avsC6b6RK6FisOT12suKb0Qdp5CDA'
      const {data} = await function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open('GET', theUrl, false)
        xmlHttp.send(null)
        return xmlHttp.responseText
      }

      //   method: 'GET',
      //   url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      //   params: {location: "40.796504, -73.9677392", radius: "1500", type: "police", key: "AIzaSyCgs5avsC6b6RK6FisOT12suKb0Qdp5CDA"},
      //  headers: {'Access-Control-Allow-Origin': '*'}
      console.log(data, 'DATA')
      dispatch(fetch_locations(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  precincts: []
}

export default function policeLocation(state = initialState, action) {
  switch (action.type) {
    case GET_PRECINCT:
      return {
        ...state,
        precincts: action.location
      }
    default:
      return state
  }
}
