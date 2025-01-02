"use client";
import React, {Dispatch, SetStateAction, useState} from "react";
import { Card, CardHeader, CardTitle, CardContent/*, CardFooter*/ } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MapPickerModal from "@/app/components/maps/map";
import {Data} from "@/app/page";

type State =
  | "guest upload"
  | "image upload"
  | "map selection"
  | "finalization"
  | undefined;

interface Props {
  stateSet: (state: State) => void;
  dataSet: Dispatch<SetStateAction<Data>>
}



export default function MapPickerCard({ stateSet,dataSet }: Props) {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOpenMap = () => {
    setIsMapOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
  };

  const handleCoordinatesSelect = (coords: { lat: number; lng: number }) => {
    setCoordinates(coords);
  };
  function setCoordinateData (){

    dataSet((data) => {
      if (!coordinates) return data;
      console.log("setting coords",coordinates)
      data.lat = coordinates.lat | 0;
      data.lng = coordinates.lng | 0;
      return data
    })

  }
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setError(null); // Reset previous error if any
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
      },
      (err) => {
        setError(err.message || "Unable to retrieve location.");
      }
    );
  };

  return (
    <Card className="max-w-md mx-auto mt-8 shadow-lg">
      <CardHeader>
        <CardTitle>Select Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {coordinates ? (
            <div className="text-center mb-4">
              <p>Latitude: {coordinates.lat.toFixed(6)}</p>
              <p>Longitude: {coordinates.lng.toFixed(6)}</p>
            </div>
          ) : (
            <p className="text-gray-500 text-center mb-4">No location selected.</p>
          )}
          <div className="flex flex-col gap-2 w-full">
            <Button variant="outline" onClick={handleOpenMap}>
              Open Map
            </Button>
            <Button variant="secondary" onClick={getCurrentLocation}>
              Use Current Location
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <Button onClick={()=>{
          stateSet("finalization")
          setCoordinateData()
        }}>
          Upload Position!
        </Button>
      </CardContent>
      {isMapOpen && (
        <MapPickerModal
          onClose={handleCloseMap}
          onCoordinatesSelect={handleCoordinatesSelect}
        />
      )}
    </Card>
  );
};
