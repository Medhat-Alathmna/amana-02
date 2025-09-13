// app/lib/types.ts
export interface BusStop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  estimated_arrival: string;
  is_next_stop: boolean;
}

export interface BusLine {
  id: number;
  name: string;
  route_number: string;
  status: string;
  current_location: {
    latitude: number;
    longitude: number;
  };
  passengers: {
    utilization_percentage: number;
  };
  bus_stops: BusStop[];
}
