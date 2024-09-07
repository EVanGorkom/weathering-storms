// type CurrentWeather = {}
export interface CurrentWeatherDto {
  main: {
    temp: number;
    feels_like: number;
  };
}

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
}
