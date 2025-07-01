import axios from 'axios';

export async function reverseGeocode(lat, lon) {
  try {
    const res = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat,
        lon,
        format: 'json'
      },
      headers: {
        'Accept-Language': 'en'
      }
    });

    if (res.data && res.data.address) {
      const { road, suburb, city, town, village } = res.data.address;
      const placeParts = [road, suburb, city || town || village].filter(Boolean);
      return placeParts.join(', ');
    } else {
      return "Unknown location";
    }
  } catch (err) {
    console.error("Reverse geocoding error:", err);
    return "Unknown location";
  }
}
