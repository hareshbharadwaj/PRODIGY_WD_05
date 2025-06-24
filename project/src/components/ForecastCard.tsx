import React from 'react';
import { Cloud, Sun, CloudRain, Snowflake } from 'lucide-react';

interface ForecastDay {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  description: string;
  icon: string;
}

interface ForecastCardProps {
  forecast: ForecastDay[];
  unit: 'C' | 'F';
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit }) => {
  const getWeatherIcon = (iconCode: string, size: string = 'w-8 h-8') => {
    const code = iconCode.substring(0, 2);
    switch (code) {
      case '01': return <Sun className={`${size} text-yellow-400 hover:text-yellow-300 transition-colors duration-300`} />;
      case '02': case '03': case '04': return <Cloud className={`${size} text-gray-400 hover:text-gray-300 transition-colors duration-300`} />;
      case '09': case '10': return <CloudRain className={`${size} text-blue-400 hover:text-blue-300 transition-colors duration-300`} />;
      case '13': return <Snowflake className={`${size} text-blue-200 hover:text-blue-100 transition-colors duration-300`} />;
      default: return <Sun className={`${size} text-yellow-400 hover:text-yellow-300 transition-colors duration-300`} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white border-opacity-30 hover:bg-opacity-30 hover:shadow-2xl transition-all duration-300 group">
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-200 transition-colors duration-300">5-Day Forecast</h3>
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-xl hover:bg-opacity-25 hover:scale-105 transition-all duration-300 cursor-pointer group/item">
            <div className="flex items-center gap-3">
              <div className="group-hover/item:scale-110 transition-transform duration-300">
                {getWeatherIcon(day.icon)}
              </div>
              <div>
                <p className="text-white font-medium group-hover/item:text-yellow-200 transition-colors duration-300">{formatDate(day.date)}</p>
                <p className="text-white text-sm opacity-75 capitalize group-hover/item:opacity-100 transition-opacity duration-300">{day.description}</p>
              </div>
            </div>
            <div className="text-right group-hover/item:scale-110 transition-transform duration-300">
              <div className="flex items-center gap-2 text-white">
                <span className="font-bold group-hover/item:text-yellow-200 transition-colors duration-300">{Math.round(day.temperature.max)}°</span>
                <span className="opacity-60 group-hover/item:opacity-80 transition-opacity duration-300">{Math.round(day.temperature.min)}°</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;