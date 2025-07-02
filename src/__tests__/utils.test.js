import { describe, it, expect } from 'vitest';
import getWeatherImage from '../utils/getWeatherImage';

describe('getWeatherImage', () => {
  it('returns rain-heavy-clouds.png for precipitation > 0 and cloudCover > 75', () => {
    expect(getWeatherImage(80, 5)).toBe('rain-heavy-clouds.png');
  });

  it('returns clear.png for no precipitation and low cloud cover', () => {
    expect(getWeatherImage(10, 0)).toBe('clear.png');
  });

  it('returns partly-cloudy.png for no precipitation and moderate cloud cover', () => {
    expect(getWeatherImage(50, 0)).toBe('partly-cloudy.png');
  });

  it('returns rain-clear.png for rain and low cloud cover', () => {
    expect(getWeatherImage(10, 2)).toBe('rain-clear.png');
  });
});