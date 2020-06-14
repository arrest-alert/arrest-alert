import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPoliceLocation} from '../store/police-locations'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
require('../../secrets')

class CurrentLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      isMarkerShown: false,
      precincts: []
    }
  }

  componentDidMount() {
    this.showCurrentLocation()
  }

  showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          currentLatLng: {
            // ...prevState.currentLatLng,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          isMarkerShown: true
        })
        this.props.getPoliceLocation(this.state.currentLatLng)
      })
    } else {
      console.log('error:location not found')
    }
  }

  render() {
    const Map = () => {
      return (
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
      )
    }

    const WrapperMap = withScriptjs(withGoogleMap(Map))
    const apiKey = process.env.GOOGLE_API_KEY
    console.log(this.state.precincts, 'POLICE')
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
