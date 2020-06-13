import React, {Component} from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps'

class CurrentLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLatLng: {
        lat: 0,
        lng: 0,
        precints: []
      },
      isMarkerShown: false
    }
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
      })
    } else {
      console.log('error:location not found')
    }
  }

  componentDidMount() {
    this.showCurrentLocation()
  }

  render() {
    const Map = props => {
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

    return (
      <div style={{width: '100vw', height: '100vh'}}>
        <WrapperMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places/json?location=${this.state.currentLatLng.lat,this.state.currentLatLng.lng}&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyASj7zn0ZFN0zPzzaO56qFYSmGgrZIWQ-I"
          //googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyASj7zn0ZFN0zPzzaO56qFYSmGgrZIWQ-I"
          //googleMapURL= {`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.currentLatLng.lat,this.state.currentLatLng.lng}&radius=1500&type=police&key=AIzaSyASj7zn0ZFN0zPzzaO56qFYSmGgrZIWQ-I`}
          loadingElement={<div style={{height: `100%`}} />}
          containerElement={<div style={{height: `400px`}} />}
          mapElement={<div style={{height: `100%`}} />}
        />
      </div>
    )
  }
}

export default CurrentLocation
