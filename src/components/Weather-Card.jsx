import { Card, CardContent, Typography, Tooltip } from "@mui/material";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import CloudIcon from '@mui/icons-material/Cloud';
import CloudRainIcon from '@mui/icons-material/Grain';

function WeatherCard({ weather }) {
  if (!weather || !weather.hourly)
    return <Typography>No weather data available.</Typography>;

  const {
    time,
    temperature_2m,
    precipitation_probability,
    precipitation,
    cloud_cover,
  } = weather.hourly;

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        {time.slice(0, 12).map((t, i) => (
          <Card className="carousel-card" key={t} elevation={3}>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                {new Date(t).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
              <Tooltip title="Temperature">
                <Typography variant="body2">
                 <ThermostatIcon fontSize="medium" />{temperature_2m[i]}°C
                </Typography>
              </Tooltip>

              <Tooltip title="Cloud cover">
                <Typography variant="body2">
                   <CloudIcon fontSize="medium" /> {cloud_cover[i]}%</Typography>
              </Tooltip>

              <Tooltip title="Precipitation">
                <Typography variant="body2">
                  <OpacityIcon fontSize="medium" /> {precipitation[i]} mm
                </Typography>
              </Tooltip>

              <Tooltip title="Precipitation probability">
                <Typography variant="body2">
                 <CloudRainIcon fontSize="medium" /> {precipitation_probability[i]}%
                </Typography>
              </Tooltip>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default WeatherCard;
