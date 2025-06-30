import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress } from '@mui/material';
import WeatherCard from '../components/Weather-Card';

function Weather() {
  const [searchParams] = useSearchParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const latitude = parseFloat(searchParams.get('lat')) || 55.05;
  const longitude = parseFloat(searchParams.get('lon')) || -1.45;

  useEffect(() => {
    setLoading(true);
    axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude,
        longitude,
        hourly: 'temperature_2m,precipitation_probability,precipitation,cloud_cover',
        timezone: 'auto'
      }
    })
    .then((response) => {
      setWeather(response.data);
    })
    .catch((error) => {
      console.error('Error fetching weather:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [latitude, longitude]);

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        Weather Forecast
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Location: {latitude.toFixed(2)}, {longitude.toFixed(2)}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <WeatherCard weather={weather} />
      )}
    </Container>
  );
}

export default Weather;