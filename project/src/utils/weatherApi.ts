// OpenWeatherMap API configuration
const API_KEY = '7a231ce05b4c19ad9b02985885aa54fe'; // Your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
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

export interface ForecastDay {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  description: string;
  icon: string;
}

export const getCurrentWeather = async (city: string, unit: 'C' | 'F' = 'C'): Promise<WeatherData> => {
  const units = unit === 'C' ? 'metric' : 'imperial';
  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    } else if (response.status === 401) {
      throw new Error('API key is invalid. Please check your OpenWeatherMap API key.');
    } else {
      throw new Error('Failed to fetch weather data. Please try again later.');
    }
  }

  const data = await response.json();

  return {
    name: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    visibility: data.visibility,
    pressure: data.main.pressure,
    icon: data.weather[0].icon,
  };
};

export const getCurrentWeatherByCoords = async (lat: number, lon: number, unit: 'C' | 'F' = 'C'): Promise<WeatherData> => {
  const units = unit === 'C' ? 'metric' : 'imperial';
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('API key is invalid. Please check your OpenWeatherMap API key.');
    } else {
      throw new Error('Failed to fetch weather data. Please try again later.');
    }
  }

  const data = await response.json();

  return {
    name: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    visibility: data.visibility,
    pressure: data.main.pressure,
    icon: data.weather[0].icon,
  };
};

export const getForecast = async (city: string, unit: 'C' | 'F' = 'C'): Promise<ForecastDay[]> => {
  const units = unit === 'C' ? 'metric' : 'imperial';
  const response = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    } else if (response.status === 401) {
      throw new Error('API key is invalid. Please check your OpenWeatherMap API key.');
    } else {
      throw new Error('Failed to fetch forecast data. Please try again later.');
    }
  }

  const data = await response.json();

  // Group forecast data by day and get daily min/max temperatures
  const dailyForecasts: { [key: string]: any } = {};
  
  data.list.forEach((item: any) => {
    const date = item.dt_txt.split(' ')[0];
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = {
        date,
        temperatures: [],
        descriptions: [],
        icons: [],
      };
    }
    dailyForecasts[date].temperatures.push(item.main.temp);
    dailyForecasts[date].descriptions.push(item.weather[0].description);
    dailyForecasts[date].icons.push(item.weather[0].icon);
  });

  return Object.values(dailyForecasts)
    .slice(0, 5)
    .map((day: any) => ({
      date: day.date,
      temperature: {
        min: Math.min(...day.temperatures),
        max: Math.max(...day.temperatures),
      },
      description: day.descriptions[0], // Use the first description of the day
      icon: day.icons[0], // Use the first icon of the day
    }));
};

export const getForecastByCoords = async (lat: number, lon: number, unit: 'C' | 'F' = 'C'): Promise<ForecastDay[]> => {
  const units = unit === 'C' ? 'metric' : 'imperial';
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('API key is invalid. Please check your OpenWeatherMap API key.');
    } else {
      throw new Error('Failed to fetch forecast data. Please try again later.');
    }
  }

  const data = await response.json();

  // Group forecast data by day and get daily min/max temperatures
  const dailyForecasts: { [key: string]: any } = {};
  
  data.list.forEach((item: any) => {
    const date = item.dt_txt.split(' ')[0];
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = {
        date,
        temperatures: [],
        descriptions: [],
        icons: [],
      };
    }
    dailyForecasts[date].temperatures.push(item.main.temp);
    dailyForecasts[date].descriptions.push(item.weather[0].description);
    dailyForecasts[date].icons.push(item.weather[0].icon);
  });

  return Object.values(dailyForecasts)
    .slice(0, 5)
    .map((day: any) => ({
      date: day.date,
      temperature: {
        min: Math.min(...day.temperatures),
        max: Math.max(...day.temperatures),
      },
      description: day.descriptions[0],
      icon: day.icons[0],
    }));
};