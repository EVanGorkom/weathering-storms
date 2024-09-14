import { useState, useEffect } from 'react';
import { CurrentWeather } from './types';
import { mapCurrentWeather } from '../../utils/mapCurrentWeather';
import { SearchField } from '../../components/search_field/searchField';
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
      <div className="min-h-screen bg-lightblue-100 flex flex-col items-center">
        {/* Weather Display */}
        {locationAllowed && weather ? (
          <div className="current-weather-details bg-blue-600 text-white m-5 p-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">
              Current Weather in {weather.name}
            </h1>
            <div className="text-lg">{weather.description}</div>
            <div className="text-lg">
              Temperature:{' '}
              <span className="font-semibold">{weather.temperature}°F</span>
            </div>
            <div className="text-lg">
              Low: <span className="font-semibold">{weather.tempMin}°F</span>
            </div>
            <div className="text-lg">
              High: <span className="font-semibold">{weather.tempMax}°F</span>
            </div>
            <div className="text-lg">
              Humidity:{' '}
              <span className="font-semibold">{weather.humidity}%</span>
            </div>
            <div className="text-lg">
              Feels Like:{' '}
              <span className="font-semibold">{weather.feelsLike}°F</span>
            </div>
          </div>
        ) : (
          searchValue &&
          weather && (
            <div className="current-weather-details bg-blue-600 text-white m-12 p-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold mb-4">
                Current Weather in {weather.name}
              </h1>
              <div className="text-lg">{weather.description}</div>
              <div className="text-lg">
                Temperature:{' '}
                <span className="font-semibold">{weather.temperature}°F</span>
              </div>
              <div className="text-lg">
                Low: <span className="font-semibold">{weather.tempMin}°F</span>
              </div>
              <div className="text-lg">
                High: <span className="font-semibold">{weather.tempMax}°F</span>
              </div>
              <div className="text-lg">
                Humidity:{' '}
                <span className="font-semibold">{weather.humidity}%</span>
              </div>
              <div className="text-lg">
                Feels Like:{' '}
                <span className="font-semibold">{weather.feelsLike}°F</span>
              </div>
            </div>
          )
        )}

        {/* Search Field */}
        <div className="search-field m-5 border bg-slate-500 p-4 rounded-lg shadow-md">
          <SearchField
            inputValue={searchValue}
            inputOnChange={handleSearchChange}
            buttonOnClick={handleSearch}
          />
        </div>
      </div>
    </>
  );
}

export { CurrentWeatherDisplay };
