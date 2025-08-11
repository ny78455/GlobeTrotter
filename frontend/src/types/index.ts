export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
}

export interface TravelPreferences {
  destinations: string[];
  cuisines: string[];
  budget: string;
  groupSize: number;
}

export interface TripRecommendation {
  id: string;
  destination: string;
  duration: string;
  budget: string;
  highlights: string[];
  image: string;
}

export interface Itinerary {
  id: string;
  destination: string;
  days: ItineraryDay[];
  hotels: Hotel[];
  transportation: Transportation[];
}

export interface ItineraryDay {
  day: number;
  activities: Activity[];
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  category: string;
}

export interface Hotel {
  name: string;
  rating: number;
  price: string;
  image: string;
}

export interface Transportation {
  type: string;
  from: string;
  to: string;
  price: string;
}