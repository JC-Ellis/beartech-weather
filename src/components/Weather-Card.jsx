import { useState } from "react";
import { Card, CardContent, Typography, Tooltip } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import CloudIcon from "@mui/icons-material/Cloud";
import CloudRainIcon from "@mui/icons-material/Grain";
import getWeatherImage from "../utils/getWeatherImage";
import "./WeatherCard.css";
import WeatherSummaryCard from "./WeatherSummaryCard";

function WeatherCard({ weather }) {
  if (!weather || !weather.hourly) {
    return <Typography>No weather data available.</Typography>;
  }

  const {
    time,
    temperature_2m,
    precipitation_probability,
    precipitation,
    cloud_cover,
  } = weather.hourly;

  const [selectedDate, setSelectedDate] = useState(null);
  const now = new Date();

  const timeDates = time.map((t) => new Date(t));

  let startIndex;
  let hoursToShow;

  if (selectedDate) {
    const targetDate = new Date(selectedDate);
    startIndex = timeDates.findIndex(
      (d) =>
        d.getFullYear() === targetDate.getFullYear() &&
        d.getMonth() === targetDate.getMonth() &&
        d.getDate() === targetDate.getDate() &&
        d.getHours() === 0
    );
    hoursToShow = time.slice(startIndex, startIndex + 24);
  } else {
    startIndex = timeDates.findIndex((d) => d > now);
    hoursToShow = time.slice(startIndex, startIndex + 24);
  }

  if (startIndex === -1) {
    return <Typography>No future weather data available.</Typography>;
  }

  const temps = temperature_2m.slice(startIndex, startIndex + 8);
  const precs = precipitation.slice(startIndex, startIndex + 8);
  const precProbs = precipitation_probability.slice(startIndex, startIndex + 8);
  const clouds = cloud_cover.slice(startIndex, startIndex + 8);

  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);
  const maxPrecipProb = Math.max(...precProbs);
  const totalPrecip = precs.reduce((a, b) => a + b, 0);
  const avgCloud = clouds.reduce((a, b) => a + b, 0) / clouds.length;
  const avgRain = totalPrecip / precs.length;

  const summaryImg = `/weather-icons/${getWeatherImage(avgCloud, avgRain)}`;

  let forecastMessage = "It's going to be lovely!";
  if (maxPrecipProb > 70) {
    forecastMessage = "You are going to get wet.";
  } else if (maxPrecipProb > 40) {
    forecastMessage = "There’s a chance of rain, stay prepared!";
  } else if (avgCloud > 75) {
    forecastMessage = "It will be mostly cloudy.";
  }

  return (
    <>
      <div className="carousel-wrapper">
        <WeatherSummaryCard
          summaryImg={summaryImg}
          forecastMessage={forecastMessage}
          maxTemp={maxTemp}
          minTemp={minTemp}
          maxPrecipProb={maxPrecipProb}
          totalPrecip={totalPrecip}
          avgCloud={avgCloud}
        />

        <div className="carousel-container">
          {hoursToShow.map((t, i) => {
            const dataIndex = startIndex + i;
            if (!time[dataIndex]) return null;

            const cloud = cloud_cover[dataIndex];
            const rain = precipitation[dataIndex];
            const imgSrc = `/weather-icons/${getWeatherImage(cloud, rain)}`;

            return (
              <Card className="carousel-card" key={t} elevation={3}>
                <CardContent>
                  <img
                    src={imgSrc}
                    alt="weather icon"
                    style={{ width: "80px", height: "80px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    {new Date(t).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                  <Tooltip title="Temperature">
                    <Typography variant="body2">
                      <ThermostatIcon fontSize="medium" />{" "}
                      {temperature_2m[dataIndex]}°C
                    </Typography>
                  </Tooltip>
                  <Tooltip title="Cloud cover">
                    <Typography variant="body2">
                      <CloudIcon fontSize="medium" /> {cloud}%
                    </Typography>
                  </Tooltip>
                  <Tooltip title="Precipitation">
                    <Typography variant="body2">
                      <OpacityIcon fontSize="medium" /> {rain} mm
                    </Typography>
                  </Tooltip>
                  <Tooltip title="Precipitation probability">
                    <Typography variant="body2">
                      <CloudRainIcon fontSize="medium" />{" "}
                      {precipitation_probability[dataIndex]}%
                    </Typography>
                  </Tooltip>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div
          className="navigation-bar"
          style={{
            marginTop: "1rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
          }}
        >
          {[...Array(7)].map((_, i) => {
            const date = new Date();
            date.setDate(now.getDate() + i);
            const dateStr = date.toISOString().split("T")[0];
            const label = date.toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            });
            return (
              <button
                className="navigation-button"
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  backgroundColor:
                    selectedDate === dateStr ? "#3399FFDE" : "grey",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default WeatherCard;
