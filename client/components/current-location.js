import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPoliceLocation} from '../store/police-locations'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
import {isPointWithinRadius} from 'geolib'
import axios from 'axios'
import store from '../store'
import {CallContext} from 'twilio/lib/rest/api/v2010/account/call'
require('../../secrets')

class CurrentLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      isMarkerShown: false
    }
    this.sendArrestAlert = this.sendArrestAlert.bind(this)
    this.showCurrentLocation = this.showCurrentLocation.bind(this)
    this.amIArrested = this.amIArrested.bind(this)
  }

  componentDidMount() {
    this.showCurrentLocation()
  }
  componentDidUpdate() {
    const result = this.amIArrested()
    this.sendArrestAlert(result)
  }

  showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState(prevState => ({
          currentLatLng: {
            ...prevState.currentLatLng,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          isMarkerShown: true
        }))
        this.props.getPoliceLocation(this.state.currentLatLng)
      })
    } else {
      console.log('error:location not found')
    }
  }

  sendArrestAlert = boolean => {
    if (boolean) {
      const state = store.getState()
      const userId = state.user.id
      axios.post(`/api/police/${userId}`, {
        location: this.props.precincts[0].name
      })
    }
  }

  amIArrested = () => {
    if (!this.props.precincts[0]) {
      return false
    }
    return isPointWithinRadius(
      {
        latitude: this.state.currentLatLng.lat,
        longitude: this.state.currentLatLng.lng
      },
      {
        latitude: this.props.precincts[0].geometry.location.lat,
        longitude: this.props.precincts[0].geometry.location.lng
      },
      800
    )
  }

  render() {
    const Map = () => {
      return (
        <div>
          <GoogleMap
            defaultZoom={10}
            defaultCenter={{
              lat: this.state.currentLatLng.lat,
              lng: this.state.currentLatLng.lng
            }}
          >
            <Marker
              position={{
                lat: this.state.currentLatLng.lat,
                lng: this.state.currentLatLng.lng
              }}
            />
          </GoogleMap>

          <h2>Your Location is Now Being Tracked! Stay Safe!</h2>
        </div>
      )
    }

    const WrapperMap = withScriptjs(withGoogleMap(Map))
    const apiKey = process.env.GOOGLE_API_KEY

    return (
      <div style={{width: '100vw', height: '100vh'}}>
        <WrapperMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
          loadingElement={<div style={{height: `100%`}} />}
          containerElement={<div style={{height: `400px`}} />}
          mapElement={<div style={{height: `100%`}} />}
        />
      </div>
    )
  }
}
const mapState = state => {
  return {
    precincts: state.policeLocation.precincts
  }
}

const mapDispatch = dispatch => {
  return {
    getPoliceLocation: locations => dispatch(getPoliceLocation(locations))
  }
}
export default connect(mapState, mapDispatch)(CurrentLocation)
