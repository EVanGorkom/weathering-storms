export interface CurrentWeatherDto {
  weather: [
    {
      main: string;
      description: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
}

export interface CurrentWeather {
  main: string;
  description: string;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
}
