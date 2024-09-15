import { useEffect, useState } from 'react';
import { CurrentWeatherDisplay } from './pages/CurrentWeather';

function App() {
  const [isDayTime, setIsDayTime] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDayTime(hour >= 7 && hour < 19);
  }, []);

  return (
    <>
      <div className={`min-h-screen ${
        isDayTime
          ? 'bg-gradient-to-b from-blue-400 via-blue-500 to-blue-900'
          : 'bg-gradient-to-b from-purple-700 to-indigo-950'
        }`}>
        <h1 className="content-center text-center p-4 text-6xl text-white font-serif">
          Weathering Storms
        </h1>
        <body>
          <CurrentWeatherDisplay />
        </body>
      </div>
    </>
  );
}

export default App;
