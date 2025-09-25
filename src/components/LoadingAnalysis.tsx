import React from 'react';
import { Globe, Camera, MapPin, DollarSign } from 'lucide-react';

const LoadingAnalysis: React.FC = () => {
  const loadingSteps = [
    { icon: Camera, text: "Analyzing image composition..." },
    { icon: Globe, text: "Identifying destination type..." },
    { icon: MapPin, text: "Finding similar locations..." },
    { icon: DollarSign, text: "Calculating travel costs..." }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 animate-pulse">
          <Globe className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          🧙‍♂️ TRAVEL-WIZARD is working its magic...
        </h3>
        <p className="text-gray-600">
          Analyzing your image and finding perfect destinations worldwide
        </p>
      </div>

      <div className="space-y-4">
        {loadingSteps.map((step, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
            <div className={`p-2 rounded-lg transition-all duration-1000 ${
              index === 0 ? 'bg-blue-100 text-blue-600' :
              index === 1 ? 'bg-teal-100 text-teal-600' :
              index === 2 ? 'bg-orange-100 text-orange-600' :
              'bg-green-100 text-green-600'
            }`}>
              <step.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">{step.text}</p>
            </div>
            <div className={`w-4 h-4 rounded-full transition-all duration-1000 ${
              index <= 1 ? 'bg-blue-500 animate-pulse' : 'bg-gray-200'
            }`} />
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full transition-all duration-3000 animate-pulse" 
               style={{ width: '65%' }} />
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          Estimated time: 2-3 seconds
        </p>
      </div>
    </div>
  );
};

export default LoadingAnalysis;