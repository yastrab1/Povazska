import React, {Dispatch, SetStateAction, useCallback, useEffect, useRef, useState,} from "react";
import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import {Button} from "@/components/ui/button";
import MapPopup from "@/app/components/maps/map";
import Image from "next/image";

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

interface Props {
    setState: Dispatch<SetStateAction<number>>;
}

export default function MapSelectionSection({setState}: Props) {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
        lat: 48.1221,
        lng: 17.105,
    });

    const [address, setAddress] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const geocoder = useRef<google.maps.Geocoder | null>(null);

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries,
    });

    const mapContainerStyle: React.CSSProperties = {
        width: "100%",
        aspectRatio: 3,
    };

    const fetchAddress = useCallback((lat: number, lng: number) => {
        console.log("update - neviem preco ale stal sa");
        if (geocoder.current) {
            geocoder.current.geocode(
                {location: {lat, lng}},
                (results, status) => {
                    if (results == null) {
                        return;
                    }

                    if (status === google.maps.GeocoderStatus.OK && results[0]) {
                        try {
                            setAddress(
                                results[0].address_components.filter((value) => {
                                    return value.types[0] === "route";
                                })[0].long_name +
                                " " +
                                results[0].address_components.filter((value) => {
                                    return value.types[0] === "street_number";
                                })[0].long_name +
                                ", " +
                                results[0].address_components.filter((value) => {
                                    return value.types[0] === "neighborhood";
                                })[0].long_name
                                //results[0].address_components.filter((value) => {return value.types[0] !== "street_number"}).map(value => value.types.join()).join(", ")
                            );
                        } catch (error) {
                            console.log(error);
                            setAddress("Invalid address");
                        }
                    } else {
                        setAddress("Unable to fetch address");
                    }
                }
            );
        }
    }, []);

    const getUserLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        setError(null);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                setCoordinates({lat: latitude, lng: longitude});
                fetchAddress(latitude, longitude);
                if (mapRef.current) {
                    mapRef.current.panTo({lat: latitude, lng: longitude});
                    mapRef.current.setZoom(14);
                }
            },
            (err) => {
                setError(err.message || "Unable to retrieve your location.");
            }
        );
    }, [fetchAddress]);

    const mapRef = useRef<google.maps.Map | null>(null);

    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        geocoder.current = new google.maps.Geocoder();
        getUserLocation();
    }, [getUserLocation]);


    useEffect(() => {
        getUserLocation();
    }, [getUserLocation]);

    if (!isLoaded) return <div>Loading map...</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Vybrať polohu</CardTitle>
            </CardHeader>
            <CardContent>
                <div
                    className="border bg-card text-card-foreground shadow-sm overflow-hidden rounded-lg aspect-[2] flex flex-col"
                    onClick={() => {
                        setIsMapOpen(true);
                    }}
                >
                    {isMapOpen ? (
                        <div className="w-full aspect-[3] bg-gray-200"></div>
                    ) : (
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={14}
                            center={coordinates}
                            onLoad={onMapLoad}
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
                                className="absolute left-1/2 top-[calc(50%-20px)] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                                <Image
                                    src="/marker.png"
                                    alt="Pointer"
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </GoogleMap>
                    )}
                    <div className="px-4 w-full grow flex items-center bg-gray-800 text-white font-bold text-lg">
                        {address}
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full flex gap-4 justify-between">
                    <Button
                        className="w-24 h-10"
                        onClick={() =>
                            setState((state) => {
                                return state - 1;
                            })
                        }
                    >
                        <MdChevronLeft className="scale-[2]"/>
                        Späť
                    </Button>
                    <Button
                        className="w-24 h-10"
                        onClick={() =>
                            setState((state) => {
                                return state + 1;
                            })
                        }
                    >
                        Ďalej
                        <MdChevronRight className="scale-[2]"/>
                    </Button>
                </div>
            </CardFooter>
            {isMapOpen && (
                <MapPopup
                    onClose={() => {
                        setIsMapOpen(false);
                    }}
                    onCoordinatesSelect={(coords: { lat: number; lng: number }) => {
                        setCoordinates(coords);
                        fetchAddress(coords.lat, coords.lng);
                    }}
                />
            )}
        </Card>
    );
}
