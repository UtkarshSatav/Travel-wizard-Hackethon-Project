import { AnalysisResult, Destination, UserLocation } from '../types/travel';

// Flight cost calculator based on distance and destination popularity
const calculateFlightCost = (userLocation: UserLocation, destinationCountry: string): number => {
  const baseCosts: { [key: string]: { [key: string]: number } } = {
    'United States': {
      'Indonesia': 850,
      'Maldives': 950,
      'Thailand': 750,
      'Switzerland': 700,
      'Chile': 800,
      'Canada': 350,
      'France': 650,
      'Italy': 700,
      'Czech Republic': 600,
      'Morocco': 750,
      'Jordan': 800
    },
    'United Kingdom': {
      'Indonesia': 750,
      'Maldives': 850,
      'Thailand': 650,
      'Switzerland': 200,
      'Chile': 900,
      'Canada': 500,
      'France': 150,
      'Italy': 200,
      'Czech Republic': 180,
      'Morocco': 250,
      'Jordan': 400
    },
    'Canada': {
      'Indonesia': 900,
      'Maldives': 1000,
      'Thailand': 800,
      'Switzerland': 650,
      'Chile': 750,
      'Canada': 200,
      'France': 600,
      'Italy': 650,
      'Czech Republic': 550,
      'Morocco': 700,
      'Jordan': 750
    },
    'Australia': {
      'Indonesia': 400,
      'Maldives': 600,
      'Thailand': 350,
      'Switzerland': 1200,
      'Chile': 800,
      'Canada': 1000,
      'France': 1100,
      'Italy': 1150,
      'Czech Republic': 1050,
      'Morocco': 1000,
      'Jordan': 900
    },
    'Germany': {
      'Indonesia': 700,
      'Maldives': 800,
      'Thailand': 600,
      'Switzerland': 150,
      'Chile': 850,
      'Canada': 550,
      'France': 120,
      'Italy': 180,
      'Czech Republic': 100,
      'Morocco': 300,
      'Jordan': 350
    }
  };

  const userCountry = userLocation.country;
  const costs = baseCosts[userCountry] || baseCosts['United States']; // Default to US costs
  return costs[destinationCountry] || 700; // Default cost if not found
};

