import React, { Component } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import './WeatherCard.css';

class WeatherCard extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      forecastData: null,
    };
  }

  componentDidMount() {
    this.fetchWeatherData();
    this.fetchForecastData();
  }

  fetchWeatherData = async () => {
    const { location } = this.props;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=09d75966cd9607042f423dc9c0e6f26d`
      );
      this.setState({ weatherData: response.data });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  fetchForecastData = async () => {
    const { location } = this.props;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=09d75966cd9607042f423dc9c0e6f26d`
      );
      this.setState({ forecastData: response.data.list });
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

getWeatherIcon = (conditionCode) => {
const iconSize = { fontSize: '4em' }; 

const iconMap = {
  '01d': <WiDaySunny style={iconSize} />,
  '01n': <WiDaySunny style={iconSize} />,
  '02d': <WiCloud style={iconSize} />,
  '02n': <WiCloud style={iconSize} />,
  '03d': <WiCloud style={iconSize} />,
  '03n': <WiCloud style={iconSize} />,
  '04d': <WiCloud style={iconSize} />,
  '04n': <WiCloud style={iconSize} />,
  '09d': <WiRain style={iconSize} />,
  '09n': <WiRain style={iconSize} />,
  '10d': <WiRain style={iconSize} />,
  '10n': <WiRain style={iconSize} />,
  '11d': <WiThunderstorm style={iconSize} />,
  '11n': <WiThunderstorm style={iconSize} />,
  '13d': <WiSnow style={iconSize} />,
  '13n': <WiSnow style={iconSize} />,
  '50d': <WiCloud style={iconSize} />,
  '50n': <WiCloud style={iconSize} />,
  };

  return iconMap[conditionCode] || <WiCloud style={iconSize} />;
};
  

render() {
  const { location, onRemove } = this.props;
  const { weatherData, forecastData } = this.state;

return (
  <div className="weather-card">
  <h2>{location}</h2>
  {weatherData && (
  <div>
    {this.getWeatherIcon(weatherData.weather[0].icon)}
    <p>Temperature: {this.kelvinToCelsius(weatherData.main.temp).toFixed(2)} °C</p>
    <p>Humidity: {weatherData.main.humidity}%</p>
    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
    <p>Visibility: {weatherData.visibility} meters</p>
    <p>Pressure: {weatherData.main.pressure} hPa</p>
  </div>
  )}
  {forecastData && (
  <div>
    <h3>Full Day Forecast</h3>
    {forecastData.slice(0, 8).map((forecast, index) => (
    <div key={index}>
      <p>
        Date: {new Date(forecast.dt * 1000).toLocaleDateString()}{' '}
        Time: {new Date(forecast.dt * 1000).toLocaleTimeString()}
      </p>
      <p>Temperature: {this.kelvinToCelsius(forecast.main.temp).toFixed(2)} °C</p>
    </div>
    ))}
  </div>
  )}
  {weatherData && <button onClick={onRemove}>Remove Location</button>}
  </div>
);
}
}

export default WeatherCard;
