'use client'
import React, { useState, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

// Types for the map configuration
interface Coordinates {
  lat: number;
  lng: number;
}

const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh",
};

const defaultCenter: Coordinates = { lat: 37.7749, lng: -122.4194 }; // Example: San Francisco

const Map: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [mapCenter, setMapCenter] = useState<Coordinates>(defaultCenter);

  // Use a ref to access the map instance
  const mapRef = useRef<google.maps.Map | null>(null);

  // Function to handle map load
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Function to handle map idle (center changed)
  const handleIdle = useCallback(() => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      if (newCenter) {
        setMapCenter({
          lat: newCenter.lat(),
          lng: newCenter.lng(),
        });
      }
    }
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ position: "relative" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={mapCenter}
        onLoad={onMapLoad} // Set the map instance when loaded
        onIdle={handleIdle} // Trigger idle callback when map stops moving
      >
        {/* Fixed pointer in the center */}
        <div
          style={{
            position: "absolute",
            top: "calc(50% - 25px)",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <img
            src="/marker.png" 
            alt="Pointer"
            // height={"10%"}
            style={{ height: "50px" }}
          />
        </div>
      </GoogleMap>
      {/* Displaying coordinates */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          background: "#fff",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        <h4>Selected Coordinates:</h4>
        <p>Latitude: {mapCenter.lat.toFixed(6)}</p>
        <p>Longitude: {mapCenter.lng.toFixed(6)}</p>
      </div>
    </div>
  );
};

export default Map;
