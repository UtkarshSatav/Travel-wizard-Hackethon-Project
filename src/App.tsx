import React, { useState } from 'react';
import { Upload, MapPin, DollarSign, Calendar, Plane, Camera, Globe } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import LocationDetector from './components/LocationDetector';
import DestinationCard from './components/DestinationCard';
import LoadingAnalysis from './components/LoadingAnalysis';
import { analyzeDestination } from './utils/destinationAnalyzer';
import { Destination, AnalysisResult, UserLocation } from './types/travel';

function App() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleImageUpload = async (imageUrl: string) => {
    if (!userLocation) return;
    
    setUploadedImage(imageUrl);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Simulate AI analysis delay
    setTimeout(() => {
      const result = analyzeDestination(userLocation);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-xl">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                TRAVEL-WIZARD
              </h1>
              <p className="text-sm text-gray-600">AI-Powered Travel Assistant</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Detection */}
        <LocationDetector 
          onLocationSet={setUserLocation} 
          currentLocation={userLocation} 
        />

        {!uploadedImage && userLocation ? (
          /* Welcome Section */
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Camera className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Your Perfect Destination
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload a photo or video of a place you'd love to visit, and I'll suggest similar 
              destinations worldwide with accurate flight costs from {userLocation.city}, best seasons, and detailed planning information.
            </p>
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
        ) : uploadedImage && userLocation ? (
          /* Analysis Section */
          <div className="space-y-8">
            {/* Uploaded Image Display */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                    Flight Costs from {userLocation.city}, {userLocation.country}
                  </h3>
                  <button
                    onClick={resetAnalysis}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Upload New Image
                  </button>
                </div>
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={uploadedImage}
                    alt="Uploaded destination"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isAnalyzing && <LoadingAnalysis />}

            {/* Analysis Results */}
            {analysisResult && (
              <div className="space-y-6">
                {/* Destination Type */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Globe className="h-5 w-5 text-teal-600 mr-2" />
                    Destination Analysis
                  </h3>
                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-4">
                    <p className="text-gray-800 text-lg">
                      <span className="font-semibold text-blue-600">{analysisResult.destinationType}</span>
                    </p>
                    <p className="text-gray-600 mt-2">{analysisResult.description}</p>
                  </div>
                </div>

                {/* Suggested Destinations */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Plane className="h-5 w-5 text-orange-600 mr-2" />
                    Perfect Matches from {userLocation.city}
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {analysisResult.suggestions.map((destination, index) => (
                      <DestinationCard
                        key={index}
                        destination={destination}
                        isRecommended={index === 0}
                      />
                    ))}
                  </div>
                </div>

                {/* Travel Tips */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                    Seasonal Intelligence
                  </h3>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-gray-800">{analysisResult.seasonalAdvice}</p>
                  </div>
                </div>

                {/* Budget Overview */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                    Budget Overview (5-Day Trip from {userLocation.city})
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-green-600 font-medium">Budget Option</p>
                      <p className="text-2xl font-bold text-green-700">$800-1,200</p>
                      <p className="text-xs text-green-600">Economy flights + hostels</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-blue-600 font-medium">Mid-Range</p>
                      <p className="text-2xl font-bold text-blue-700">$1,200-2,000</p>
                      <p className="text-xs text-blue-600">Standard flights + hotels</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-purple-600 font-medium">Luxury</p>
                      <p className="text-2xl font-bold text-purple-700">$2,500+</p>
                      <p className="text-xs text-purple-600">Business class + resorts</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">TRAVEL-WIZARD</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Your AI-powered companion for discovering amazing destinations worldwide
            </p>
            <p className="text-sm text-gray-500">
              Upload any destination photo and get personalized travel recommendations with real costs and seasonal insights
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;