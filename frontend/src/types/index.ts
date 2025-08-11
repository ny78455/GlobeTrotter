export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  language?: string;
}

export interface Trip {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  coverImage?: string;
  budget: number;
  cities: City[];
  isPublic: boolean;
  userId: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  arrivalDate: string;
  departureDate: string;
  activities: Activity[];
  budget: number;
  image?: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  time: string;
  duration: number;
  cost: number;
  category: 'transport' | 'accommodation' | 'food' | 'activities' | 'shopping';
  image?: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  popularity: number;
  costIndex: number;
}