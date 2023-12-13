import React, { Component } from 'react';

class LocationForm extends Component {
constructor() {
  super();
  this.state = {
    locationInput: '',
  };
}

handleInputChange = (event) => {
  this.setState({ locationInput: event.target.value });
};

handleFormSubmit = (event) => {
  event.preventDefault();
  const { locationInput } = this.state;
  this.props.onAddLocation(locationInput);
  this.setState({ locationInput: '' });
};

render() {
  
const { locations } = this.props;
if (!locations || locations.length === 0) {
  return (
  <form onSubmit={this.handleFormSubmit} className="location-form">
    <input
      type="text"
      value={this.state.locationInput}
      onChange={this.handleInputChange}
      placeholder="Enter city name"
    />
    <button type="submit">Search</button>
  </form>
  );
  }

  return null;
  }
}

export default LocationForm;
