import React, { useState } from 'react';
import { MapPin, Loader, Globe, Search } from 'lucide-react';
import { UserLocation } from '../types/travel';

interface LocationDetectorProps {
  onLocationSet: (location: UserLocation) => void;
  currentLocation: UserLocation | null;
}

const LocationDetector: React.FC<LocationDetectorProps> = ({ 
  onLocationSet, 
  currentLocation 
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [manualLocation, setManualLocation] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  const detectLocation = async () => {
    setIsDetecting(true);
    
    try {
      // Try to get user's geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            try {
              // Use a reverse geocoding service to get city name
              // For demo purposes, we'll simulate this with common locations
              const location = await simulateReverseGeocode(latitude, longitude);
              onLocationSet(location);
            } catch (error) {
              // Fallback to IP-based location detection
              const ipLocation = await getLocationFromIP();
              onLocationSet(ipLocation);
            }
            setIsDetecting(false);
          },
          async () => {
            // If geolocation fails, try IP-based detection
            const ipLocation = await getLocationFromIP();
            onLocationSet(ipLocation);
            setIsDetecting(false);
          }
        );
      } else {
        // Geolocation not supported, use IP-based detection
        const ipLocation = await getLocationFromIP();
        onLocationSet(ipLocation);
        setIsDetecting(false);
      }
    } catch (error) {
      console.error('Location detection failed:', error);
      setIsDetecting(false);
      setShowManualInput(true);
    }
  };

  const simulateReverseGeocode = async (lat: number, lng: number): Promise<UserLocation> => {
    // Simulate reverse geocoding with common city coordinates
    const cities = [
      { city: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060 },
      { city: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
      { city: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
      { city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
      { city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
      { city: 'Los Angeles', country: 'United States', lat: 34.0522, lng: -118.2437 },
      { city: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832 },
      { city: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050 },
    ];

    // Find closest city (simplified distance calculation)
    let closestCity = cities[0];
    let minDistance = Math.abs(lat - cities[0].lat) + Math.abs(lng - cities[0].lng);

    cities.forEach(city => {
      const distance = Math.abs(lat - city.lat) + Math.abs(lng - city.lng);
      if (distance < minDistance) {
        minDistance = distance;
        closestCity = city;
      }
    });

    return {
      city: closestCity.city,
      country: closestCity.country,
      coordinates: { lat, lng }
    };
  };

  const getLocationFromIP = async (): Promise<UserLocation> => {
    // Simulate IP-based location detection
    // In a real app, you'd use a service like ipapi.co or similar
    const commonLocations = [
      { city: 'New York', country: 'United States' },
      { city: 'London', country: 'United Kingdom' },
      { city: 'Toronto', country: 'Canada' },
      { city: 'Sydney', country: 'Australia' },
      { city: 'Los Angeles', country: 'United States' },
    ];
    
    return commonLocations[Math.floor(Math.random() * commonLocations.length)];
  };

  const handleManualLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualLocation.trim()) {
      const [city, country] = manualLocation.split(',').map(s => s.trim());
      onLocationSet({
        city: city || manualLocation,
        country: country || 'Unknown'
      });
      setShowManualInput(false);
      setManualLocation('');
    }
  };

  if (currentLocation) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <MapPin className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Your Location</p>
              <p className="text-sm text-gray-600">
                {currentLocation.city}, {currentLocation.country}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowManualInput(true)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Change
          </button>
        </div>
      </div>
    );
  }

  if (showManualInput) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Search className="h-5 w-5 text-blue-600 mr-2" />
          Enter Your Location
        </h3>
        <form onSubmit={handleManualLocationSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              placeholder="e.g., New York, United States"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter your city and country (e.g., "London, UK" or "Tokyo, Japan")
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Set Location
            </button>
            <button
              type="button"
              onClick={() => setShowManualInput(false)}
              className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="text-center">
        <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Globe className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Let's Find Your Perfect Destination
        </h3>
        <p className="text-gray-600 mb-6">
          First, we need to know where you're traveling from to calculate accurate flight costs
        </p>
        
        <div className="space-y-3">
          <button
            onClick={detectLocation}
            disabled={isDetecting}
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isDetecting ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Detecting Location...</span>
              </>
            ) : (
              <>
                <MapPin className="h-5 w-5" />
                <span>Auto-Detect My Location</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => setShowManualInput(true)}
            className="w-full text-gray-600 hover:text-gray-800 py-2 font-medium transition-colors"
          >
            Or enter manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationDetector;