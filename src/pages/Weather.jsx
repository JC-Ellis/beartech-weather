import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress } from '@mui/material';

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const latitude = 55.05;
  const longitude = -1.45;

  useEffect(() => {
    setLoading(true);
    axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude,
        longitude,
        hourly: 'temperature_2m',
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
    <Container>
      <Typography variant="h4" gutterBottom>
        Weather Forecast
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <pre>{JSON.stringify(weather, null, 2)}</pre>
      )}
    </Container>
  );
}

export default Weather;