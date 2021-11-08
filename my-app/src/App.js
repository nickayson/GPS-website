import React from 'react';
import './App.css';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.getUserAddress = this.getUserAddress.bind(this);
  }

  getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
    } else {
     alert("Geolocation is not supported by this browser.");
    }
  }

  getCoordinates(position){
    console.log(position);
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    this.getUserAddress();
  }

  getUserAddress(){
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=false&key=AIzaSyAJT-mLUB1QThDTKLh9zgtlIbcI7r0ljfM`)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => this.setState({
      userAddress:data.results[0].formatted_address
    }))
    .catch(error => alert(error))
  }

  handleLocationError(error){
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
    }
  }

  render(){
    return(
      <div className = "App">
        <h2>
          Find yourself with Google API
          <br></br> 
          Created With React
        </h2>
        <img src = "logo192.png" width="50"></img>
        <br></br>
        <button onClick = {this.getLocation}> Get coordiantes</button>
        <h4>HTML5 Coordiantes</h4>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p>
        <h4>Google Maps Reverse Geocoding</h4>
        <p>Address: {this.state.userAddress}</p>
        {
          this.state.latitude && this.state.longitude ?
          <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=1000x1000&sensor=false&markers=color:red%7C${this.state.latitude},${this.state.longitude}&key=AIzaSyAJT-mLUB1QThDTKLh9zgtlIbcI7r0ljfM`} alt=''/>
          :
          null
        }
        </div>
    )
  }
}

export default App;
