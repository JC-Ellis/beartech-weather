import { Button, Container, TextField, Typography } from "@mui/material";
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

function Home() {
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
      <Typography variant="h6" gutterBottom>
        Choose a location or type an address
      </Typography>

      <TextField
        label="Address or Postcode"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        margin="normal"
        onKeyDown={handleKeyDown}
      />
      <Button variant="outlined" onClick={handleGeocode}>
        Find address
      </Button>

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
        Is it wet?
      </Button>
    </Container>
  );
}

export default Home;
