// app/components/BusSelector/BusSelector.tsx
'use client';
import { useBusData } from '@/app/context/BusContext';
import './BusSelector.css';

export default function BusSelector() {
  const { busLines, selectedBus, setSelectedBusId } =
    useBusData();

  return (
    <div className="bus-selector">
      {busLines
        .filter((bus) => bus.status === 'Active') // Optionally show only active buses
        .map((bus) => (
          <button
            key={bus.id}
            onClick={() => setSelectedBusId(bus.id)}
            className={
              selectedBus?.id === bus.id ? 'active' : ''
            }
          >
            {bus.route_number} - {bus.name}
          </button>
        ))}
    </div>
  );
}
