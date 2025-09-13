// app/context/BusContext.tsx
'use client';

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from 'react';
import busesData from '../data/buses.json';
import { BusLine } from '../lib/types'; // We'll create this types file next
import { useEffect } from 'react';

interface BusContextType {
  busLines: BusLine[];
  selectedBus: BusLine | undefined;
  setSelectedBusId: (id: number | null) => void;
  isLoading: boolean;
  error: Error | null;
}

export function BusProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [busLines, setBusLines] = useState<BusLine[]>([]);
  const [selectedBusId, setSelectedBusId] = useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/buses');
        if (!response.ok)
          throw new Error('Failed to fetch bus data');
        const data = await response.json();
        setBusLines(data.bus_lines);
        // Set initial bus if not set
        if (
          selectedBusId === null &&
          data.bus_lines.length > 0
        ) {
          setSelectedBusId(data.bus_lines[0].id);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 5000); // Poll for new data every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [selectedBusId]); // Re-run if selectedBusId changes (to ensure it's valid)

  const selectedBus = busLines.find(
    (bus) => bus.id === selectedBusId,
  );

  return (
    <BusContext.Provider
      value={{
        busLines,
        selectedBus,
        setSelectedBusId,
        isLoading,
        error,
      }}
    >
      {children}
    </BusContext.Provider>
  );
}

export function useBusData() {
  const context = useContext(BusContext);
  if (context === undefined) {
    throw new Error(
      'useBusData must be used within a BusProvider',
    );
  }
  return context;
}
