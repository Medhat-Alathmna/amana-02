"use client";

// We can now use normal imports because this entire component is client-only.
import { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import busesData from "../../data/buses.json";

export default function BusMap() {
  const busLines = busesData.bus_lines;
  const [selectedBusId, setSelectedBusId] = useState(busLines[0]?.id || null);

  // It's still best practice to create these icons inside the component.
  const busIcon = useMemo(() => new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/741/741411.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }), []);

  const stopIcon = useMemo(() => new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
    iconSize: [20, 20],
    iconAnchor: [10, 20],
  }), []);

  const selectedBus = busLines.find((bus) => bus.id === selectedBusId);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 16px",
      }}
    >
      {/* Bus selection buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "10px",
          paddingTop: "10px",
          justifyContent: "center",
        }}
      >
        {busLines.map((bus) => (
          <button
            key={bus.id}
            onClick={() => setSelectedBusId(bus.id)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: selectedBusId === bus.id ? "#0070f3" : "#f5f5f5",
              color: selectedBusId === bus.id ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {bus.route_number} - {bus.name}
          </button>
        ))}
      </div>

      {/* The Map */}
      <div style={{ height: "500px", width: "100%", marginTop: "20px" }}>
        <MapContainer
          center={[3.139, 101.6869]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
/>
          {selectedBus && (
            <>
              <Marker
                position={[
                  selectedBus.current_location.latitude,
                  selectedBus.current_location.longitude,
                ]}
                icon={busIcon}
              >
                <Popup>
                  <div style={{ minWidth: "200px", textAlign: "left" }}>
                    <h4>{selectedBus.name}</h4>
                    <p><b>Status:</b> {selectedBus.status}</p>
                    <p><b>Capacity:</b> {selectedBus.passengers.utilization_percentage}%</p>
                    <p>
                      <b>Next Stop:</b>{" "}
                      {selectedBus.bus_stops.find((s) => s.is_next_stop)?.name || "N/A"}
                    </p>
                  </div>
                </Popup>
              </Marker>
              {selectedBus.bus_stops.map((stop) => (
                <Marker
                  key={stop.id}
                  position={[stop.latitude, stop.longitude]}
                  icon={stopIcon}
                >
                  <Popup>
                    <div style={{ minWidth: "180px", textAlign: "left" }}>
                      <h4>{stop.name}</h4>
                      <p><b>Next Bus Arrival:</b> {stop.estimated_arrival}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
              <Polyline
                positions={selectedBus.bus_stops.map((s) => [s.latitude, s.longitude])}
                color="blue"
              />
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
}