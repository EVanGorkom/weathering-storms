import {
  CurrentWeather,
  CurrentWeatherDto,
} from '../pages/CurrentWeather/types';

export function mapCurrentWeather(data: CurrentWeatherDto): CurrentWeather {
  return {
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
  };
}
