import React, { useState, useRef, useCallback, useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

export type Library =
  | "core"
  | "maps"
  | "places"
  | "geocoding"
  | "routes"
  | "marker"
  | "geometry"
  | "elevation"
  | "streetView"
  | "journeySharing"
  | "drawing"
  | "visualization";

const libraries: Library[] = ["places", "geocoding"];

export default function MapPickerModal() {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 48.1221,
    lng: 17.105,
  });

  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const mapContainerStyle: React.CSSProperties = {
    width: "100%",
    aspectRatio: 2,
  };

  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    geocoder.current = new google.maps.Geocoder();
  }, []);

  const fetchAddress = useCallback((lat: number, lng: number) => {
    if (geocoder.current) {
      geocoder.current.geocode(
        { location: { lat, lng } },
        (results, status) => {
          if (results == null) {
            return;
          }

          if (status === google.maps.GeocoderStatus.OK && results[0]) {
            setAddress(results[0].address_components.map((value) => value.long_name).join("=>"));
          } else {
            setAddress("Unable to fetch address");
          }
        }
      );
    }
  }, []);

  const handleIdle = useCallback(() => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      if (center) {
        const newCoordinates = { lat: center.lat(), lng: center.lng() };
        setCoordinates(newCoordinates);
        fetchAddress(newCoordinates.lat, newCoordinates.lng);
      }
    }
  }, [fetchAddress]);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
        fetchAddress(latitude, longitude);
        if (mapRef.current) {
          mapRef.current.panTo({ lat: latitude, lng: longitude });
          mapRef.current.setZoom(14);
        }
      },
      (err) => {
        setError(err.message || "Unable to retrieve your location.");
      }
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="m-4 border bg-card text-card-foreground shadow-sm overflow-hidden rounded-lg aspect-video">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={coordinates}
        onLoad={onMapLoad}
        onIdle={handleIdle}
        options={{
          disableDefaultUI: true,
          gestureHandling: "none",
          keyboardShortcuts: false,
          disableDoubleClickZoom: true,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "calc(50% - 20px)",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <img src="/marker.png" alt="Pointer" style={{ height: "40px" }} />
        </div>
      </GoogleMap>
      <div className="mt-4 text-center">
        <p>Address: {address}</p>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}
