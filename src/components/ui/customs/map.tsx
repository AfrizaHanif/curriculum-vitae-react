// src/components/ui/customs/Map.tsx
"use client";

import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import customMarkerIcon from "../../../assets/images/leaflet/marker-icon.png";

interface MapProps {
  position: LatLngExpression;
  zoom: number;
  // popupContent?: React.ReactNode;
  popupContent?: string;
}

const myCustomIcon = new L.Icon({
  iconUrl: customMarkerIcon.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41], // Adjust anchor if needed for correct positioning
  popupAnchor: [0, -41], // Adjust popup anchor
});

function MapUpdater({ position, zoom }: MapProps) {
  const map = useMap();

  useEffect(() => {
    let raf = 0;
    let ro: ResizeObserver | null = null;

    const ensure = () => {
      map.invalidateSize();
      const size = map.getSize();
      // If the container still has zero size, try again next frame
      if (size.x === 0 || size.y === 0) {
        raf = requestAnimationFrame(ensure);
        return;
      }
      // Once size is good, center without animation
      map.setView(position, zoom, { animate: false });
    };

    // Start the polling/ensure sequence on next frame so layout can settle
    raf = requestAnimationFrame(ensure);

    // Observe container size changes to react to layout updates
    try {
      const container = map.getContainer();
      ro = new ResizeObserver(() => {
        map.invalidateSize();
        map.setView(position, zoom, { animate: false });
      });
      if (container) ro.observe(container);
    } catch (e) {
      // ResizeObserver not supported — polling fallback handles it
    }

    const onWindowResize = () => {
      map.invalidateSize();
      map.setView(position, zoom, { animate: false });
    };
    window.addEventListener("resize", onWindowResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onWindowResize);
      if (ro) ro.disconnect();
    };
  }, [map, position, zoom]);

  return null;
}

const Map: React.FC<MapProps> = ({ position, zoom, popupContent }) => {
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={myCustomIcon} position={position}>
        {popupContent ? (
          <Popup>{popupContent}</Popup>
        ) : (
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        )}
      </Marker>
      <MapUpdater position={position} zoom={zoom} />
    </MapContainer>
  );
};

export default Map;
