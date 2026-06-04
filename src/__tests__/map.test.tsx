import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
// Import normally; Vitest will use the mock defined below automatically
import { MapContainer, Marker, Popup } from "react-leaflet";

// 1. Mock react-leaflet BEFORE importing components that use it
vi.mock("react-leaflet", () => ({
  MapContainer: ({
    children,
    center,
  }: {
    children: React.ReactNode;
    center: [number, number];
  }) => (
    <div data-testid="map-container" data-lat={center[0]} data-lng={center[1]}>
      {children}
    </div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({
    children,
    position,
    eventHandlers,
  }: {
    children: React.ReactNode;
    position: [number, number];
    eventHandlers?: { click?: () => void };
  }) => (
    <div onClick={eventHandlers?.click}>
      <div data-testid="marker" data-lat={position[0]} data-lng={position[1]}>
        {/* 
           In a real app, react-leaflet handles showing/hiding children.
           For a simple mock, we just ensure they are rendered so we can 
           query them.
        */}
        {children}
      </div>
    </div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popup">{children}</div>
  ),
}));

describe("Leaflet Component", () => {
  // Test that the MapContainer receives the correct latitude and longitude props
  it("receives the correct latitude and longitude props", () => {
    const mockCenter: [number, number] = [-6.2088, 106.8456];

    render(
      <MapContainer center={mockCenter}>
        <Marker position={mockCenter} />
      </MapContainer>,
    );

    const mapContainer = screen.getByTestId("map-container");
    expect(mapContainer).toHaveAttribute("data-lat", String(mockCenter[0]));
    expect(mapContainer).toHaveAttribute("data-lng", String(mockCenter[1]));
  });

  // Test that the Marker component triggers the click handler when clicked
  it("triggers the click handler when the marker is clicked", () => {
    const mockCenter: [number, number] = [-6.2088, 106.8456];
    const handleClick = vi.fn();

    render(
      <MapContainer center={mockCenter}>
        <Marker position={mockCenter} eventHandlers={{ click: handleClick }} />
      </MapContainer>,
    );

    const marker = screen.getByTestId("marker");
    fireEvent.click(marker);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test that the Popup component renders its children correctly
  it("renders the popup content inside the marker", () => {
    const mockCenter: [number, number] = [-6.2088, 106.8456];

    render(
      <MapContainer center={mockCenter}>
        <Marker position={mockCenter}>
          <Popup>Hello from the Popup!</Popup>
        </Marker>
      </MapContainer>,
    );

    // Verify the popup content is present in the DOM
    const popup = screen.getByTestId("popup");
    expect(popup).toHaveTextContent("Hello from the Popup!");
  });
});
