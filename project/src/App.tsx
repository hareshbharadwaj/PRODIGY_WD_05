import React, { useState, useEffect } from 'react';
import { CloudSun } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import LocationSearch from './components/LocationSearch';
import ForecastCard from './components/ForecastCard';
import ErrorMessage from './components/ErrorMessage';
import { getCurrentWeather, getCurrentWeatherByCoords, getForecast, getForecastByCoords, WeatherData, ForecastDay } from './utils/weatherApi';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const convertTemperature = (temp: number, fromUnit: 'C' | 'F', toUnit: 'C' | 'F'): number => {
    if (fromUnit === toUnit) return temp;
    
    if (fromUnit === 'C' && toUnit === 'F') {
      return (temp * 9/5) + 32;
    } else {
      return (temp - 32) * 5/9;
    }
  };

  const convertWeatherData = (weatherData: WeatherData, newUnit: 'C' | 'F'): WeatherData => {
    return {
      ...weatherData,
      temperature: convertTemperature(weatherData.temperature, unit, newUnit),
      feelsLike: convertTemperature(weatherData.feelsLike, unit, newUnit),
    };
  };

  const convertForecastData = (forecastData: ForecastDay[], newUnit: 'C' | 'F'): ForecastDay[] => {
    return forecastData.map(day => ({
      ...day,
      temperature: {
        min: convertTemperature(day.temperature.min, unit, newUnit),
        max: convertTemperature(day.temperature.max, unit, newUnit),
      },
    }));
  };

  const handleUnitChange = () => {
    const newUnit = unit === 'C' ? 'F' : 'C';
    
    if (weather) {
      setWeather(convertWeatherData(weather, newUnit));
    }
    
    if (forecast.length > 0) {
      setForecast(convertForecastData(forecast, newUnit));
    }
    
    setUnit(newUnit);
  };

  const handleSearch = async (location: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(location, unit),
        getForecast(location, unit)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setWeather(null);
      setForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const [weatherData, forecastData] = await Promise.all([
            getCurrentWeatherByCoords(latitude, longitude, unit),
            getForecastByCoords(latitude, longitude, unit)
          ]);
          
          setWeather(weatherData);
          setForecast(forecastData);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unexpected error occurred');
          setWeather(null);
          setForecast([]);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        setIsLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Location access denied. Please enable location services and try again.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setError('Location request timed out.');
            break;
          default:
            setError('An unknown error occurred while retrieving location.');
            break;
        }
      }
    );
  };

  // Load default weather on app start (London as example)
  useEffect(() => {
    handleSearch('London');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white bg-opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white bg-opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white bg-opacity-5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4 group">
            <CloudSun className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
            <h1 className="text-4xl font-bold text-white group-hover:text-yellow-200 transition-colors duration-300">WeatherApp</h1>
          </div>
          <p className="text-white text-lg opacity-90 hover:opacity-100 transition-opacity duration-300">Beautiful weather forecasts at your fingertips</p>
        </div>

        {/* Search Component */}
        <LocationSearch 
          onSearch={handleSearch}
          onGetCurrentLocation={handleGetCurrentLocation}
          isLoading={isLoading}
        />

        {/* Error Message */}
        {error && (
          <ErrorMessage 
            message={error} 
            onDismiss={() => setError(null)}
          />
        )}

        {/* Weather Display */}
        {weather && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="lg:col-span-2 transform hover:scale-[1.02] transition-transform duration-300">
              <WeatherCard 
                weather={weather} 
                unit={unit}
                onUnitChange={handleUnitChange}
              />
            </div>
            
            {forecast.length > 0 && (
              <div className="lg:col-span-1 transform hover:scale-[1.02] transition-transform duration-300">
                <ForecastCard forecast={forecast} unit={unit} />
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && !weather && (
          <div className="flex items-center justify-center py-16">
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                <p className="text-white text-lg">Loading weather data...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;