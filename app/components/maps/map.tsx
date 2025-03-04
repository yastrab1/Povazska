import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  GoogleMap,
  StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";
import {
  MdChevronLeft,
  MdChevronRight,
  MdLocationOn,
  MdSearch,
} from "react-icons/md";
import Image from "next/image";
import { Data, formProgress } from "@/lib/globals";
import "@/app/components/design/form.css";

interface Props {
  setState: Dispatch<SetStateAction<formProgress>>;
  setData: Dispatch<SetStateAction<Data>>;
}

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

export default function MapPickerForm({ setState, setData }: Props) {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 48.1221, // Petržalka's latitude
    lng: 17.105, // Petržalka's longitude
  });

  const [error, setError] = useState<string | null>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded } = useLoadScript({
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
        setCoordinates({ lat: center.lat(), lng: center.lng() });
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
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
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

  const handleSearch = () => {
    const searchBox = searchBoxRef.current;
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const { geometry } = places[0];
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
      setData((data) => ({
        ...data,
        lat: coordinates.lat,
        lng: coordinates.lng,
      }));
      setState("ai tag selection");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="design-form">
      <div className="full-overlap form-shadow">{/* Blur shadow */}</div>
      <div className="full-overlap form-fill">
        <div className="form-title">
          <p className="text-xl font-bold">Lokácia</p>
          <p className="text-[#CDEEDC]">Vyber lokáciu pre svoj podnet</p>
        </div>

        <div className="form-content">
          <div className="form-tip">
            <div className="w-16 h-full">
              <MdLocationOn className="w-full h-full" />
            </div>
            <div className="flex-grow">
              <div className="form-tip-title">Presná lokácia</div>
              Pomôž nám presne identifikovať miesto tvojho podnetu.
            </div>
          </div>

          <div className="form-input">
            <label htmlFor="location-search" className="form-label">
              <MdSearch />
              Vyhľadať miesto
            </label>
            <StandaloneSearchBox
              onLoad={(ref) => (searchBoxRef.current = ref)}
              onPlacesChanged={handleSearch}
            >
              <input
                id="location-search"
                type="text"
                placeholder="Zadaj adresu alebo miesto"
                className="form-field w-full"
              />
            </StandaloneSearchBox>
          </div>

          <div className="grid col-span-1 relative mb-4">
            <div className="form-image-shadow absolute inset-0 z-10"></div>
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
                <Image src="/marker.png" alt="Pointer" width={40} height={40} />
              </div>
            </GoogleMap>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <button
            onClick={getUserLocation}
            className="w-full text-sm px-4 py-2 bg-[#CDEEDC] text-[#333333] rounded-[10px] mb-4"
          >
            Použiť moju aktuálnu polohu
          </button>
        </div>

        <div className="form-foot">
          <button
            className="form-button justify-start"
            onClick={() => setState("personal info")}
          >
            <MdChevronLeft className="text-2xl" />
            Späť
          </button>
          <button className="form-button justify-end" onClick={handleConfirm}>
            Ďalej
            <MdChevronRight className="text-2xl" />
          </button>
        </div>

        <div className="form-completion">
          <div className="form-completion-bar w-3/5"></div>
        </div>
      </div>
    </div>
  );
}
