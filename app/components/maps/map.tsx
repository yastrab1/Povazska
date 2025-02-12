"use client";
import React, {Dispatch, SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import {GoogleMap, StandaloneSearchBox, useLoadScript,} from "@react-google-maps/api";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {formProgress,Data} from "@/lib/globals";

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

interface Props {
    setState: Dispatch<SetStateAction<formProgress>>;
    setData: Dispatch<SetStateAction<Data>>;
}

const libraries: Library[] = ["places"];

export default function MapPickerModal({setState,setData}: Props) {
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
        lat: 48.1221, // Petržalka's latitude
        lng: 17.105, // Petržalka's longitude
    });

    const [error, setError] = useState<string | null>(null);
    const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries,
    });

    const mapContainerStyle: React.CSSProperties = {
        width: "100%",
        height: "70%",
    };

    const mapRef = useRef<google.maps.Map | null>(null);

    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    const handleIdle = useCallback(() => {
        if (mapRef.current) {
            const center = mapRef.current.getCenter();
            if (center) {
                setCoordinates({lat: center.lat(), lng: center.lng()});
            }
        }
    }, []);

    const getUserLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        setError(null);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                setCoordinates({lat: latitude, lng: longitude});
                if (mapRef.current) {
                    mapRef.current.panTo({lat: latitude, lng: longitude});
                    mapRef.current.setZoom(14);
                }
            },
            (err) => {
                setError(err.message || "Unable to retrieve your location.");
            }
        );
    };

    const handleSearch = () => {
        const searchBox = searchBoxRef.current;
        if (searchBox) {
            const places = searchBox.getPlaces();
            if (places && places.length > 0) {
                const {geometry} = places[0];
                if (geometry && geometry.location) {
                    const newCenter = {
                        lat: geometry.location.lat(),
                        lng: geometry.location.lng(),
                    };
                    setCoordinates(newCenter);
                    if (mapRef.current) {
                        mapRef.current.panTo(newCenter);
                        mapRef.current.setZoom(14);
                    }
                }
            }
        }
    };

    const handleConfirm = () => {
        if (coordinates) {
            setData(data=>({
                ...data,
                lat: coordinates.lat,
                lng: coordinates.lng,
            }));
            setState("ai tag selection")
        }
    };

    useEffect(() => {
        // Attempt to center the map on the user's location when the modal opens
        getUserLocation();
    }, []);

    if (!isLoaded) return <div>Loading map...</div>;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"

        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg h-[90%] w-[90%]"
                onClick={(e) => e.stopPropagation()}
            >
                <StandaloneSearchBox
                    onLoad={(ref) => (searchBoxRef.current = ref)}
                    onPlacesChanged={handleSearch}
                >
                    <input
                        type="text"
                        placeholder="Search for a location"
                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    />
                </StandaloneSearchBox>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={12}
                    center={coordinates}
                    onLoad={onMapLoad}
                    onIdle={handleIdle}
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
                        <Image src="/marker.png" alt="Pointer" width={40} height={40}/>
                    </div>
                </GoogleMap>
                <div className="mt-4 text-center">
                    <p>Latitude: {coordinates.lat.toFixed(6)}</p>
                    <p>Longitude: {coordinates.lng.toFixed(6)}</p>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
                <div className="mt-4 flex justify-between">
                    <Button variant="outline">
                        Cancel
                    </Button>
                    <Button variant={"secondary"} onClick={getUserLocation}>Get courrent location</Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </div>
            </div>
        </div>
    );
}
