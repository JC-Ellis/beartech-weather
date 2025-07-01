import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, CircularProgress } from "@mui/material";
import WeatherCard from "../components/Weather-Card";
import { reverseGeocode } from "../utils/geocoding";

function Weather() {
  const [searchParams] = useSearchParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("");

  const latitude = parseFloat(searchParams.get("lat")) || 55.05;
  const longitude = parseFloat(searchParams.get("lon")) || -1.45;

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.open-meteo.com/v1/forecast", {
        params: {
          latitude,
          longitude,
          hourly:
            "temperature_2m,precipitation_probability,precipitation,cloud_cover",
          timezone: "auto",
        },
      })
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
      })
      .finally(() => {
        setLoading(false);
      });

    reverseGeocode(latitude, longitude).then((name) => setLocationName(name));
  }, [latitude, longitude]);

  return (
    <Container className="container">
      {loading ? (
        <Typography variant="h5" gutterBottom>
          Just finding where you're going...
        </Typography>
      ) : (
        <Typography variant="h5" gutterBottom>
          You're going to{" "}
          {locationName || `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`}
        </Typography>
      )}
      {loading ? <CircularProgress /> : <WeatherCard weather={weather} />}
    </Container>
  );
}

export default Weather;
