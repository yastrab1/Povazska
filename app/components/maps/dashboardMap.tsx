import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    GoogleMap, Marker,
    useLoadScript,
} from "@react-google-maps/api";
import Image from "next/image";
import {LocationMarker} from "@/lib/globals";
import "@/app/components/design/form.css";
import styles from "../design/styles";
import {InfoWindow} from "@react-google-maps/api";

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

const libraries: Library[] = ["places"];

export default function DashboardMap({locations}:{locations:LocationMarker[]}) {
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
        lat: 48.1221, // Petržalka's latitude
        lng: 17.105, // Petržalka's longitude
    });

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries,
    });

    const mapContainerStyle: React.CSSProperties = {
        width: "100%",
        height: "300px",
        borderRadius: "10px",
        gridRowStart: 1,
        gridColumnStart: 1,
        zIndex: 20,
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

            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                setCoordinates({lat: latitude, lng: longitude});
                if (mapRef.current) {
                    mapRef.current.panTo({lat: latitude, lng: longitude});
                    mapRef.current.setZoom(14);
                }
            },
            () => {

            }
        );
    };



    const [activeMarker, setActiveMarker] = React.useState<string>();

    const handleMouseOver = useCallback((id: string) => {
        setActiveMarker(id);
    }, []);

    const handleMouseOut = useCallback(() => {
        setActiveMarker(undefined);
    }, []);

    useEffect(() => {
        getUserLocation();
    }, []);


    if (!isLoaded) return <div>Loading map...</div>;

    return (

        <div className={styles.mapContainer}>
            <div className={styles.mapOverlay}></div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={coordinates}
                onLoad={onMapLoad}
                onIdle={handleIdle}
            >
                <div className={styles.mapMarker}>
                    <Image src="/marker.png" alt="Pointer" width={40} height={40}/>
                </div>
                {locations?.map((loc:LocationMarker) => (
                    <Marker
                        key={loc.id}
                        position={loc.position}

                        title={loc.title}
                        onMouseOver={() => handleMouseOver(loc.id)}
                        onMouseOut={handleMouseOut}
                    >
                        {activeMarker === loc.id && (
                            <InfoWindow
                                position={loc.position}
                                onCloseClick={() => setActiveMarker(undefined)}
                                options={{pixelOffset: new window.google.maps.Size(0, -30)}}
                            >
                                <div style={{fontSize: "14px"}}>
                                    <strong>{loc.title}</strong>
                                    <br/>
                                    {loc.content}
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>
                ))}
            </GoogleMap>
        </div>

    );
}
