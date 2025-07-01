import { Button, Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";

function LocationPicker({ onChange }) {
  useMapEvents({
    click(e) {
      onChange(e.latlng);
    },
  });
  return null;
}

function MapUpdater({ coords }) {
  const map = useMap();

  map.setView([coords.lat, coords.lng], map.getZoom());

  return null;
}

function Home({ darkMode }) {
  const navigate = useNavigate();
  const [coords, setCoords] = useState({ lat: 55.05, lng: -1.45 });
  const [address, setAddress] = useState("");

  const handleGeocode = async () => {
    try {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: address,
            format: "json",
            limit: 1,
          },
        }
      );
      if (res.data.length > 0) {
        const { lat, lon } = res.data[0];
        setCoords({ lat: parseFloat(lat), lng: parseFloat(lon) });
      } else {
        alert("Address not found");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

  const handleNavigate = () => {
    navigate(`/weather?lat=${coords.lat}&lon=${coords.lng}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGeocode();
    }
  };

  return (
    <Container className="container">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {darkMode ? (
          <TextField
            label="Where are you going? (Enter address or postcode)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
            onKeyDown={handleKeyDown}
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "grey",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "blue",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "blue",
              },
            }}
            style={{ whiteSpace: "nowrap", height: "60px" }}
          />
        ) : (
          <TextField
            label="Where are you going? (Enter address or postcode)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
            onKeyDown={handleKeyDown}
            sx={{
              "& .MuiInputBase-input": {
                color: "black",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "blue",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "blue",
                },
              },
              "& .MuiInputLabel-root": {
                color: "black",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "blue",
              },
            }}
            style={{ whiteSpace: "nowrap", height: "60px" }}
          />
        )}
        <Button
          onClick={handleGeocode}
          variant="contained"
          style={{ whiteSpace: "nowrap", height: "55px" }}
        >
          Find address
        </Button>
      </div>

      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={13}
        className="map-container"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[coords.lat, coords.lng]} />
        <LocationPicker onChange={(latlng) => setCoords(latlng)} />
        <MapUpdater coords={coords} />
      </MapContainer>
      <Button
        variant="contained"
        onClick={handleNavigate}
        style={{ marginTop: "1rem" }}
      >
        Are you going to get wet?
      </Button>
    </Container>
  );
}

export default Home;
