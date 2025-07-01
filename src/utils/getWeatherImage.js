function getWeatherImage(cloudCover, precipitation) {
  if (precipitation > 0) {
    if (cloudCover > 75) return "rain-heavy-clouds.png";
    if (cloudCover > 30) return "rain-some-clouds.png";
    return "rain-clear.png";
  } else {
    if (cloudCover > 75) return "cloudy.png";
    if (cloudCover > 30) return "partly-cloudy.png";
    return "clear.png";
  }
}

export default getWeatherImage;