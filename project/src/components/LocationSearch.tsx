import React, { useState } from 'react';
import { Search, MapPin, Loader } from 'lucide-react';

interface LocationSearchProps {
  onSearch: (location: string) => void;
  onGetCurrentLocation: () => void;
  isLoading: boolean;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onSearch, onGetCurrentLocation, isLoading }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white border-opacity-30 hover:bg-opacity-30 hover:shadow-2xl transition-all duration-300 group">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city name..."
              className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent focus:bg-opacity-30 hover:bg-opacity-25 transition-all duration-300"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !location.trim()}
            className="w-full bg-white bg-opacity-20 hover:bg-opacity-40 disabled:bg-opacity-10 border border-white border-opacity-30 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg active:scale-95"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Search Weather
              </>
            )}
          </button>
        </form>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white border-opacity-30"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-white opacity-70 group-hover:opacity-100 transition-opacity duration-300">or</span>
          </div>
        </div>
        
        <button
          onClick={onGetCurrentLocation}
          disabled={isLoading}
          className="w-full bg-white bg-opacity-20 hover:bg-opacity-40 disabled:bg-opacity-10 border border-white border-opacity-30 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg active:scale-95"
        >
          {isLoading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Getting Location...
            </>
          ) : (
            <>
              <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Use Current Location
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LocationSearch;