export interface Destination {
  name: string;
  country: string;
  imageUrl: string;
  description: string;
  matchReason: string;
  flightCost: number;
  accommodationCost: number;
  bestSeason: string;
  totalBudget: {
    min: number;
    max: number;
  };
  currentCondition?: string;
}

export interface UserLocation {
  city: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface AnalysisResult {
  destinationType: string;
  description: string;
  suggestions: Destination[];
  seasonalAdvice: string;
  userLocation: UserLocation;
}