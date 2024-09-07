import { useState, useEffect } from 'react';
import { CurrentWeather } from './types';
import { mapCurrentWeather } from '../../utils/mapCurrentWeather';
import { SearchField } from '../../components/search_field/searchFind';

function CurrentWeatherDisplay() {
  const initialWeatherState: CurrentWeather = {
    temperature: 0,
    feelsLike: 0,
  };
  const [weather, setWeather] = useState<CurrentWeather>(initialWeatherState);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=austin&units=imperial&appid=${
        import.meta.env.VITE_API_KEY
      }`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const currentWeather = mapCurrentWeather(data);
        setWeather(currentWeather);
      })
      .catch((error) => console.log(error));
  }, []);

  const fetchWeatherBySearch = (city: string) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${
        import.meta.env.VITE_API_KEY
      }`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const currentWeather = mapCurrentWeather(data);
        setWeather(currentWeather);
      })
      .catch((error) => console.log(error));
  };

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
