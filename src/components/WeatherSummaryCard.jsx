import { Card, CardContent, Typography } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import CloudIcon from "@mui/icons-material/Cloud";
import CloudRainIcon from "@mui/icons-material/Grain";

function WeatherSummaryCard({
  summaryImg,
  forecastMessage,
  maxTemp,
  minTemp,
  maxPrecipProb,
  totalPrecip,
  avgCloud,
}) {
  return (
    <Card className="summary-card" elevation={4}>
      <CardContent className="summary-content">
        <Typography variant="h6" gutterBottom >
          {forecastMessage}
        </Typography>
      <img
        src={summaryImg}
        alt="summary weather icon"
        style={{ width: "120px", height: "120px", margin: "0 1rem" }}
      />
        <div className="summary-stats">
          <div className="summary-stat">
            <Typography variant="h6">
              <ThermostatIcon fontSize="medium" />
              High: {maxTemp}°C
            </Typography>
          </div>
          <div className="summary-stat">
            <Typography variant="h6">
              <ThermostatIcon fontSize="medium" />
              Low: {minTemp}°C
            </Typography>
          </div>
          <div className="summary-stat">
            <Typography variant="h6">
              <CloudRainIcon fontSize="medium" />
              Rain chance: {maxPrecipProb}%
            </Typography>
          </div>
          <div className="summary-stat">
            <Typography variant="h6">
              <OpacityIcon fontSize="medium" />
              Rain: {totalPrecip.toFixed(1)} mm
            </Typography>
          </div>
          <div className="summary-stat">
            <Typography variant="h6">
              <CloudIcon fontSize="medium" /> Cloud cover: {avgCloud.toFixed(0)}
              %
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default WeatherSummaryCard;
