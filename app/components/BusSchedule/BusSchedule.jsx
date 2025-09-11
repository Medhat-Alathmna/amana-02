"use client";

import { useState } from "react";
import busesData from "../../data/buses.json"; // local data
import "./BusSchedule.css";

export default function BusSchedule() {
  const busLines = busesData.bus_lines;
  const [selectedBusId, setSelectedBusId] = useState(busLines[0]?.id || null);

  const selectedBus = busLines.find((bus) => bus.id === selectedBusId);

  return (
    <div className="bus-schedule-container">
      {/* Bus buttons inside BusSchedule */}
      <div className="bus-buttons">
        {busLines.map((bus) => (
          <button
            key={bus.id}
            onClick={() => setSelectedBusId(bus.id)}
            className={selectedBusId === bus.id ? "active" : ""}
          >
            {bus.route_number} - {bus.name}
          </button>
        ))}
      </div>

      {/* Schedule table */}
      {selectedBus && (
        <div className="bus-schedule">
          <h3>Bus Stops for {selectedBus.name} ({selectedBus.route_number})</h3>
          <table>
            <thead>
              <tr>
                <th>Bus Stop</th>
                <th>Next Time of Arrival</th>
              </tr>
            </thead>
            <tbody>
              {selectedBus.bus_stops.map((stop) => (
                <tr key={stop.id} className={stop.is_next_stop ? "highlight" : ""}>
                  <td>{stop.name}</td>
                  <td>{stop.estimated_arrival}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
