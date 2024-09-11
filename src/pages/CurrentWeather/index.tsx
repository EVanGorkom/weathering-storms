import { useState, useEffect } from 'react';
import { CurrentWeather } from './types';
import { mapCurrentWeather } from '../../utils/mapCurrentWeather';
import { SearchField } from '../../components/search_field/searchFind';
import { Loading } from '../../components/loading/loading'


function CurrentWeatherDisplay() {
  const initialWeatherState: CurrentWeather = {
    name: "",
    main: "",
    description: "",
    temperature: 0,
    feelsLike: 0,
    tempMin: 0,
    tempMax: 0,
    humidity: 0,
  };
  const [weather, setWeather] = useState<CurrentWeather>(initialWeatherState);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const CURRENT_WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
  // const WEEKLY_WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast/daily";
  const API_KEY = import.meta.env.VITE_API_KEY;


  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationAllowed(true)
          fetchWeatherByDeviceLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error acquiring device location: ", error);
          setLocationAllowed(false);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.")
      setLocationAllowed(false);
    }
  };

  const fetchWeatherByDeviceLocation = (lat: number, lon: number, units: string = "imperial") => {
    setIsLoading(true);
    fetch(
      `${CURRENT_WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`,
      {
        method: "GET"
      })
      .then((response) => response.json())
      .then((data) => {
        const currentWeather = mapCurrentWeather(data);
        console.log(weather);
        setWeather(currentWeather);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
      setIsLoading(false);
  };

  const fetchWeatherBySearch = (city: string, units: string = "imperial") => {
    setIsLoading(true);
    fetch(
      `${CURRENT_WEATHER_BASE_URL}?q=${city}&units=${units}&appid=${API_KEY}`,
      {
        method: "GET",
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const currentWeather = mapCurrentWeather(data);
        console.log(weather);
        setWeather(currentWeather);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
      setIsLoading(false);
  };

  const fetchForecastBySearch = (city: string, units: string = "imperial") => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${API_KEY}`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
    setIsLoading(false);
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  if (isLoading) {
    return <Loading />;
  };

  const handleSearch = () => {
    fetchWeatherBySearch(searchValue);
    fetchForecastBySearch(searchValue);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  };


  return (
    <>
      <SearchField
        inputValue={searchValue}
        inputOnChange={handleSearchChange}
        buttonOnClick={handleSearch}
      />

      {locationAllowed && weather ? (
        <div className="current-weather-details">
          <div>Current Weather in {weather.name}</div>
          <div>{weather.description}</div>
          <div>Temperature: {weather.temperature}</div>
          <div>Low: {weather.tempMin}</div>
          <div>High: {weather.tempMax}</div>
          <div>Humidity: {weather.humidity}</div>
          <div>Feels Like: {weather.feelsLike}</div>
        </div>
      ) : (
        searchValue &&
        weather && (
          <div className="current-weather-details">
            <div>Current Weather in {weather.name}</div>
            <div>{weather.description}</div>
            <div>Current Temperature: {weather.temperature}</div>
            <div>Low: {weather.tempMin}</div>
            <div>High: {weather.tempMax}</div>
            <div>Humidity: {weather.humidity}</div>
            <div>Feels Like: {weather.feelsLike}</div>
          </div>
        )
      )}
    </>
  );
}

export { CurrentWeatherDisplay };
