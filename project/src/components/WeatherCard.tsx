import React from 'react';
import { Cloud, Sun, CloudRain, Snowflake, Wind, Droplets, Eye, Thermometer } from 'lucide-react';

interface WeatherData {
  name: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  icon: string;
}

interface WeatherCardProps {
  weather: WeatherData;
  unit: 'C' | 'F';
  onUnitChange: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, unit, onUnitChange }) => {
  const getWeatherIcon = (iconCode: string) => {
    const code = iconCode.substring(0, 2);
    switch (code) {
      case '01': return <Sun className="w-16 h-16 text-yellow-400 hover:text-yellow-300 transition-colors duration-300" />;
      case '02': case '03': case '04': return <Cloud className="w-16 h-16 text-gray-400 hover:text-gray-300 transition-colors duration-300" />;
      case '09': case '10': return <CloudRain className="w-16 h-16 text-blue-400 hover:text-blue-300 transition-colors duration-300" />;
      case '13': return <Snowflake className="w-16 h-16 text-blue-200 hover:text-blue-100 transition-colors duration-300" />;
      default: return <Sun className="w-16 h-16 text-yellow-400 hover:text-yellow-300 transition-colors duration-300" />;
    }
  };

  const getBackgroundGradient = (iconCode: string) => {
    const code = iconCode.substring(0, 2);
    switch (code) {
      case '01': return 'from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400';
      case '02': case '03': case '04': return 'from-gray-400 to-gray-600 hover:from-gray-300 hover:to-gray-500';
      case '09': case '10': return 'from-blue-400 to-blue-600 hover:from-blue-300 hover:to-blue-500';
      case '13': return 'from-blue-200 to-blue-400 hover:from-blue-100 hover:to-blue-300';
      default: return 'from-blue-400 to-blue-600 hover:from-blue-300 hover:to-blue-500';
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getBackgroundGradient(weather.icon)} p-8 text-white shadow-2xl backdrop-blur-sm transition-all duration-500 hover:shadow-3xl group`}>
      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="group-hover:transform group-hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold hover:text-yellow-200 transition-colors duration-300">{weather.name}</h2>
            <p className="text-lg opacity-90 hover:opacity-100 transition-opacity duration-300">{weather.country}</p>
          </div>
          <div className="hover:scale-110 transition-transform duration-300">
            {getWeatherIcon(weather.icon)}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="group-hover:transform group-hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-2">
              <span className="text-6xl font-light hover:text-yellow-200 transition-colors duration-300">{Math.round(weather.temperature)}</span>
              <button
                onClick={onUnitChange}
                className="text-2xl font-medium hover:scale-125 hover:text-yellow-200 transition-all duration-300 cursor-pointer bg-white bg-opacity-20 rounded-full px-2 py-1 hover:bg-opacity-30"
              >
                °{unit}
              </button>
            </div>
            <p className="text-lg capitalize mt-2 hover:text-yellow-200 transition-colors duration-300">{weather.description}</p>
            <p className="text-sm opacity-75 hover:opacity-100 transition-opacity duration-300">Feels like {Math.round(weather.feelsLike)}°{unit}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm hover:bg-opacity-30 hover:scale-105 transition-all duration-300 cursor-pointer group/item">
            <Wind className="w-5 h-5 group-hover/item:scale-110 transition-transform duration-300" />
            <div>
              <p className="text-sm opacity-75 group-hover/item:opacity-100 transition-opacity duration-300">Wind Speed</p>
              <p className="font-semibold group-hover/item:text-yellow-200 transition-colors duration-300">{weather.windSpeed} m/s</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm hover:bg-opacity-30 hover:scale-105 transition-all duration-300 cursor-pointer group/item">
            <Droplets className="w-5 h-5 group-hover/item:scale-110 transition-transform duration-300" />
            <div>
              <p className="text-sm opacity-75 group-hover/item:opacity-100 transition-opacity duration-300">Humidity</p>
              <p className="font-semibold group-hover/item:text-yellow-200 transition-colors duration-300">{weather.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm hover:bg-opacity-30 hover:scale-105 transition-all duration-300 cursor-pointer group/item">
            <Eye className="w-5 h-5 group-hover/item:scale-110 transition-transform duration-300" />
            <div>
              <p className="text-sm opacity-75 group-hover/item:opacity-100 transition-opacity duration-300">Visibility</p>
              <p className="font-semibold group-hover/item:text-yellow-200 transition-colors duration-300">{weather.visibility / 1000} km</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm hover:bg-opacity-30 hover:scale-105 transition-all duration-300 cursor-pointer group/item">
            <Thermometer className="w-5 h-5 group-hover/item:scale-110 transition-transform duration-300" />
            <div>
              <p className="text-sm opacity-75 group-hover/item:opacity-100 transition-opacity duration-300">Pressure</p>
              <p className="font-semibold group-hover/item:text-yellow-200 transition-colors duration-300">{weather.pressure} hPa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;