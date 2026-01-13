/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ui/customs/VanillaMap.tsx
"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet's default icons can have issues with bundlers like Webpack.
// This manual import and configuration fixes the paths for the marker icons.
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

interface VanillaMapProps {
  position: L.LatLngExpression;
  zoom: number;
}

const VanillaMap: React.FC<VanillaMapProps> = ({ position, zoom }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // This effect runs only once when the component mounts.
    // It ensures that the map is initialized only on the client-side.
    if (mapContainerRef.current && !mapInstanceRef.current) {
      // Fix for default icon paths in Next.js
      // This part is crucial to make marker icons appear correctly.
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });

      // Initialize the map and set its view
      mapInstanceRef.current = L.map(mapContainerRef.current).setView(
        position,
        zoom
      );

      // Add a tile layer to the map (e.g., OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      // Add a marker to the map
      L.marker(position)
        .addTo(mapInstanceRef.current)
        .bindPopup("This is a vanilla Leaflet map in React!")
        .openPopup();
    }

    // The cleanup function is essential.
    // It runs when the component unmounts to destroy the map instance
    // and prevent memory leaks.
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // The empty dependency array ensures this effect runs only once.

  // This div is the container where the Leaflet map will be rendered.
  return (
    <div ref={mapContainerRef} style={{ height: "400px", width: "100%" }} />
  );
};

export default VanillaMap;
