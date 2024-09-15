import { CurrentWeatherDisplay } from './pages/CurrentWeather';

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-900">
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
