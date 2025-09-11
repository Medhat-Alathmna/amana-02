"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

// This component is now a Client Component, so we can use dynamic import with ssr: false here.
const BusMap = dynamic(() => import("../BusMap/BusMap"), {
  ssr: false,
  loading: () => <p style={{ textAlign: "center", padding: "20px" }}>Loading map...</p>,
});

export default function MapLoader() {
  return <BusMap />;
}