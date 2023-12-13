import React, { Component } from 'react';
import LocationForm from './LocationForm';
import WeatherCard from './WeatherCard';
import './WeatherApp.css';

class WeatherApp extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
    };
  }

  addLocation = (location) => {
    this.setState((prevState) => ({
      locations: [...prevState.locations, location],
    }));
  };

  removeLocation = (index) => {
    this.setState((prevState) => ({
      locations: prevState.locations.filter((_, i) => i !== index),
    }));
  };

  render() {
    const { locations } = this.state;

    return (
      <div className="weather-app">
        <h1>Weather App</h1>
        <LocationForm onAddLocation={this.addLocation} />
        <div className="weather-cards">
          {locations.map((location, index) => (
            <WeatherCard
              key={index}
              location={location}
              onRemove={() => this.removeLocation(index)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default WeatherApp;
