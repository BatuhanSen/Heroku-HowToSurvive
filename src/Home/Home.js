import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

import axios from 'axios';

//////
import { Button } from 'react-bootstrap';
//////

class Home extends React.Component {
  state = {
    zoom: 6.75,
    center: {
      lat: 38.720490, lng: 35.482597
    },
    earthquakes: [],
    fires: [],
    showE: false,
    showF: false
  }

  componentDidMount() {
    this.getEarthquakes();
    this.getFires();
  }

  getEarthquakes = () => {
    axios.get("https://how-to-survive.herokuapp.com/api/earthquake", { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }).then(response => {
      console.log("earthquakes,", response);
      this.setState({ ...this.state, earthquakes: response.data.data.earthquakeRecords })
    }).catch(err => {
      console.log("Error", err.response);
    })
  }

  getFires = () => {
    axios.get("https://how-to-survive.herokuapp.com/api/fire", { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }).then(response => {
      console.log("fires,", response);
      this.setState({ ...this.state, fires: response.data.data.fireRecords })
    }).catch(err => {
      console.log("Error", err.response);
    })
  }

  render() {
    let earthquakeMarkers = null;
    if (this.state.earthquakes != [] && this.state.showE) {
      earthquakeMarkers = this.state.earthquakes.map(earthquake => {
        if (earthquake.magnitude >= 3.5)
          return <Marker
            lat={earthquake.latitude}
            lng={earthquake.longitude}
            name="My Marker"
            color="blue"
          />
      })
    }
    let fireMarkers = null;
    if (this.state.fires != [] && this.state.showF) {
      fireMarkers = this.state.fires.map(fire => {
        return <Marker
          lat={fire.longitude}
          lng={fire.latitude}
          name="My Marker"
          color="red"
        />
      })
    }

    return (
      <div style={{  height: '70vh', width: '100%' }}>

      <div className="field buttons">
          <Button variant="primary" onClick={() => { this.setState({ ...this.state, showE: !this.state.showE }) }}>
            Earthquakes
            </Button>
        </div><div className="field buttons">
          <Button variant="danger" onClick={() => { this.setState({ ...this.state, showF: !this.state.showF }) }}>
            Fires
            </Button>
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          {earthquakeMarkers}
          {fireMarkers}
        </GoogleMapReact>

        <div className="field buttons">
          <Button variant="success" onClick={() => (window.location = "/newloc")}>
            UserPage
            </Button>
        </div>
        <div className="field buttons">
          <Button variant="secondary" onClick={() => (window.location = "/emergency")}>
            EmergencyPage
            </Button>
        </div>
        <div className="field buttons">
          <Button variant="warning" onClick={() => (window.location = "/contact")}>
            ContactPage
            </Button>
        </div>

        <div className="field buttons">
          <Button variant="info" onClick={() => (window.location = "/blogpage")}>
            BlogPage
            </Button>
        </div>

        <div className="field buttons">
          <Button variant="dark" onClick={() => (window.location = "/login")}>
            Logout
            </Button>
        </div>


      </div>
    );
  }

}

export default Home;