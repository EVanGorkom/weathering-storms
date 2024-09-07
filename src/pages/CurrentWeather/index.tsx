import { useState } from 'react';
import { CurrentWeather } from './types';
import { mapCurrentWeather } from '../../utils/mapCurrentWeather';
import { SearchField } from '../../components/search_field/searchFind';
import { Loading } from '../../components/loading/loading'


function CurrentWeatherDisplay() {
  const initialWeatherState: CurrentWeather = {
    temperature: 0,
    feelsLike: 0,
  };
  const [weather, setWeather] = useState<CurrentWeather>(initialWeatherState);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchWeatherBySearch = (city: string, units: string = "imperial") => {
    setIsLoading(true)
    fetch(
      `${BASE_URL}?q=${city}&units=${units}&appid=${API_KEY}`,
      {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((data) => {
        const currentWeather = mapCurrentWeather(data);
        setWeather(currentWeather);
        setIsLoading(false)
      })
      .catch((error) => console.log(error));
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleSearch = () => {
    fetchWeatherBySearch(searchValue);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  };


  return (
    <>
      <SearchField inputValue={searchValue} inputOnChange={handleSearchChange} buttonOnClick={handleSearch}/>
      <div>Current Temperature: {weather.temperature}</div>
      <div>Feels Like: {weather.feelsLike}</div>
    </>
  );
}

export { CurrentWeatherDisplay };
