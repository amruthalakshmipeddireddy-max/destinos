export interface BusDeparture {
  id: string;
  operator: string;
  busType: string;
  isBestMatch?: boolean;
  onTimeGuaranteePercent?: number;
  tag?: string;
  promiseScore: number;
  departureTime: string;
  departureStation: string;
  duration: string;
  routeType: string;
  arrivalTime: string;
  arrivalStation: string;
  deadlineComparison: {
    status: 'ahead' | 'on_time' | 'delayed';
    minutesDiff: number; // positive = ahead, negative = delayed
    text: string;
    warningText?: string;
  };
  keyAssurances: string[];
  amenities: {
    text: string;
    icon: string;
    highlight?: boolean;
  }[];
  price: number;
  originalPrice?: number;
  dealTag?: string;
  priceCategory?: string;
  availableSeatsCount: number;
  rating: number;
  ratingCount: number;
  boardingPoints: { id: string; name: string; time: string; landmark: string }[];
  droppingPoints: { id: string; name: string; time: string; landmark: string }[];
  operatorDetails: {
    fleetAge: string;
    cancellationRate: string;
    driverCrew: string;
    vehicleModel: string;
  };
}

export interface Seat {
  id: string;
  seatNumber: string;
  deck: 'lower' | 'upper';
  type: 'single' | 'double_window' | 'double_aisle';
  row: number;
  column: number;
  price: number;
  status: 'available' | 'booked' | 'ladies' | 'selected';
  isSleeper: boolean;
}

export interface RouteMilestone {
  id: string;
  name: string;
  distanceKm: number;
  scheduledTime: string;
  actualOrPredictedTime: string;
  status: 'completed' | 'current' | 'upcoming';
  type: 'city' | 'toll' | 'rest_stop' | 'destination';
  notes?: string;
  amenitiesInfo?: string;
  foodRating?: string;
}

export interface SearchState {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
  deadlineTime: string;
}

export type ActiveScreen = 'departures' | 'seats' | 'tracker' | 'driver' | 'guarantee';
