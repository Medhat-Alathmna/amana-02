"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import busesData from "../../data/buses.json"; // استدعاء البيانات المحلية
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// dynamic imports حتى نتجنب خطأ window is not defined
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);

export default function BusMap() {
    const busLines = busesData.bus_lines;

  const [selectedBusId, setSelectedBusId] = useState(busLines[0]?.id || null);

  const busIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61212.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const stopIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854894.png",
    iconSize: [20, 20],
    iconAnchor: [10, 20],
  });

  const selectedBus = busLines.find((bus) => bus.id === selectedBusId);

  return (
    <div style={{ width: "100%" }}>
      {/* أزرار لاختيار الباص */}
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
              backgroundColor:
                selectedBusId === bus.id ? "#0070f3" : "#f5f5f5",
              color: selectedBusId === bus.id ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {bus.route_number} - {bus.name}
          </button>
        ))}
      </div>

      {/* الخريطة */}
      <div style={{ height: "500px", width: "100%" }}>
        {typeof window !== "undefined" && (
          <MapContainer
            center={[3.139, 101.6869]} // Kuala Lumpur center
            zoom={12}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {selectedBus && (
              <>
                {/* موقع الباص */}
                <Marker
                  position={[
                    selectedBus.current_location.latitude,
                    selectedBus.current_location.longitude,
                  ]}
                  icon={busIcon}
                >
                  <Popup>
                    <div
                      style={{
                        background: "#ffdddd",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "2px solid red",
                        minWidth: "200px",
                        textAlign: "left",
                      }}
                    >
                      <h4
                        style={{
                          margin: "0 0 8px 0",
                          color: "#b30000",
                          fontSize: "16px",
                        }}
                      >
                        {selectedBus.name}
                      </h4>
                      <p style={{ margin: "4px 0" }}>
                        <b>Status:</b> {selectedBus.status}
                      </p>
                      <p style={{ margin: "4px 0" }}>
                        <b>Capacity:</b>{" "}
                        {selectedBus.passengers.utilization_percentage}%
                      </p>
                      <p style={{ margin: "4px 0" }}>
                        <b>Next Stop:</b>{" "}
                        {selectedBus.bus_stops.find((s) => s.is_next_stop)?.name ||
                          "N/A"}
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
                      <div
                        style={{
                          background: "#eef6ff",
                          padding: "8px",
                          borderRadius: "6px",
                          border: "1px solid #0070f3",
                          minWidth: "180px",
                          textAlign: "left",
                        }}
                      >
                        <h4
                          style={{
                            margin: "0 0 6px 0",
                            color: "#004080",
                            fontSize: "14px",
                          }}
                        >
                          {stop.name}
                        </h4>
                        <p style={{ margin: "4px 0" }}>
                          <b>Next Bus Arrival:</b> {stop.estimated_arrival}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* خط المسار */}
                <Polyline
                  positions={selectedBus.bus_stops.map((s) => [
                    s.latitude,
                    s.longitude,
                  ])}
                  color="blue"
                />
              </>
            )}
          </MapContainer>
        )}
      </div>
    </div>
  );
}