const destinationTemplates = {
  tropicalBeach: {
    type: "🏝️ Tropical Paradise Beach",
    description: "Your image shows a stunning tropical beach with crystal-clear waters and pristine sand - the perfect recipe for a relaxing getaway!",
    destinations: [
      {
        name: "Bali, Indonesia",
        country: "Indonesia",
        imageUrl: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Stunning beaches, rice terraces, and rich culture make Bali a perfect tropical escape.",
        matchReason: "Similar pristine beaches with palm trees and turquoise waters",
        accommodationCost: 45,
        bestSeason: "April - September",
        currentCondition: "Currently dry season - perfect conditions!"
      },
      {
        name: "Maldives",
        country: "Maldives",
        imageUrl: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Overwater bungalows and incredibly clear waters in this tropical paradise.",
        matchReason: "Pure white sand beaches and crystal-clear lagoons",
        accommodationCost: 120,
        bestSeason: "November - April",
      },
      {
        name: "Phuket, Thailand",
        country: "Thailand",
        imageUrl: "https://images.pexels.com/photos/1467300/pexels-photo-1467300.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Beautiful beaches, vibrant nightlife, and amazing Thai cuisine.",
        matchReason: "Tropical beaches with warm waters and excellent weather",
        accommodationCost: 35,
        bestSeason: "December - March",
      }
    ],
    seasonalAdvice: "🌴 Most tropical destinations are ideal during their dry seasons. Avoid monsoon periods for the best beach experience!"
  },
  
  mountainScenery: {
    type: "🏔️ Majestic Mountain Landscape",
    description: "Your image captures breathtaking mountain scenery - perfect for adventure seekers and nature lovers!",
    destinations: [
      {
        name: "Swiss Alps, Switzerland",
        country: "Switzerland",
        imageUrl: "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Iconic snow-capped peaks, pristine lakes, and charming Alpine villages.",
        matchReason: "Dramatic mountain peaks with stunning alpine scenery",
        accommodationCost: 80,
        bestSeason: "June - September",
      },
      {
        name: "Patagonia, Chile",
        country: "Chile",
        imageUrl: "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Wild landscapes, glaciers, and incredible hiking opportunities.",
        matchReason: "Rugged mountain terrain with pristine wilderness",
        accommodationCost: 60,
        bestSeason: "December - March",
      },
      {
        name: "Banff, Canada",
        country: "Canada",
        imageUrl: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Stunning Rocky Mountain scenery with turquoise lakes and wildlife.",
        matchReason: "Beautiful mountain lakes and forest-covered peaks",
        accommodationCost: 70,
        bestSeason: "June - September",
      }
    ],
    seasonalAdvice: "🏔️ Mountain destinations are best visited during summer months for hiking and clear views. Winter offers skiing opportunities!"
  },

  cityLandmark: {
    type: "🏛️ Iconic City Landmark",
    description: "Your image shows a beautiful urban landmark - perfect for cultural exploration and city adventures!",
    destinations: [
      {
        name: "Paris, France",
        country: "France",
        imageUrl: "https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "City of Light with world-famous landmarks, art, and cuisine.",
        matchReason: "Iconic architecture and beautiful urban landscapes",
        accommodationCost: 90,
        bestSeason: "April - June, September - October",
      },
      {
        name: "Rome, Italy",
        country: "Italy",
        imageUrl: "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Ancient history meets modern life in the Eternal City.",
        matchReason: "Historic landmarks and stunning classical architecture",
        accommodationCost: 75,
        bestSeason: "April - June, September - November",
      },
      {
        name: "Prague, Czech Republic",
        country: "Czech Republic",
        imageUrl: "https://images.pexels.com/photos/1387532/pexels-photo-1387532.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Fairy-tale architecture and charming cobblestone streets.",
        matchReason: "Beautiful historic architecture and romantic city atmosphere",
        accommodationCost: 50,
        bestSeason: "April - June, September - October",
      }
    ],
    seasonalAdvice: "🏛️ European cities are most pleasant in spring and fall with mild weather and fewer crowds than summer!"
  },

  desert: {
    type: "🏜️ Desert Adventure",
    description: "Your image showcases stunning desert landscapes - perfect for unique adventures and breathtaking sunsets!",
    destinations: [
      {
        name: "Sahara Desert, Morocco",
        country: "Morocco",
        imageUrl: "https://images.pexels.com/photos/1574831/pexels-photo-1574831.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Golden sand dunes, camel treks, and spectacular desert camps.",
        matchReason: "Vast sand dunes and authentic desert experience",
        accommodationCost: 60,
        bestSeason: "October - April",
      },
      {
        name: "Antelope Canyon, USA",
        country: "United States",
        imageUrl: "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=800",
        description: "Stunning slot canyons with incredible light beams and rock formations.",
        matchReason: "Unique desert rock formations and dramatic landscapes",
        accommodationCost: 85,
        bestSeason: "March - May, September - November",
      },
      {
        name: "Wadi Rum, Jordan",
        country: "Jordan",
        imageUrl: "https://images.pexels.com/photos/4913723/pexels-photo-4913723.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Mars-like landscapes with incredible rock formations and Bedouin culture.",
        matchReason: "Red desert landscapes with dramatic rock formations",
        accommodationCost: 55,
        bestSeason: "October - April",
      }
    ],
    seasonalAdvice: "🏜️ Desert destinations are best visited during cooler months. Avoid summer when temperatures can be extreme!"
  }
};

export function analyzeDestination(userLocation: UserLocation): AnalysisResult {
  // Simulate AI analysis by randomly selecting a destination type
  const types = Object.keys(destinationTemplates);
  const randomType = types[Math.floor(Math.random() * types.length)];
  const template = destinationTemplates[randomType as keyof typeof destinationTemplates];
  
  // Calculate flight costs and total budgets based on user location
  const destinationsWithCosts = template.destinations.map(destination => {
    const flightCost = calculateFlightCost(userLocation, destination.country);
    const dailyFood = 50; // Average daily food cost
    const totalBudget = {
      min: flightCost + (destination.accommodationCost * 5) + (dailyFood * 5),
      max: flightCost + (destination.accommodationCost * 5 * 1.5) + (dailyFood * 5 * 1.5)
    };
    
    return {
      ...destination,
      flightCost,
      totalBudget
    };
  });
  
  return {
    destinationType: template.type,
    description: template.description,
    suggestions: destinationsWithCosts,
    seasonalAdvice: template.seasonalAdvice,
    userLocation
  };
}