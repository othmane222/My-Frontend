import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const WeatherPage = () => {
  const { city } = useParams(); // Get the city parameter from the URL
  const [weatherData, setWeatherData] = useState(null); // Weather data from API
  const [error, setError] = useState(""); // Error message
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) {
        setError("City not specified.");
        return;
      }

      setLoading(true);
      setError("");
      setWeatherData(null);

      try {
        const response = await axios.get(`http://localhost:8083/api/weather/${city}`);
        setWeatherData(response.data); // Set the JSON response as state
      } catch (err) {
        setError("Error fetching weather data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]); // Run fetchWeather when city changes

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Weather App</h1>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Weather Data for {city}</h2>
          <p><strong>Latitude:</strong> {weatherData.latitude}</p>
          <p><strong>Longitude:</strong> {weatherData.longitude}</p>
          <p><strong>Temperature:</strong> {weatherData.current_weather.temperature} °C</p>
          <p><strong>Wind Speed:</strong> {weatherData.current_weather.windspeed} km/h</p>
          <p><strong>Wind Direction:</strong> {weatherData.current_weather.winddirection}°</p>
          <p><strong>Is Day:</strong> {weatherData.current_weather.is_day ? "Yes" : "No"}</p>
          <p><strong>Weather Code:</strong> {weatherData.current_weather.weathercode}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
