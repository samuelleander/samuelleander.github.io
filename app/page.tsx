"use client";
import React, { useState, useEffect } from 'react';
import { 
  CloudIcon, 
  WindIcon, 
  DropletIcon, 
  ThermometerIcon, 
  GaugeIcon
} from 'lucide-react';

// AQI Color and Level Mapping
const AQI_LEVELS = [
  { min: 0, max: 50, color: 'bg-green-500', textColor: 'text-green-500', label: 'Good' },
  { min: 51, max: 100, color: 'bg-amber-500', textColor: 'text-amber-500', label: 'Moderate' },
  { min: 101, max: 150, color: 'bg-orange-500', textColor: 'text-orange-500', label: 'Unhealthy for Sensitive Groups' },
  { min: 151, max: 200, color: 'bg-red-500', textColor: 'text-red-500', label: 'Unhealthy' },
  { min: 201, max: 300, color: 'bg-purple-600', textColor: 'text-purple-600', label: 'Very Unhealthy' },
  { min: 301, max: 500, color: 'bg-fuchsia-600', textColor: 'text-fuchsia-600', label: 'Hazardous' }
];

// Pollutant & Weather Data
const DATA_BLOCKS = [
  { name: 'PM2.5', symbol: 'Fine Particulate Matter', value: 30, unit: 'µg/m³', icon: <CloudIcon className="w-5 h-5 text-blue-400" /> },
  { name: 'PM1', symbol: 'Ultrafine Particulate Matter', value: 15, unit: 'µg/m³', icon: <CloudIcon className="w-5 h-5 text-blue-400" /> },
  { name: 'PM10', symbol: 'Respirable Particulate Matter', value: 50, unit: 'µg/m³', icon: <CloudIcon className="w-5 h-5 text-yellow-400" /> },
  { name: 'SO₂', symbol: 'Sulfur Dioxide', value: 20, unit: 'ppb', icon: <WindIcon className="w-5 h-5 text-green-400" /> },
  { name: 'NO₂', symbol: 'Nitrogen Dioxide', value: 30, unit: 'ppb', icon: <DropletIcon className="w-5 h-5 text-green-400" /> },
  { name: 'CO', symbol: 'Carbon Monoxide', value: 45, unit: 'ppb', icon: <DropletIcon className="w-5 h-5 text-purple-400" /> },
  { name: 'Humidity', symbol: 'Relative Humidity', value: 65, unit: '%', icon: <DropletIcon className="w-5 h-5 text-cyan-400" /> },
  { name: 'Pressure', symbol: 'Atmospheric Pressure', value: 1012, unit: 'hPa', icon: <GaugeIcon className="w-5 h-5 text-gray-400" /> },
  { name: 'Temperature', symbol: 'Air Temperature', value: 27, unit: '°C', icon: <ThermometerIcon className="w-5 h-5 text-red-400" /> }
];

const DataCard = ({ name, symbol, value, unit, icon }) => (
  <div className="relative bg-gray-800 text-white border-gray-500 border-2 rounded-lg p-3 shadow-md h-24 flex flex-col justify-center
    transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-gray-700">
    <div className="flex justify-between items-center mb-1">
      {icon}
      <span className="font-bold text-sm">{name}</span>
    </div>
    <div className="flex justify-between items-center">
      <div className="text-left">
        <p className="text-xs text-gray-400">{symbol}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold">{value}</p>
        <p className="text-xs text-gray-400">{unit}</p>
      </div>
    </div>
  </div>
);

const AQIMonitor: React.FC = () => {
  const [currentAQI, setCurrentAQI] = useState(91);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setCurrentAQI(prev => {
        const change = Math.floor(Math.random() * 20 - 10);
        return Math.max(0, Math.min(500, prev + change));
      });
    }, 5000);

    return () => clearInterval(updateInterval);
  }, []);

  const aqiCategory = AQI_LEVELS.find(level => currentAQI >= level.min && currentAQI <= level.max) || AQI_LEVELS[AQI_LEVELS.length - 1];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        
        {/* AQI Title */}
        <h1 className="text-4xl font-extrabold text-center drop-shadow-md 
          bg-gradient-to-r from-green-400 to-fuchsia-500 text-transparent bg-clip-text mb-6">
          RSET AQI
        </h1>

        {/* AQI Display */}
        <div className="text-center mb-6">
          <div className="font-bold text-2xl mb-2 text-gray-300">AQI</div>
          <div className={`text-9xl font-extrabold ${aqiCategory.color} bg-opacity-20 inline-block px-6 py-2 rounded-lg`}>
            {currentAQI}
          </div>
          <div className={`text-2xl mt-4 ${aqiCategory.textColor}`}>
            {aqiCategory.label}
          </div>

          {/* AQI Legend */}
          <div className="mt-6 w-full max-w-lg mx-auto text-center">
            <div className="flex justify-between text-xs text-gray-300 mb-1 px-2">
              {AQI_LEVELS.map(level => (
                <span key={level.label} className="w-1/6 text-center">{level.label}</span>
              ))}
            </div>
            
            {/* AQI Gradient Bar */}
            <div className="relative h-1 w-full bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-red-500 via-purple-600 to-fuchsia-600 rounded-full">
              <div 
                className="absolute w-3 h-3 bg-white border-2 border-gray-300 rounded-full top-1/2 transform -translate-y-1/2"
                style={{ left: `${(currentAQI / 500) * 100}%` }} 
              />
            </div>

            {/* AQI Values */}
            <div className="flex justify-between text-xs text-gray-400 mt-1 px-2">
              {AQI_LEVELS.map(level => (
                <span key={level.min} className="w-1/6 text-center">{level.min}{level.max === 500 ? "+" : ""}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Space Before Pollutants */}
        <div className="mt-10"></div>

        {/* Air Pollutants Heading */}
        <h2 className="text-2xl font-bold text-center mb-6 mt-10 text-gray-300 
          after:block after:h-1 after:bg-blue-500 after:w-16 after:mx-auto">
          Air Pollutants
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {DATA_BLOCKS.slice(0, 6).map(data => <DataCard key={data.name} {...data} />)}
        </div>

        {/* Weather Heading */}
        <h2 className="text-2xl font-bold text-center mb-6 mt-10 text-gray-300 
          after:block after:h-1 after:bg-blue-500 after:w-16 after:mx-auto">
          Weather
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {DATA_BLOCKS.slice(6).map(data => <DataCard key={data.name} {...data} />)}
        </div>
      </div>
    </div>
  );
};

export default AQIMonitor;
