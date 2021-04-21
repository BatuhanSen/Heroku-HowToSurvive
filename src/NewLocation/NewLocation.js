import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

//////
import { Button } from 'react-bootstrap';
//////

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
  } from "@react-google-maps/api";
  import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import { formatRelative } from "date-fns";
  
  import "@reach/combobox/styles.css";
  import mapStyles from "./mapStyles";
  
  const libraries = ["places"];
  const mapContainerStyle = {
    height: "60vh",
    width: "90vw",
  };
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };
  const center = {
    lat: 39.933365,
    lng: 32.859741,
  };
  

  function NewLocation(props) {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries,
    });
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [state, setState] = React.useState(null);
  
    const onMapClick = React.useCallback((e) => {
      console.log(e.latLng.lat(), e.latLng.lng());
      setState(e.latLng);
      setMarkers((current) => [
        ...current,
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          time: new Date(),
        },
      ]);
    }, []);


  
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
      mapRef.current = map;
    }, []);
  
    const panTo = React.useCallback(({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(14);
    }, []);
  
  console.log(markers);
    
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    /*const handleCity = (event) => {
      this.setState({
        ...this.state,
        city: event.target.value,
      });
    };*/

 /* const handleNewLoc = (e) => {
      e.preventDefault();
      this.props.newloc(this.user,this.state.city, this.state.latitude, this.state.longitude);
    };*/
    const handleSubmit = (e) => {
      alert("Location is added.");
    };
  
    return (
      <div>
        <h1>
          Choose Your Location From Map{" "}
          
        </h1>
  
        <Locate panTo={panTo} />
        <Search panTo={panTo} />
  
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => (
            <Marker
              key={`${marker.lat}-${marker.lng}`}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
              }}
              icon={{
                url: `../logo.svg`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))}
  
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>
                  <span role="img" aria-label="survive">
                    
                  </span>{" "}
                  Selected Location
                </h2>
                <p>Spotted {formatRelative(selected.time, new Date())}</p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
        <br></br>
        <br></br>


          <div className="field">
              <label>Location Name</label><br ></br>
              <input
                type="text"
                placeholder="Ornegin EV"
               // onChange={this.handleCity}
                required
              />
            </div>

            <div className="field buttons"/*onSubmit={this.handleNewLoc}*/>
              <Button variant="success" type="submit" onClick={() => (props.newloc(props.user, "ev", state.lat(), state.lng()))}> Save Location </Button>
              <Button variant="dark" onClick={() => (window.location = "/")}> Back </Button>
            </div>
      </div>
    );
  }
  
  function Locate({ panTo }) {
    return (
      ///// Degisti baslangic
      <Button
        className="locate"
        variant="primary"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        mevcut konum
      </Button>
       ///// Degisti bitis
    );
  }
  
  function Search({ panTo }) {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 43.6532, lng: () => -79.3832 },
        radius: 100 * 1000,
      },
    });
  
    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest
  
    const handleInput = (e) => {
      setValue(e.target.value);
    };
  
    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
  
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        panTo({ lat, lng });
      } catch (error) {
        console.log("😱 Error: ", error);
      }
    };
  
    return (
      <div className="search">
       
      </div>
    );
  }

  const mapDispatchToState = (state) => {
    return {
      user: state.auth.user,
      error: state.auth.error,
      location: state.location.location,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      newloc: (user, city, latitude, longitude) => dispatch(actions.newloc(user, city, latitude, longitude)),
      
    };
  };
  
  export default connect(mapDispatchToState, mapDispatchToProps)(NewLocation);
  