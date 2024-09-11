import {
  CurrentWeather,
  CurrentWeatherDto,
} from '../pages/CurrentWeather/types';

export function mapCurrentWeather(data: CurrentWeatherDto): CurrentWeather {
  return {
    name: data.name,
    main: data.weather[0].main,
    description: data.weather[0].description,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    humidity: data.main.humidity
  };
}
