import React from 'react';
import { MapPin, DollarSign, Calendar, Star, Plane, Thermometer } from 'lucide-react';
import { Destination } from '../types/travel';

interface DestinationCardProps {
  destination: Destination;
  isRecommended?: boolean;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ 
  destination, 
  isRecommended = false 
}) => {
  return (
    <div className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${
      isRecommended ? 'ring-2 ring-orange-400' : ''
    }`}>
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
            <Star className="h-3 w-3 mr-1 fill-current" />
            BEST MATCH
          </div>
        </div>
      )}

      {/* Image */}
      <div className="aspect-video relative overflow-hidden">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Location Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-1">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-gray-800 text-sm">{destination.country}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{destination.description}</p>
        </div>

        {/* Match Reason */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-sm font-medium">
            🎯 Perfect match: {destination.matchReason}
          </p>
        </div>

        {/* Travel Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Plane className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Round-trip Flight</p>
            <p className="font-bold text-blue-700">${destination.flightCost}</p>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <DollarSign className="h-5 w-5 text-green-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Per Night</p>
            <p className="font-bold text-green-700">${destination.accommodationCost}/night</p>
          </div>
        </div>

        {/* Best Season */}
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-800 font-medium">Best Season:</span>
            <span className="text-sm text-green-700">{destination.bestSeason}</span>
          </div>
        </div>

        {/* Total Budget */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">5-day total budget:</span>
            <div className="text-right">
              <p className="font-bold text-lg text-gray-900">
                ${destination.totalBudget.min}-{destination.totalBudget.max}
              </p>
              <p className="text-xs text-gray-500">flights + stay + food</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {destination.currentCondition && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-start space-x-2">
              <Thermometer className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-yellow-800 text-sm">{destination.currentCondition}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationCard;