import { useState } from "react";
import { Card, CardContent, Typography, Tooltip } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import CloudIcon from "@mui/icons-material/Cloud";
import CloudRainIcon from "@mui/icons-material/Grain";
import getWeatherImage from "../utils/getWeatherImage";
import "./WeatherCard.css";

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

  return (
    <>
      <div className="carousel-wrapper">
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

        <div className="navigation-bar">
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
                  backgroundColor:
                    selectedDate === dateStr ? "#3399FFDE" : "grey",
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
