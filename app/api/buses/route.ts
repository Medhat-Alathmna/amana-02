// app/api/buses/route.ts
import { NextResponse } from 'next/server';
import busesData from '@/app/data/buses.json';
import { BusLine } from '@/app/lib/types';

// In a real app, you would fetch this from a database or a live service.
// For now, we simulate movement.
const simulateBusMovement = (bus: BusLine): BusLine => {
  // Don't move buses under maintenance
  if (bus.status !== 'Active') return bus;

  // Simple simulation: slightly move the bus's coordinates
  const latChange = (Math.random() - 0.5) * 0.001; // Tiny random change
  const lonChange = (Math.random() - 0.5) * 0.001;

  return {
    ...bus,
    current_location: {
      latitude: bus.current_location.latitude + latChange,
      longitude: bus.current_location.longitude + lonChange,
    },
  };
};

export async function GET() {
  // Simulate movement for all buses before returning
  const updatedBusLines = busesData.bus_lines.map(
    simulateBusMovement,
  );

  return NextResponse.json({
    ...busesData,
    bus_lines: updatedBusLines,
  });
}
