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
      <img
        src={summaryImg}
        alt="summary weather icon"
        style={{ width: "80px", height: "80px", margin: "0 1rem" }}
      />
      <CardContent className="summary-content">
        <Typography variant="h6" gutterBottom>
          {forecastMessage}
        </Typography>
        <div className="summary-stats">
          <div className="summary-stat">
            <Typography variant="body1">
              <ThermostatIcon fontSize="medium" />
              High: {maxTemp}°C
            </Typography>
          </div>
          <div className="summary-stat">
            <Typography variant="body1">
              <ThermostatIcon fontSize="medium" />
              Low: {minTemp}°C
            </Typography>
          </div>
          <div className="summary-stat">
            <Typography variant="body1">
              <CloudRainIcon fontSize="medium" />
              Rain chance: {maxPrecipProb}%
            </Typography>
          </div>
          <div className="summary-stat">
            <Typography variant="body1">
              <OpacityIcon fontSize="medium" />
              Rain: {totalPrecip.toFixed(1)} mm
            </Typography>
          </div>
          <div className="summary-stat">
            <Typography variant="body1">
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
